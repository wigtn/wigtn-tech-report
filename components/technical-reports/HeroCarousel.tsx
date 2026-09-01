"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/site";

/**
 * Featured strip above the report grid: the three newest reports, one at a
 * time, split into a text panel and the report's banner.
 *
 * Three and not five, because the grid is directly below and a hero that
 * carries the whole index just shows the same list twice. Three and not a
 * hand-picked set, because "featured" flags rot: RESEARCH_PROJECTS is already
 * sorted newest-first, so the strip updates itself when a report lands.
 *
 * The text sits beside the banner rather than on top of it. The naverlabs
 * hero this borrows from lays white type over a photograph; our banners
 * already carry their own wordmarks on light grounds, and a second title
 * printed over them would collide with the first.
 *
 * Mechanically it is a scroll-snap track, which is the whole trick: swiping
 * works on touch without any JS, and the script's only jobs are the timer,
 * the dots, and keeping the two in sync. This is the site's first client
 * component — a rotating hero is the one thing on these pages that cannot be
 * expressed as markup.
 *
 * The loop never rewinds. After the last slide the track keeps moving right
 * into a clone of the first, and the moment it settles there — a frame that
 * is pixel-identical to slide one — it teleports back to the real slide one
 * with no animation. Rolling 1→2→3→[1] forward reads as a carousel; snapping
 * three slides back to the left reads as a mistake.
 */

export type HeroSlide = {
  href: string;
  title: string;
  dek: string;
  date: string;
  lang: string;
  image: { src: string; alt: string; contain?: boolean };
};

const CAROUSEL_COPY = {
  en: {
    label: "Latest",
    region: "Latest reports",
    goTo: (n: number) => `Go to slide ${n}`,
  },
  ko: {
    label: "최신 리포트",
    region: "최신 리포트",
    goTo: (n: number) => `${n}번째 슬라이드로 이동`,
  },
} as const;

const ROTATE_MS = 6000;

/* One slide's left edge to the next: slide width plus the track gap.
   Measured from the DOM instead of assuming clientWidth, so the gap between
   slides stays a pure CSS decision — every scroll computation below works in
   strides and none of it changes if the gap does. Siblings share an
   offsetParent, so the offsetLeft difference is the stride regardless of how
   the track itself is positioned. */
const slideStride = (track: HTMLDivElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const second = track.children[1] as HTMLElement | undefined;
  return first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
};

export function HeroCarousel({
  slides,
  locale = "en",
}: {
  slides: HeroSlide[];
  locale?: "en" | "ko";
}) {
  const copy = CAROUSEL_COPY[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  /* Hover and focus each pause the timer; either alone must be enough, so
     they are tracked separately rather than as one boolean a blur could
     clear while the pointer is still parked on the slide. */
  const restRef = useRef({ hover: false, focus: false });
  const [index, setIndex] = useState(0);
  /* Once the reader touches the track or a dot, the strip is theirs and the
     timer never comes back. Resuming under someone mid-read is the single
     most annoying thing a carousel can do. State stops the interval via the
     effect; the ref is read inside the tick, because cleanup runs post-paint
     and a tick due in that gap would override the slide a dot click just
     scrolled to. */
  const [handed, setHanded] = useState(false);
  const handedRef = useRef(false);
  const handOver = () => {
    handedRef.current = true;
    setHanded(true);
  };

  useEffect(() => {
    if (handed || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || !track.clientWidth) return;
      if (handedRef.current || restRef.current.hover || restRef.current.focus) return;
      if (document.hidden) return;
      /* Advance from where the track actually is, not from React state, so a
         swipe the state hasn't caught up with yet is never fought. From the
         last slide this targets the clone one further right; the scroll
         handler swaps it for the real first slide on arrival. */
      const stride = slideStride(track);
      const next = Math.min(
        Math.round(track.scrollLeft / stride) + 1,
        slides.length,
      );
      track.scrollTo({ left: next * stride });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [handed, slides.length]);

  if (slides.length === 0) return null;

  /* The clone that closes the loop. Rendered, never announced: it exists so
     the eye sees forward motion, not so a screen reader hears four slides. */
  const loopSlides = slides.length > 1 ? [...slides, slides[0]] : slides;

  const goTo = (i: number) => {
    handOver();
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * slideStride(track) });
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={copy.region}
      className="border-b border-[#E4E7EC]"
      onMouseEnter={() => (restRef.current.hover = true)}
      onMouseLeave={() => (restRef.current.hover = false)}
      onFocus={() => (restRef.current.focus = true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          restRef.current.focus = false;
        }
      }}
    >
      <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-14">
        <div
          ref={trackRef}
          onScroll={(event) => {
            const track = event.currentTarget;
            if (!track.clientWidth) return;
            const stride = slideStride(track);
            const position = track.scrollLeft / stride;
            /* Settled on the clone — the frame on screen is slide one, so
               jumping to the real slide one changes nothing the eye can see.
               The tolerance is two pixels, not a percentage: it only needs to
               absorb the fraction a snap point can land on, and anything
               looser fires mid-deceleration, eating the animation's tail as
               a visible hitch. Fires for timer and manual swipe alike. */
            if (slides.length > 1 && position >= slides.length - 2 / stride) {
              track.scrollTo({ left: 0, behavior: "instant" });
              setIndex(0);
              return;
            }
            /* Modulo, not clamp: while the clone is sliding in, the dot for
               slide one should already be lighting up. */
            setIndex(Math.round(position) % slides.length);
          }}
          onPointerDown={handOver}
          /* Smooth only behind motion-safe: the timer never runs under
             reduced motion, and dot jumps go instant there via the same
             CSS switch — scrollTo() without a behavior obeys it. */
          /* The gap only ever shows mid-transition, as the seam between the
             outgoing and incoming slide; at rest the neighbour sits offscreen
             by the same amount. Without it, one slide's banner butts straight
             into the next slide's headline while they roll past. */
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto motion-safe:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-16"
        >
          {loopSlides.map((slide, i) => (
            <article
              key={i === slides.length ? `${slide.href}#clone` : slide.href}
              lang={slide.lang}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i === slides.length || undefined}
              aria-label={`${(i % slides.length) + 1} / ${slides.length}`}
              className="w-full shrink-0 snap-start"
            >
              <Link
                href={slide.href}
                tabIndex={i === index ? undefined : -1}
                className="group grid items-center gap-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9] md:grid-cols-[5fr_7fr] md:gap-10"
              >
                <div className="order-2 md:order-1">
                  <p className="font-report-mono text-[12px] uppercase tracking-[0.12em] text-[#1457D9]">
                    {copy.label}
                  </p>
                  <h2
                    className={`mt-3 font-semibold transition-colors group-hover:text-[#1457D9] ${
                      locale === "ko"
                        ? "font-sans text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.28] tracking-[-0.03em] [word-break:keep-all] [text-wrap:balance]"
                        : "text-balance font-report-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.15] tracking-[-0.02em]"
                    }`}
                  >
                    {slide.title}
                  </h2>
                  {/* The dek earns its place here even though the cards below
                      dropped theirs: one slide has the room three grid columns
                      do not, and a hero of title-plus-arrow would be all
                      gesture. Clamped, because the codex dek is a paragraph. */}
                  <p
                    className={`mt-4 line-clamp-3 text-[15px] leading-6 text-[#667085] ${
                      locale === "ko" ? "[word-break:keep-all]" : ""
                    }`}
                  >
                    {slide.dek}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <time className="font-report-mono text-[12px] text-[#667085]">
                      {slide.date}
                    </time>
                    <ArrowRight
                      aria-hidden
                      size={16}
                      className="text-[#1457D9] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>

                <div
                  className={`relative order-1 aspect-[16/10] overflow-hidden rounded-xl md:order-2 ${
                    slide.image.contain ? "bg-white" : "bg-[#F2F4F7]"
                  }`}
                >
                  {/* 16:10, the same tile as the hub card and the report-page
                      banner, so one crop identifies a report on all three
                      surfaces. This used to be 16:9, and that extra 6% of
                      height cost the RCPS art its venue badge at the top and
                      its wordmark at the bottom; at 16:10 the 3:2 banners lose
                      3% top and bottom, which is inside the margins every
                      banner keeps. Contained slides sat in a pillarbox here
                      and read as a small picture on a white slab, which is
                      why nothing uses `contain` now. It stays as the
                      per-report escape hatch the other two surfaces share, on
                      white so the pillarbox blends into near-white art. */}
                  <Image
                    src={assetPath(slide.image.src)}
                    alt={slide.image.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1180px) 660px, (min-width: 768px) 55vw, 100vw"
                    className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                      slide.image.contain ? "object-contain" : "object-cover"
                    }`}
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="mt-6 flex justify-center gap-1">
            {slides.map((slide, i) => (
              <button
                key={slide.href}
                type="button"
                aria-label={copy.goTo(i + 1)}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="group/dot p-2"
              >
                <span
                  className={`block h-2 w-2 rounded-full transition-colors ${
                    i === index
                      ? "bg-[#1457D9]"
                      : "bg-[#D0D5DD] group-hover/dot:bg-[#98A2B3]"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
