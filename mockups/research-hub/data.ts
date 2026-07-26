export type ResearchStatus =
  | "Peer reviewed"
  | "Open model"
  | "Measured system"
  | "Engineering note"
  | "Case study";

export type ResearchTrack =
  | "Models & evaluation"
  | "AI systems"
  | "Agentic engineering";

export type ResearchLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export type ResearchMetric = {
  value: string;
  label: string;
  detail: string;
};

export type ResearchTable = {
  caption: string;
  headers: string[];
  rows: Array<{
    cells: string[];
    highlight?: boolean;
  }>;
};

export type ResearchFigure = {
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;
  portrait?: boolean;
  focalPoint?: string;
};

export type ResearchSection = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  figures?: ResearchFigure[];
  table?: ResearchTable;
  callout?: {
    label: string;
    text: string;
  };
};

export type ResearchProject = {
  slug: string;
  shortTitle: string;
  title: string;
  dek: string;
  track: ResearchTrack;
  status: ResearchStatus;
  format: string;
  date: string;
  authors: string;
  venue?: string;
  featured?: boolean;
  heroFigure?: ResearchFigure;
  heroSectionId?: string;
  links: ResearchLink[];
  metrics: ResearchMetric[];
  sections: ResearchSection[];
  limitations: string[];
  citation: string;
};

export const researchHref = (slug: string) => `/${slug}/`;

const wigtnOcr: ResearchProject = {
  slug: "wigtnocr",
  shortTitle: "WigtnOCR",
  title: "Distilling a 30B document parser into 2B",
  dek: "An engineering account of how we used a 30B teacher once, served the task with a 2B student, and checked whether parsing gains survived downstream retrieval.",
  track: "Models & evaluation",
  status: "Open model",
  format: "Model report",
  date: "2026.05.20",
  authors: "WIGTN Research",
  featured: true,
  heroFigure: {
    src: "/images/projects/wigtnocr-highlights.png",
    alt: "WigtnOCR benchmark highlights",
    caption:
      "Parsing and retrieval highlights from the released WigtnOCR evaluation. Lower is better for NED; higher is better for TEDS and retrieval metrics.",
    contain: true,
  },
  heroSectionId: "parsing",
  links: [
    {
      label: "Research repository",
      href: "https://github.com/wigtn/wigtnOCR-v1",
      primary: true,
    },
    {
      label: "Model weights",
      href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR",
    },
  ],
  metrics: [
    {
      value: "0.739",
      label: "KoGovDoc Hit@1",
      detail: "Highest among six released parser outputs",
    },
    {
      value: "0.649",
      label: "Table TEDS",
      detail: "+12.6 points over the 30B teacher",
    },
    {
      value: "4,501",
      label: "Teacher-labeled pages",
      detail: "49 documents before filtering and correction",
    },
    {
      value: "2B",
      label: "Student parameters",
      detail: "LoRA rank 8, alpha 32, three epochs",
    },
  ],
  sections: [
    {
      id: "problem",
      index: "01",
      eyebrow: "Problem",
      title: "The output looked readable. Retrieval told a different story",
      lead:
        "Korean public documents combine scans, multi-column layouts, forms, charts, stamps and dense tables. We learned quickly that readable text alone was not the useful output. The structure had to survive long enough for retrieval to recover it.",
      paragraphs: [
        "A parser can look visually clean and still remove the value that answers a user’s question. That gap changed the evaluation plan: WigtnOCR separates intrinsic parsing quality from downstream retrieval quality instead of compressing both into one headline score.",
        "OmniDocBench measures text, tables, formulas and reading order. KoGovDoc then holds the retriever and chunking policy fixed and measures how much answer-bearing content remains recoverable after parsing.",
      ],
      callout: {
        label: "What we wanted to know",
        text: "Can a 2B student preserve the useful document behavior of a 30B teacher, and does that preservation survive all the way to retrieval?",
      },
    },
    {
      id: "method",
      index: "02",
      eyebrow: "Method",
      title: "Large-model supervision, paid once",
      lead:
        "The practical decision was to spend the large-model budget during data creation, not on every document served. The 30B model creates structured supervision offline; production inference runs through the 2B student.",
      steps: [
        {
          label: "Stage 01",
          title: "Generate",
          body: "Qwen3-VL-30B-Instruct converts 4,501 page images from 49 documents into structured Markdown.",
        },
        {
          label: "Stage 02",
          title: "Judge",
          body: "Qwen3.5-122B scores structure, table quality, completeness, hallucination and consistency.",
        },
        {
          label: "Stage 03",
          title: "Filter",
          body: "Low-quality pages are removed, document imbalance is corrected, and 294 government pages are held out.",
        },
        {
          label: "Stage 04",
          title: "Distill",
          body: "Qwen3-VL-2B-Instruct is fine-tuned with LoRA rank 8 / alpha 32 for three epochs using ms-swift and ZeRO-2.",
        },
      ],
      table: {
        caption: "Released training corpus",
        headers: ["Source", "Documents", "Pages", "Role"],
        rows: [
          { cells: ["KoGovDoc", "10", "3,637", "Domain adaptation"] },
          { cells: ["ArXiv", "39", "864", "Layout diversity"] },
          { cells: ["Total", "49", "4,501", "Teacher generation"], highlight: true },
        ],
      },
    },
    {
      id: "parsing",
      index: "03",
      eyebrow: "Intrinsic evaluation",
      title: "The student improves tables without winning every metric",
      lead:
        "WigtnOCR matches the teacher on text NED and substantially improves table TEDS, while the teacher remains stronger on formula CDM.",
      figures: [
        {
          src: "/images/projects/wigtnocr-omnidocbench.png",
          alt: "OmniDocBench comparison chart",
          caption:
            "OmniDocBench comparison across the 30B teacher, base 2B, Marker and WigtnOCR.",
          contain: true,
        },
      ],
      table: {
        caption: "OmniDocBench — selected metrics",
        headers: ["Parser", "Text NED ↓", "Table TEDS ↑", "Formula CDM ↑", "Order NED ↓", "Skip ↓"],
        rows: [
          { cells: ["Qwen3-VL-30B", "0.289", "0.523", "0.939", "0.227", "5.5%"] },
          { cells: ["Qwen3-VL-2B", "0.364", "0.561", "0.865", "0.300", "18.8%"] },
          { cells: ["Marker", "0.218", "0.586", "0.863", "0.165", "0.4%"] },
          { cells: ["WigtnOCR-2B", "0.288", "0.649", "0.884", "0.211", "5.8%"], highlight: true },
        ],
      },
      callout: {
        label: "Interpretation",
        text: "The defensible claim is specialized transfer, not universal superiority: the student matches or exceeds the teacher in four reported categories, but formula accuracy and skip rate remain visible limitations.",
      },
    },
    {
      id: "retrieval",
      index: "04",
      eyebrow: "Downstream evaluation",
      title: "Cleaner chunks do not automatically retrieve better",
      lead:
        "MinerU produces the strongest boundary metrics but ranks fifth in retrieval. WigtnOCR preserves more answer-bearing structure and leads Hit@1, Hit@5 and MRR@10.",
      figures: [
        {
          src: "/images/projects/wigtnocr-bc-vs-retrieval.png",
          alt: "Boundary Clarity compared with retrieval Hit at 1",
          caption:
            "Boundary quality and retrieval diverge: intrinsic chunk cleanliness is not a substitute for end-to-end evaluation.",
          contain: true,
        },
        {
          src: "/images/projects/wigtnocr-retrieval.png",
          alt: "KoGovDoc retrieval results",
          caption:
            "Six-parser KoGovDoc retrieval comparison using the same semantic chunking and BGE-M3 retrieval pipeline.",
          contain: true,
        },
      ],
      table: {
        caption: "KoGovDoc retrieval — 564 queries",
        headers: ["Parser", "Hit@1 ↑", "Hit@5 ↑", "MRR@10 ↑", "nDCG@10 ↑"],
        rows: [
          { cells: ["WigtnOCR-2B", "0.739", "0.855", "0.788", "0.437"], highlight: true },
          { cells: ["Qwen3-VL-30B", "0.716", "0.839", "0.771", "0.411"] },
          { cells: ["Marker", "0.711", "0.853", "0.771", "0.412"] },
          { cells: ["Qwen3-VL-2B", "0.709", "0.814", "0.756", "0.444"] },
          { cells: ["MinerU", "0.608", "0.789", "0.682", "0.384"] },
          { cells: ["PaddleOCR", "0.512", "0.693", "0.592", "0.293"] },
        ],
      },
    },
    {
      id: "failures",
      index: "05",
      eyebrow: "Failure analysis",
      title: "What did not transfer cleanly",
      bullets: [
        "Formula CDM remains below the 30B teacher, so the compact model should not be presented as uniformly better.",
        "Five of 294 KoGovDoc validation pages failed to produce evaluable output.",
        "Qualitative examples still contain character-level OCR errors even when chart and table structure improves.",
        "The retrieval result is specific to Korean government documents, BGE-M3 and the released chunking policy.",
        "No controlled throughput, energy or serving-cost comparison has been released.",
      ],
    },
  ],
  limitations: [
    "KoGovDoc represents one Korean government-document distribution and one retrieval stack.",
    "Pseudo-label filtering reduces weak supervision but does not turn generated labels into human ground truth.",
    "The release supports a parameter-count claim; it does not yet support a precise speed or cost-reduction claim.",
  ],
  citation:
    'WIGTN Research. (2026). "WigtnOCR: Pseudo-Label Distillation for Structure-Preserving Document Parsing." WIGTN Research.',
};

const wigvo: ResearchProject = {
  slug: "wigvo",
  shortTitle: "WIGVO",
  title: "Real-time bidirectional translation over ordinary phone calls",
  dek: "A field-tested account of what changed when a browser translator met ordinary phone audio, including the echo-control ideas that failed before the deployed design.",
  track: "AI systems",
  status: "Peer reviewed",
  format: "ACL system paper",
  date: "2026.07",
  authors: "Hyeong-seob Kim · Sang-Woo Son · Hyun-woo Cho · Hyeonsang Kim · Jinmo Kim",
  venue: "ACL 2026 System Demonstrations · pp. 336–344",
  featured: true,
  heroFigure: {
    src: "/images/projects/wigvo_architecture.png",
    alt: "WIGVO dual-session system architecture",
    caption:
      "Session A translates browser speech into PSTN audio. Session B receives the phone side through echo, energy and voice-activity gates.",
    contain: true,
  },
  heroSectionId: "architecture",
  links: [
    {
      label: "ACL paper",
      href: "https://aclanthology.org/2026.acl-demo.33/",
      primary: true,
    },
    {
      label: "Watch system demo",
      href: "https://www.youtube.com/watch?v=jK1CDOQExLw",
    },
    {
      label: "Try WIGVO",
      href: "https://wigvo.wigtn.com",
    },
  ],
  metrics: [
    {
      value: "555ms",
      label: "Caller → callee P50",
      detail: "814 turns over live PSTN",
    },
    {
      value: "2,684ms",
      label: "Callee → caller P50",
      detail: "744 turns; STT dominates latency",
    },
    {
      value: "0 / 147",
      label: "Echo-induced loops",
      detail: "Across completed field calls",
    },
    {
      value: "$0.28",
      label: "Average cost / minute",
      detail: "Evaluated provider stack and pricing period",
    },
  ],
  sections: [
    {
      id: "problem",
      index: "01",
      eyebrow: "Problem",
      title: "The first phone prototype translated itself",
      paragraphs: [
        "The translation path worked in a browser, but the phone network changed the problem. Web and mobile voice systems can assume wideband audio and client-side acoustic echo cancellation. An ordinary telephone call delivers narrowband G.711 μ-law audio at 8 kHz, variable network delay and no control over the recipient’s device.",
        "Translated speech played to the phone can return through the network, enter recognition again and trigger a self-reinforcing translation loop. In the ungated prototype, eight of ten test calls looped until they were manually interrupted.",
      ],
      callout: {
        label: "The constraint we could not change",
        text: "The recipient installs nothing. Every intervention has to happen inside the server relay while preserving valid telephone audio.",
      },
    },
    {
      id: "architecture",
      index: "02",
      eyebrow: "Architecture",
      title: "The fix started by separating the two directions",
      lead:
        "Separating the caller and callee directions prevents prompt, context and audio state from contaminating the opposite side of the conversation.",
      steps: [
        {
          label: "Session A",
          title: "Browser → phone",
          body: "16 kHz browser audio is translated and synthesized, then converted to G.711 for Twilio Media Streams.",
        },
        {
          label: "Stage 0",
          title: "Deterministic echo gate",
          body: "Returning synthesized speech is replaced with valid μ-law silence (0xFF) instead of dropping packets.",
        },
        {
          label: "Stage 1",
          title: "RMS energy gate",
          body: "Weak PSTN noise is rejected before it can become a false speech event.",
        },
        {
          label: "Stage 2",
          title: "Local Silero VAD",
          body: "8 kHz audio is upsampled to 16 kHz and classified with asymmetric onset and offset timing.",
        },
        {
          label: "Session B",
          title: "Phone → browser",
          body: "Recognized speech is deterministically translated and synthesized back to the browser.",
        },
      ],
      figures: [
        {
          src: "/images/projects/wigvo_pipeline.png",
          alt: "WIGVO three-stage phone audio pipeline",
          caption:
            "The phone-side path combines deterministic silence injection with energy and neural voice-activity gates.",
          contain: true,
        },
      ],
    },
    {
      id: "ablation",
      index: "03",
      eyebrow: "System evolution",
      title: "Our cleanest idea did not survive the phone network",
      paragraphs: [
        "A Pearson-correlation detector compared outgoing synthesized audio with incoming PSTN audio. μ-law quantization, variable delay and codec distortion destroyed the stable signal relationship it required.",
        "Correlation reduced looping from 8/10 to 3/10 calls but introduced false positives. The deployed design instead marks the time window in which echo is possible and injects valid silence while maintaining stream continuity.",
      ],
      table: {
        caption: "Echo-control evolution",
        headers: ["Design", "Observed loop rate", "Decision"],
        rows: [
          { cells: ["No gate", "8 / 10 calls", "Rejected"] },
          { cells: ["Correlation detector", "3 / 10 calls", "Rejected"] },
          { cells: ["Dual-session echo gating", "0 / 147 completed", "Deployed"], highlight: true },
        ],
      },
      callout: {
        label: "What changed our approach",
        text: "Drop versus replace mattered: dropping frames interrupted server-side state, while deterministic silence preserved the stream and stopped re-recognition.",
      },
    },
    {
      id: "evaluation",
      index: "04",
      eyebrow: "Field evaluation",
      title: "Then we took it through 155 Korean–English calls",
      lead:
        "The evaluation contains 155 calls, 148 instrumented calls and 147 completed calls across voice-to-voice, text-to-voice and full-agent modes.",
      figures: [
        {
          src: "/images/projects/wigvo_latency_histogram.png",
          alt: "WIGVO latency distribution",
          caption:
            "Caller-to-callee and callee-to-caller latency distributions. The phone-originating path is dominated by transcription.",
          contain: true,
        },
        {
          src: "/images/projects/wigvo_utterance_scatter.png",
          alt: "Utterance duration versus latency",
          caption:
            "Longer phone-side utterances increase end-to-end latency; Session B remains the primary optimization target.",
          contain: true,
        },
      ],
      table: {
        caption: "Latency by direction",
        headers: ["Path", "P50", "P95", "Mean", "Turns"],
        rows: [
          { cells: ["Session A · caller → callee", "555ms", "1,169ms", "619ms", "814"], highlight: true },
          { cells: ["Session B · callee → caller", "2,684ms", "9,963ms", "3,650ms", "744"] },
          { cells: ["Session B · STT only", "2,601ms", "9,392ms", "3,544ms", "744"] },
        ],
      },
      bullets: [
        "STT accounts for 97.1% of mean Session B latency.",
        "The gate activated 1,046 times while preserving 354 callee interruptions.",
        "277 VAD false triggers were observed and 100 hallucinated transcriptions were blocked.",
        "COMET semantic adequacy reached 0.7078 for English→Korean and 0.6242 for Korean→English against offline LLM references.",
      ],
    },
    {
      id: "conference",
      index: "05",
      eyebrow: "Conference field notes",
      title: "What people asked when the paper left the page",
      lead:
        "WIGVO was presented at ACL 2026 System Demonstrations in San Diego through a booth focused on the paper, architecture and recorded workflow.",
      paragraphs: [
        "The most useful part of the booth was the technical discussion. Researchers and engineers, including visitors from NVIDIA and Apple, asked about echo control on a real line, end-to-end latency and whether the architecture could run inside their own infrastructure.",
        "We treat those conversations as qualitative feedback, not product adoption or company endorsement. They did, however, show that the difficult parts documented in the paper were the same parts practitioners wanted to examine.",
        "The discussion continued at IWSLT 2026 through an invited oral talk and a poster session. Those sessions gave us more room to explain why the phone-originating path remains ASR-bound and why deterministic echo gating outperformed a more elaborate detector.",
      ],
      figures: [
        {
          src: "/images/projects/wigvo-acl-2026-team.gif",
          alt: "Four WIGTN team members at ACL 2026 in San Diego",
          caption:
            "The WIGTN team at ACL 2026 in San Diego, where the accepted System Demonstrations paper was presented.",
          focalPoint: "50% 66%",
        },
        {
          src: "/images/projects/wigvo-acl-2026-booth.jpeg",
          alt: "WIGVO paper discussion at the ACL 2026 booth",
          caption:
            "Discussion at the ACL 2026 booth around the WIGVO paper, architecture and recorded system workflow.",
        },
        {
          src: "/images/projects/wigvo-iwslt-2026-talk.jpeg",
          alt: "WIGVO invited oral presentation at IWSLT 2026",
          caption:
            "Invited oral presentation at IWSLT 2026. WIGVO was also discussed in a poster session.",
        },
      ],
      callout: {
        label: "How to read this section",
        text: "Conference conversations are qualitative feedback. They support technical relevance and implementation interest, not performance, adoption or endorsement by the companies represented.",
      },
    },
  ],
  limitations: [
    "The field study covers Korean–English calls over PSTN, not wideband app-to-app audio or a broad language matrix.",
    "Session B latency remains ASR-bound and its P95 is not yet acceptable for every conversational setting.",
    "COMET uses offline LLM references rather than human translations, and no formal user study is reported.",
    "Cost reflects one provider configuration and pricing period.",
  ],
  citation:
    'Kim, H. et al. (2026). "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating." ACL 2026 System Demonstrations, 336–344.',
};

const wigss: ResearchProject = {
  slug: "wigss",
  shortTitle: "WIGSS",
  title: "Turning browser edits into reviewable source diffs",
  dek: "An engineering note on why we moved small visual corrections into the browser while keeping the repository, reviewable diffs and rollback as the source of truth.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Open-source architecture",
  date: "2026.04.10",
  authors: "WIGTN Engineering",
  heroFigure: {
    src: "/images/carousel/wigss-npm.png",
    alt: "WIGSS browser editor package",
    caption:
      "WIGSS wraps the target development server with a visual editor while keeping source code as the final artifact.",
  },
  heroSectionId: "architecture",
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/wigss",
      primary: true,
    },
  ],
  metrics: [
    {
      value: "60fps",
      label: "Overlay target",
      detail: "requestAnimationFrame tracking",
    },
    {
      value: "4",
      label: "Rewrite strategies",
      detail: "Tailwind, PostCSS, Babel and CSS/SCSS",
    },
    {
      value: "Local",
      label: "Execution model",
      detail: "Single-user development workflow",
    },
    {
      value: "Pending",
      label: "Controlled benchmark",
      detail: "No comparative result is claimed",
    },
  ],
  sections: [
    {
      id: "problem",
      index: "01",
      eyebrow: "Problem",
      title: "The last ten pixels are expensive to describe",
      paragraphs: [
        "Coding agents can produce a first layout quickly. The friction shows up later, when a ten-pixel correction becomes another round of prose, CSS edits, reloads and screenshots.",
        "We did not want the browser to become a second source of truth. WIGSS uses it as the editing surface, then turns each manipulation back into a constrained, reviewable source change.",
      ],
      callout: {
        label: "Design decision",
        text: "The browser is where the intent is expressed. The repository is where the change must end up.",
      },
    },
    {
      id: "architecture",
      index: "02",
      eyebrow: "Architecture",
      title: "Keep the gesture in the browser and the change in source",
      steps: [
        {
          label: "01",
          title: "Scan the live DOM",
          body: "The editor inspects visible elements and labels reusable groups around the target development server.",
        },
        {
          label: "02",
          title: "Track an overlay",
          body: "Bounding boxes follow layout changes with requestAnimationFrame while selection remains outside the iframe.",
        },
        {
          label: "03",
          title: "Map DOM to source",
          body: "Component metadata connects the selected node to a file and style strategy.",
        },
        {
          label: "04",
          title: "Send StyleIntent",
          body: "Drag and resize events become constrained edit intent over WebSocket.",
        },
        {
          label: "05",
          title: "Apply a targeted diff",
          body: "The matching rewriter updates source and reloads the target for verification.",
        },
      ],
      table: {
        caption: "Source rewrite dispatch",
        headers: ["Source style", "Rewrite mechanism", "Risk to verify"],
        rows: [
          { cells: ["Tailwind utilities", "Class-token update", "Conflicting responsive variants"] },
          { cells: ["CSS Modules", "PostCSS syntax tree", "Selector fan-out"] },
          { cells: ["CSS / SCSS", "Rule-level edit", "Cascade and specificity"] },
          { cells: ["Inline React", "Babel syntax tree", "Computed style expressions"] },
        ],
      },
    },
    {
      id: "evidence",
      index: "03",
      eyebrow: "Evidence status",
      title: "Architecture is documented; outcome quality is not yet benchmarked",
      paragraphs: [
        "The package documentation supports the scan-to-rewrite data flow and its source strategies. It does not support a claim that WIGSS is faster, safer or more accurate than editing through a coding agent.",
      ],
      bullets: [
        "Required future metric: component-to-source mapping success rate.",
        "Required future metric: visual fidelity after save at multiple viewport sizes.",
        "Required future metric: build and type-check pass rate after generated diffs.",
        "Required future metric: task completion time, diff size and rollback success.",
      ],
      callout: {
        label: "Publication rule",
        text: "Until the dataset, evaluator and logs ship together, WIGSS remains an engineering note rather than a benchmark report.",
      },
    },
  ],
  limitations: [
    "The documented package targets local, single-user development.",
    "DOM-to-source mapping becomes ambiguous across generated markup and higher-order abstractions.",
    "No controlled speed, fidelity or code-quality benchmark has been released.",
  ],
  citation:
    'WIGTN Engineering. (2026). "WIGSS: Turning Browser Edits into Reviewable Source Diffs." WIGTN Research.',
};

const wigtnCoding: ResearchProject = {
  slug: "wigtn-coding",
  shortTitle: "WIGTN Coding",
  title: "A staged multi-agent workflow for software delivery",
  dek: "An engineering note on the coordination problem behind multi-agent coding: separating roles is easy; keeping assumptions, contracts and release evidence shared is the hard part.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Workflow architecture",
  date: "2026.03.28",
  authors: "WIGTN Engineering",
  links: [
    {
      label: "Source repository",
      href: "https://github.com/wigtn/wigtn-plugins",
      primary: true,
    },
  ],
  metrics: [
    {
      value: "13",
      label: "Specialized agents",
      detail: "Package composition, not a quality score",
    },
    {
      value: "4",
      label: "Parallel PRD reviewers",
      detail: "Completeness, feasibility, security, consistency",
    },
    {
      value: "3",
      label: "Memory layers",
      detail: "Repository, session and task state",
    },
    {
      value: "Pending",
      label: "Controlled comparison",
      detail: "Benchmark harness exists; matrix is incomplete",
    },
  ],
  sections: [
    {
      id: "problem",
      index: "01",
      eyebrow: "Problem",
      title: "One context should not own every engineering decision",
      paragraphs: [
        "We started from a recurring failure mode: one coding session mixes requirements, architecture, implementation and review until early assumptions become invisible. Later reviewers then inherit decisions they never independently checked.",
        "WIGTN Coding separates those responsibilities into named stages with explicit artifacts. Parallelism is useful only when it creates independent scrutiny and bounded ownership, not when it merely increases the number of agents on screen.",
      ],
      callout: {
        label: "Working principle",
        text: "More agents do not create coordination. Explicit contracts, ownership and verification do.",
      },
    },
    {
      id: "workflow",
      index: "02",
      eyebrow: "Workflow",
      title: "Turn every handoff into an artifact",
      steps: [
        {
          label: "Define",
          title: "Produce a PRD",
          body: "Clarify goals, actors, constraints, acceptance criteria and phased scope.",
        },
        {
          label: "Challenge",
          title: "Review in parallel",
          body: "Completeness, feasibility, security and consistency reviewers inspect the same artifact independently.",
        },
        {
          label: "Design",
          title: "Inspect before deciding",
          body: "Architecture choices follow repository scans, contracts and existing conventions.",
        },
        {
          label: "Build",
          title: "Assign bounded ownership",
          body: "Backend, frontend, AI and operations work is split by file and interface boundaries.",
        },
        {
          label: "Review",
          title: "Apply quality gates",
          body: "Readability, performance, testability, best practices and security receive separate checks.",
        },
        {
          label: "Release",
          title: "Stop or publish deliberately",
          body: "Failed gates block release; successful runs prepare an intentional commit and pull request.",
        },
      ],
    },
    {
      id: "memory",
      index: "03",
      eyebrow: "Coordination",
      title: "Three layers keep shared decisions visible",
      table: {
        caption: "Workflow memory model",
        headers: ["Layer", "Lifetime", "Carries"],
        rows: [
          { cells: ["Repository memory", "Persistent", "Conventions, commands, architectural rules"] },
          { cells: ["Shared context", "One coordinated build", "Contracts, file ownership, cross-team decisions"], highlight: true },
          { cells: ["Task state", "One work item", "Progress, blockers, verification evidence"] },
        ],
      },
      callout: {
        label: "Coordination invariant",
        text: "Parallel agents are only useful when contracts and ownership are more explicit than they would be in a single-agent run.",
      },
    },
    {
      id: "benchmark",
      index: "04",
      eyebrow: "Evaluation plan",
      title: "The benchmark exists as a protocol, not yet as a result",
      paragraphs: [
        "The local evaluation harness defines four areas: long-horizon coding, code review, ambiguous PRD interpretation and frontend design. It fixes prompts, tools and effort, repeats each run three times and uses blind graders.",
        "Only one comparison row currently contains results. Publishing a multi-agent advantage now would turn package counts into a performance claim they cannot support.",
      ],
      bullets: [
        "Report median and range across three runs, not the best run.",
        "Score hidden-test correctness before stylistic preference.",
        "Normalize cost as dollars per completed task or detected defect.",
        "Release prompts, run logs, grader rubrics and failure cases together.",
      ],
    },
  ],
  limitations: [
    "Agent and skill counts describe the package surface, not developer productivity.",
    "Operational timing observations are not a controlled single-agent comparison.",
    "The current benchmark matrix is incomplete and must not be summarized as a result.",
  ],
  citation:
    'WIGTN Engineering. (2026). "WIGTN Coding: A Staged Multi-Agent Workflow for Software Delivery." WIGTN Research.',
};

const wigtnFlake: ResearchProject = {
  slug: "wigtn-flake",
  shortTitle: "WIGTN Flake",
  title: "Purpose-driven multi-agent analysis with Snowflake Cortex",
  dek: "A hackathon case study that follows a purpose-first product idea through orchestration, grounded analysis and the evidence boundaries of the working system.",
  track: "AI systems",
  status: "Case study",
  format: "System case study",
  date: "2026.04.29",
  authors: "WIGTN",
  venue: "Snowflake AI & Data Hackathon Korea 2026 · Tech Track 2nd Place",
  heroFigure: {
    src: "/images/projects/wigtn-flake-architecture.jpg",
    alt: "WIGTN Flake architecture presentation",
    caption:
      "The deployed path combines a GPT-4o orchestration layer with Snowflake semantic models, Cortex Analyst and selected ML/AI functions.",
  },
  heroSectionId: "architecture",
  links: [
    {
      label: "Watch demo",
      href: "https://www.youtube.com/watch?v=1YzSp3SdzTk",
      primary: true,
    },
    {
      label: "Award announcement",
      href: "https://www.newswire.co.kr/newsRead.php?no=1033575",
    },
  ],
  metrics: [
    {
      value: "5",
      label: "Purpose-specific agents",
      detail: "Different analytical roles in the debate",
    },
    {
      value: "3",
      label: "Actively used datasets",
      detail: "SPH, RichGo and AJD",
    },
    {
      value: "7",
      label: "Used Cortex capabilities",
      detail: "Verified along the production path",
    },
    {
      value: "2nd",
      label: "Tech Track",
      detail: "Snowflake Korea hackathon",
    },
  ],
  sections: [
    {
      id: "problem",
      index: "01",
      eyebrow: "Product question",
      title: "Start with the decision, not the dataset",
      paragraphs: [
        "We began with a product question rather than a warehouse query. A café founder, appliance marketer and property investor can look at the same neighborhood and need different evidence. WIGTN Flake begins with that goal, then changes the expert roles, semantic-model routing and final recommendation format.",
        "The output is a ranked top three with supporting signals, anomaly badges, a six-month projection and an action checklist rather than a generic dashboard.",
      ],
    },
    {
      id: "architecture",
      index: "02",
      eyebrow: "Architecture",
      title: "Orchestration, grounded analysis, synthesis",
      steps: [
        {
          label: "01",
          title: "Interpret the purpose",
          body: "The orchestrator selects analytical roles and determines which data domains are relevant.",
        },
        {
          label: "02",
          title: "Route to semantic models",
          body: "Cortex Analyst generates SQL over the selected SPH, RichGo or AJD semantic model.",
        },
        {
          label: "03",
          title: "Add ML and AI signals",
          body: "Forecasting, anomaly detection, sentiment and classification enrich the grounded evidence where the path supports them.",
        },
        {
          label: "04",
          title: "Debate in roles",
          body: "Five purpose-specific experts challenge the evidence and expose conflicting objectives.",
        },
        {
          label: "05",
          title: "Synthesize an action",
          body: "The system ranks districts and produces a concise next-step checklist.",
        },
      ],
      figures: [
        {
          src: "/images/projects/wigtn-flake-datasets.jpg",
          alt: "WIGTN Flake dataset presentation",
          caption:
            "The system grounds recommendations in commercial, real-estate and consumer-demand signals across three actively selected data domains.",
        },
      ],
    },
    {
      id: "audit",
      index: "03",
      eyebrow: "Execution scope",
      title: "Count only what the working path executes",
      lead:
        "We traced a working request from purpose interpretation through semantic-model selection, analysis and final synthesis. Public counts below cover components observed on that executed path rather than every asset connected to the project.",
      table: {
        caption: "Verified system composition",
        headers: ["Layer", "Verified scope", "Counting rule"],
        rows: [
          {
            cells: [
              "Purpose-specific agents",
              "5 analytical roles",
              "Counted from the roles participating in the working debate flow",
            ],
            highlight: true,
          },
          {
            cells: [
              "Data domains",
              "SPH, RichGo and AJD",
              "Counted when selected by the semantic-model route",
            ],
          },
          {
            cells: [
              "Cortex capabilities",
              "7 verified capabilities",
              "Counted only when invoked along the working request path",
            ],
          },
          {
            cells: [
              "Orchestration",
              "Purpose routing and grounded synthesis",
              "Described from the observed production flow",
            ],
          },
        ],
      },
      callout: {
        label: "What we publish now",
        text: "Five purpose-specific agents combine three actively used datasets and seven verified Cortex capabilities. Counts describe system composition, not recommendation accuracy.",
      },
    },
    {
      id: "evidence",
      index: "04",
      eyebrow: "Evidence status",
      title: "An awarded working system, not a decision-quality benchmark",
      paragraphs: [
        "The working demo and second-place award support the system case study. They do not establish that five agents recommend better locations than one agent, an analyst or a statistical baseline.",
      ],
      bullets: [
        "Future evaluation should use fixed location questions and human expert rankings.",
        "Every recommendation should preserve the executed SQL and source rows.",
        "Ablations should compare role debate, single-agent synthesis and deterministic ranking.",
        "Coverage should report how often each semantic model and ML function actually contributes to the final answer.",
      ],
    },
  ],
  limitations: [
    "The system was built for a bounded hackathon scenario and three actively used data domains.",
    "No controlled recommendation-quality benchmark has been released.",
    "Capability and dataset counts describe observed execution coverage, not recommendation quality or completeness.",
    "The demo video is evidence of execution, not evidence of decision accuracy.",
  ],
  citation:
    'WIGTN. (2026). "WIGTN Flake: Purpose-Driven Multi-Agent Analysis with Snowflake Cortex." WIGTN Research.',
};

export const RESEARCH_PROJECTS: ResearchProject[] = [
  wigtnOcr,
  wigvo,
  wigss,
  wigtnCoding,
  wigtnFlake,
];

export function getResearchProject(slug: string) {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
