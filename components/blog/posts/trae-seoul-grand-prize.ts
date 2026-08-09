import type { BlogPost } from "../data";

export const traeSeoulGrandPrize: BlogPost = {
  slug: "trae-seoul-grand-prize",
  tag: "GRAND PRIZE",
  title: "Grand Prize at Build with TRAE Seoul: WIGENT, built in three and a half hours",
  dek:
    "WIGENT drops your idea into a room of AI agents, lets them argue it to a conclusion, then turns the chat page itself into a landing page. Three of us built it in one afternoon at ByteDance's TRAE hackathon, and it took the Grand Prize.",
  date: "2026.03.28",
  place: "Seoul, KOR",
  readTime: "7 min",
  byline: "WIGTN",
  cover: {
    src: "/images/blog/trae-seoul-grand-prize/grand-prize-certificate.jpg",
    alt: "Grand Prize at Build with TRAE Seoul: WIGENT, built in three and a half hours",
    width: 2000,
    height: 1415,
  },
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/wigent" },
  ],
  body: [
    { t: "p", text: "Build with TRAE Seoul ran on 28 March 2026, one afternoon, organised by ByteDance around TRAE. Three of us entered and came out with 대상, the Grand Prize, KRW 500,000, certificate No. 20260328001. What we built was WIGENT: you give it a topic, a room of AI agents argues about it, and the page you have been reading the argument on turns into a landing page for whatever they agreed." },

    { t: "h", text: "The brief, and the clock" },
    { t: "p", text: "Three and a half hours, 12:30 to 16:00. Three engineers. The theme was agent design, which is a narrower brief than it sounds: calling a model in a loop and putting the word agent on it does not clear the bar." },
    { t: "p", text: "The constraint that actually shaped the build was the judging. Three rounds, in this order: an AI visits your deployed URL and grades the frontend, then a full code review, then a human panel. Three different readers, and only the last one can be told a story." },
    { t: "p", text: "So we designed backwards from the rubric rather than forwards from the idea. Round one wants a page that reads as finished at a glance, which argued for a familiar, dark, high-contrast interface over an inventive one. Round two wants code a stranger can follow in a hurry, which argued for strict TypeScript and components that each do one thing. Round three wants a moment, which argued for a demo whose ending is legible from the back of the room. Everything below is downstream of that paragraph." },

    { t: "h", text: "What we built" },
    { t: "p", text: "You type a topic and press enter. Two agents appear: a PM, who is the realist and whose first move is to ask who would actually pay for this, and a domain expert generated for whatever you typed, who is the visionary. They start talking in what looks like a Slack channel. A Designer joins at turn 3." },
    { t: "p", text: "The debate runs 30 turns. At turns 12 and 22 the non-fixed agents retire, with an exit line rather than a disappearance, and new specialists are spawned in their place, so the expertise in the room tracks where the argument has actually gone. After turn 25 the system prompt changes and no new ideas are allowed. The agents are told the debate is ending and that they must reach a conclusion, and the last stretch is them agreeing, narrowing, and writing down what they agreed." },
    { t: "p", text: "The conversation is then summarized and distilled into a structured idea: title, one-liner, target audience, revenue model, differentiator, market size, next steps. And then the page you have been watching stops being a chat and becomes a landing page for that idea." },
    { t: "p", text: "If you do not like it, you reject it. The PM announces the rejection to the room, the team runs eight more turns, and a new page comes out. That is the entire human role in the system: watch, and refuse. You never type into the debate itself." },
    {
      t: "gallery",
      images: [
        {
          src: "/images/blog/trae-seoul-grand-prize/stage-demo.jpg",
          width: 1500,
          height: 2000,
          alt: "Three WIGTN engineers presenting WIGENT on stage at Build with TRAE Seoul, with the Wigent topic-entry screen open in a browser on the wall display behind them.",
          caption:
            "Demoing the topic-entry screen. Everything after this point happened on its own.",
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: "The bet: do not let the model render the deliverable" },
    { t: "p", text: "The obvious way to build the ending is to hand the debate's conclusions to GPT-4o and ask it for HTML. We built that first, and on a stage it is unusable. Generation took 30 to 60 seconds, which in a live demo is 30 to 60 seconds of the word \"Generating\" in front of a panel. Quality swung wildly between runs. And GPT-4o would sometimes refuse the request outright, reading \"generate a landing page\" as something it should not do." },
    {
      t: "quote",
      text: "Sixty seconds of \"Generating…\" in front of the judges is not a loading state. It is the end of your demo.",
    },
    { t: "p", text: "What shipped instead runs two paths at once. When the final result arrives, a keyword match picks one of nine hand-built design templates (Glassmorphism, Neobrutalism, Editorial, Minimalism, Dark Neon, Bento Grid, Organic Shapes, Corporate, Gradient Mesh) and renders it immediately with the debate's conclusions in it. GPT-4o carries on generating its custom version in the background, and if the template is already on screen, that result is dropped unread." },
    { t: "p", text: "The trade-off is real and we would make it again in the same room. Nine templates cannot produce a design specific to your idea the way a model can. We took instant and consistent over bespoke and unpredictable, because the thing being judged was a demo." },
    { t: "p", text: "The refusal path did not go away; it got a fallback. The landing-page prompt was switched to English and reframed as a design prototype with placeholder content, refusals are detected by checking whether the response actually contains a doctype or an html tag, and a minimal template catches whatever gets through." },

    { t: "h", text: "What shipped, and in how long" },
    { t: "p", text: "The prototype worked end to end 55 minutes in. That is not a claim about typing speed. It is the result of one decision taken at minute 43." },
    { t: "p", text: "Three people cannot write in parallel against a codebase that does not exist yet. So before any implementation, we committed a 281-line types.ts: Agent, ChatItem, SSEEvent, DebateState, FinalIdea, HistoryEntry, and all thirteen SSE event payloads. That file was the contract. Backend core, the Slack-style chat UI, and the hooks and I/O layer were then written simultaneously against it and committed within a minute of each other. The merge had zero conflicts and integration took three minutes." },
    {
      t: "list",
      items: [
        "3.5 hours on the clock, 12:30 to 16:00. 26 commits, 26 source files, 16 components.",
        "55 minutes from start to a working end-to-end prototype, and 0 merge conflicts across the three parallel streams.",
        "8 agent design patterns in one coherent system: orchestrator, specialist agent, persistent agent, spawning, retirement, multi-turn debate, result synthesis, human-in-the-loop.",
        "13 typed SSE event types, 7 prompt functions, 9 design templates, about 35 GPT-4o calls per session.",
        "2 renames along the way. Agent Arena became Wegent became Wigent, the last of them at 15:23.",
      ],
    },
    { t: "p", text: "Each of the three worked with Claude Code, which is why a single commit here can contain ten finished components rather than one. It is not pair programming; it is three people each producing more than one person's output, held in line by a file they agreed on before any of them started." },
    { t: "p", text: "Two things we accepted rather than solved. Moving from three structured rounds to a 30-turn free debate tripled the model calls, from 10 to around 35, and stretched a session from two or three minutes to five or eight. We took it because real meetings do not announce Round 2, and the round boundaries were where the orchestrator's edge cases lived. And there are no tests. None. The orchestrator, the reducer and the SSE parser all deserve them and none of them have any." },

    { t: "h", text: "The result" },
    { t: "p", text: "The Grand Prize at Build with TRAE Seoul, awarded by ByteDance on 28 March 2026 in Seoul: KRW 500,000 and certificate No. 20260328001, made out to Hyunwoo Cho, Sang-Woo Son and Hyeonsang Kim. The citation on it credits creativity, technical expertise and innovative thinking, the way citations do. The part we would rather point at is the thing it was given for: the full page swap, the chat becoming the page, which is what the human panel remembered." },

    { t: "h", text: "What survived, and what did not" },
    { t: "p", text: "Some of this we can still point at. The rest is the list of things we knew were unfinished when we stopped." },
    {
      t: "list",
      items: [
        "Contract-first survived the afternoon that invented it. Five minutes spent on interfaces bought three hours of conflict-free parallel work, and it is the cheapest thing on this list.",
        "The three-round structure did not survive its own afternoon. Brainstorm, debate, converge was scrapped at 14:48 for the 30-turn free debate, because the round breaks felt artificial and the boundary logic was where the bugs were.",
        "GPT-generated HTML did not survive as the primary path. It is still in the build, still running, and still discarded whenever the template gets there first.",
        "Neither did the name. Agent Arena, then Wegent, then Wigent, which arrived at 15:23 and stuck.",
        "Human control is still watch-and-reject only. Letting a user steer the debate mid-conversation is the single change that would most improve the output, and it is not built.",
        "Every turn still calls GPT-4o. Only the opening, the closing and the synthesis need the top model; the rest could run on GPT-4o-mini at a tenth of the cost.",
        "There is still no editor. The only way to improve a generated page is to reject it and make them argue again.",
        "The shape came back. A month later at the Snowflake AI & Data Hackathon Korea, the build was again a panel of experts arguing over evidence before answering, that time over three Snowflake datasets, and it took 2nd in the Tech Track.",
      ],
    },

    { t: "h", text: "Built by" },
    { t: "p", text: "Hyunwoo Cho, Sang-Woo Son and Hyeonsang Kim." },
    { t: "p", text: "Thanks to ByteDance and the TRAE team for running it, and for a judging format that made us decide who would be reading the code before we wrote any." },
    { t: "quote", text: "Grand Prize, Build with TRAE Seoul. Three engineers, 3.5 hours, 26 commits, zero conflicts." },
  ],
};
