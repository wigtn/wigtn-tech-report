import type { BlogPost } from "../data";

export const obaWeekendthonTop6: BlogPost = {
  slug: "oba-weekendthon-top6",
  tag: "TOP 6",
  title: "Top 6 at OBA Weekendthon: MyunZy, an AI interviewer built in a weekend",
  dek:
    "MyunZy reads your real resume and a real job posting, then runs the interview before the interview. Two days at the Kakao AI Campus, built on a small open Korean model held in place by a deterministic harness rather than a large one left to improvise.",
  date: "2026.05.31",
  place: "Yongin, KOR",
  readTime: "5 min",
  byline: "WIGTN",
  cover: {
    src: "/images/blog/oba-weekendthon-top6/title-screen.jpg",
    alt: "Top 6 at OBA Weekendthon: MyunZy, an AI interviewer built in a weekend",
    width: 768,
    height: 1024,
  },
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/myunzy-hackathone" },
    { label: "Event", href: "https://luma.com/y3nz68hw" },
  ],
  body: [
    { t: "p", text: "OBA Weekendthon S1 ran from half past ten on Saturday 30 May to eight on Sunday evening at the Kakao AI Campus in Yongin. One night, two days, fifty builders, hosted by Hashed, Market Fit Lab and vooy under the Open Builders Alliance. Three of us went, and came out in the Top 6 with MyunZy (면지), an AI interviewer." },

    { t: "h", text: "The brief, and the one rule" },
    { t: "p", text: "The room was capped at fifty people, entering alone or in teams of up to three. Participation and lodging were free. The weekend was cut into four build sessions with three networking blocks wedged between them, and on the first evening every team stood up and pitched for about a minute, which is not long enough to explain an architecture and is exactly long enough to find out whether you have a product." },
    { t: "p", text: "One rule shaped every project: whatever you build has to run on the Open APIs the event provides. The board in the hall was in effect the spec sheet: OpenAI at the top as main sponsor, Nexon and LG U+ among the premium tier, and then the API sponsor row itself, ten companies deep: 강남언니, maroo, Rocketpunch, MyRealTrip, MOAT AI, SWING, Apifuse, GenRank, CryptoQuant, tobl.ai. You did not pick a stack and then go looking for an API. You read the board and worked backwards from it." },
    {
      t: "gallery",
      images: [
        {
          src: "/images/blog/oba-weekendthon-top6/title-screen.jpg",
          width: 768,
          height: 1024,
          alt: "The OBA Weekendthon title screen projected in the hall at the Kakao AI Campus, reading \"May 30–31, 2026\", above rows of organizer, sponsor, API-sponsor and VC logos.",
          caption:
            "The screen in the hall. The row labelled API Sponsor is the part that mattered: it was the list you were allowed to build on.",
          aspect: "3/4",
        },
      ],
    },
    { t: "p", text: "Judging was split down the middle, half from the official panel and half from peer review by the other teams. The second half is a different game. A panel judges a product. The other teams have spent the same two days against the same board of APIs, and they know exactly which parts of your demo are real." },

    { t: "h", text: "What MyunZy does" },
    { t: "p", text: "You hand it two things: your actual resume and an actual job posting. It reads both and assembles four interviewers (technical, culture fit, executive, and HR) each already knowing where your story is thin. Then you answer out loud." },
    { t: "p", text: "It follows up on whatever you fumble. Each round it keeps a weakness profile and diffs it before and after, so the questions in the third round come out of what you failed to say in the first. A branch replay takes you back to a single answer to try it a different way, which is the feature everyone used twice." },
    { t: "p", text: "The rest is the plumbing you only notice when it is missing. Qwen3 ASR returns word-level timestamps, which is what lets the rewind land on the exact sentence rather than somewhere near it, and what the STAR-based feedback points at. Qwen3-TTS gives the four interviewers voices, with the browser's own speech synthesis standing in when it is not available. A playbook detector reads the posting and decides whether it is interviewing a backend engineer, a frontend engineer, a PM, or none of the above." },

    { t: "h", text: "The bet: a small Korean model, held in place by the harness" },
    { t: "p", text: "The instinct in a hackathon is to reach for the largest model on the sponsor board and let it improvise. OpenAI's name was at the top of that board. We went the other way and ran EXAONE-4.5, LG AI Research's open Korean model, on vLLM behind an OpenAI-compatible endpoint with Hermes-style tool calls." },
    { t: "p", text: "A small model improvises badly, so we arranged not to ask it to. Everything that could be made deterministic was moved out of the model: schema validation on every tool call, automatic re-prompting when one comes back malformed, DeepAgents' wrap_tool_call middleware wrapped around the lot, and the verdict and the scoring computed in pure functions with no randomness in them at all. The model's job is to stay in character and ask the next question. The harness does the rest." },
    { t: "p", text: "The failure we were buying insurance against is the one everybody has watched happen: an interviewer persona that is sharp for four turns and then quietly softens into a helpful assistant. Holding character to the last question turned out to be a harness problem rather than a parameter-count problem, and that is the finding we would defend." },

    { t: "h", text: "What shipped in two days" },
    {
      t: "list",
      items: [
        "The whole product runs with zero API keys. All eight external integrations ship mocked, alongside a mock LLM, so the repo can be cloned and an interview held end to end without an account anywhere.",
        "Promotion to the live services is an environment variable rather than a code change: LLM_PROVIDER=exaone swaps the mock model for EXAONE-4.5, HARNESS=deepagents swaps the stub for a real DeepAgents bootstrap.",
        "Complete by the end: the web UI on Next.js 16, the Python agent service on FastAPI, the EXAONE integration, the real harness, and voice in and out.",
        "Not complete: the external adapters. MISO for resume OCR, Rocketpunch for job postings and GenRank for company ratings, all behind API Fuse as the gateway: written, wired, and still pointed at their mocks, because the keys had not landed. It shipped that way rather than pretending otherwise.",
        "Prompt-injection defense on user input, on the grounds that a resume and a job posting are both text somebody else wrote.",
      ],
    },
    { t: "p", text: "The commit log is not a good measure of this weekend. The public repo was created at 13:51 on the Sunday and holds eight commits over the two hours after that, closing with three small fixes to the microphone, the PDF path, and a leftover sample. The two merged pull requests in it, model-driven skill selection by progressive disclosure and streaming a turn so the text arrives before the speech does, were the last real features in. Everything earlier lived elsewhere. Take the eight as a count of what was pushed, not of what was built." },

    { t: "h", text: "Top 6" },
    { t: "p", text: "Top 6 out of a room capped at fifty, on a score that was half official panel and half the other teams. The peer half is the one we would put on the wall." },
    { t: "quote", text: "Top 6 at OBA Weekendthon, built by three engineers in two days." },

    { t: "h", text: "The room was the prize" },
    { t: "p", text: "The best part of a weekendthon is not your own build. It is watching the other teams start from the same blank page, the same board of APIs and the same two days, then walk out with things none of us would have thought of. We went for the trophy and left with a list of ideas to steal." },
    { t: "p", text: "Built by Hyeonsang Kim, Jinmo Kim, and Sang-Woo Son. Hosted by Hashed, Market Fit Lab and vooy, under the Open Builders Alliance, at the Kakao AI Campus in Yongin." },
  ],
};
