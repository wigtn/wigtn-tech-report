// Shared content model for the technical report index and detail routes.
export type ResearchStatus =
  | "Peer reviewed"
  | "Open model"
  | "Measured system"
  | "Engineering note"
  | "Case study"
  | "동료 심사"
  | "오픈 모델"
  | "실측 시스템"
  | "엔지니어링 노트"
  | "사례 연구";

export type ResearchTrack =
  | "Models & evaluation"
  | "AI systems"
  | "Agentic engineering"
  | "모델 및 평가"
  | "AI 시스템"
  | "에이전틱 엔지니어링";

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
  titleLines?: string[];
  dek: string;
  language?: "en" | "ko";
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

const codexSelectiveHarness: ResearchProject = {
  slug: "codex-selective-harness",
  shortTitle: "WIGTN Plugin for Codex",
  title: "The harness stopped earning its cost on GPT-5.6 Sol",
  dek: "On two SWE-bench Verified tasks, GPT-5.6 Sol resolved 4/4 runs in each condition, with and without the legacy WIGTN harness. The harness increased median wall time by 151.7%, output tokens by 141.2%, and command count by 32.0%. We used this result to redesign WIGTN around selective, task-dependent intervention.",
  language: "en",
  track: "Agentic engineering",
  status: "Measured system",
  format: "Evaluation report",
  date: "2026.07.28",
  authors: "Hyeonsang Kim",
  heroFigure: {
    src: "/images/projects/codex-selective-harness-eval.svg",
    alt: "Task resolution and execution cost for Bare Codex and the legacy WIGTN harness",
    caption:
      "GPT-5.6 Sol on the SWE-bench Verified development sample. Bare Codex and the legacy harness each resolved 4/4 runs, while the legacy-harness condition increased median wall time, output tokens and command count.",
    contain: true,
  },
  heroSectionId: "results",
  links: [
    {
      label: "Source repository",
      href: "https://github.com/wigtn/wigtn-plugins-codex",
      primary: true,
    },
    {
      label: "Source report (Korean)",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/TECHNICAL-REPORT-DRAFT-2026-07-28-KO.md",
    },
    {
      label: "External evaluation protocol",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/EXTERNAL-EVAL-PROTOCOL-2026-07-28-KO.md",
    },
    {
      label: "Machine-readable SWE-bench results",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/tests/external/swe-bench-verified/results-2026-07-28.json",
    },
    {
      label: "FeatureBench integrity audit",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/FEATUREBENCH-LIFT-PILOT-2026-07-28-KO.md",
    },
    {
      label: "Routine coding noninterference gate",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/ORDINARY-NONINTERFERENCE-GATE-2026-07-28-KO.md",
    },
    {
      label: "WorkGraph pilot",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/WORKGRAPH-PILOT-2026-07-28-KO.md",
    },
    {
      label: "Follow-up research plan",
      href: "https://github.com/wigtn/wigtn-plugins-codex/blob/14ac417c42b6196e6ef2ab3116701828dc9cea4c/docs/RESEARCH-ROUND2-2026-07-28-KO.md",
    },
  ],
  metrics: [
    {
      value: "4/4 = 4/4",
      label: "Resolved tasks",
      detail: "Bare Codex and legacy WIGTN harness",
    },
    {
      value: "+151.7%",
      label: "Median wall time",
      detail: "120.21s to 302.62s",
    },
    {
      value: "+141.2%",
      label: "Median output tokens",
      detail: "3,613 to 8,715.5",
    },
    {
      value: "0",
      label: "Repeatable quality lifts",
      detail: "After integrity exclusions",
    },
  ],
  sections: [
    {
      id: "question",
      index: "01",
      eyebrow: "Problem",
      title: "When the model improves, the harness needs another evaluation",
      lead:
        "WIGTN Plugin made recurring product-development practices reusable in Codex, including requirements, verification and release decisions. As repository exploration, implementation planning, code changes and testing became native model behaviors, we needed to test whether the older workflow still added value.",
      paragraphs: [
        "Here, a harness means the task order, inspection steps and completion rules placed around the model. Rather than port the Claude Code workflow unchanged, we held the model and tasks constant and measured whether its additional machinery improved the outcome.",
      ],
      callout: {
        label: "Evaluation question",
        text: "Does the previous, heavier implementation harness improve the output of a strong coding model, or does it repeat work the model already performs and add cost?",
      },
    },
    {
      id: "method",
      index: "02",
      eyebrow: "Method",
      title: "We changed the harness, not the model or the task",
      lead:
        "We held GPT-5.6 Sol constant so that changes in the model would not be confused with changes in the harness. The Bare condition used Codex without the plugin; the legacy-harness condition added the previous, heavier WIGTN implementation process.",
      steps: [
        {
          label: "Arm 01",
          title: "Bare",
          body: "Codex explores the repository, makes the change and runs the relevant existing tests.",
        },
        {
          label: "Arm 02",
          title: "Legacy harness",
          body: "The same model and task receive the legacy WIGTN harness, including planning, verification and completion records.",
        },
        {
          label: "Tasks",
          title: "SWE-bench Verified",
          body: "Two fixed bug-report tasks from the Astropy and Pytest repositories.",
        },
        {
          label: "Trials",
          title: "2 × 2",
          body: "Two trials per condition for each task, with execution order reversed between repetitions.",
        },
      ],
      paragraphs: [
        "Every run started from a clean workspace inside a task-specific Docker environment. We fixed the problem statement and base commit, then preflighted both the expected failure and the reference patch. A run counted as resolved only when the official tests covering the new and existing behavior passed.",
        "Each trial’s evaluation packet recorded wall-clock seconds, output tokens and tool or command calls. The table reports the median across the four runs in each condition. The released packet does not expose finer-grained timer boundaries, and the ARM host used x86 Docker emulation, so wall time is treated as an environment-sensitive secondary metric rather than a portable latency claim.",
        "The sample contains only two tasks and two trials per condition. It does not establish that every harness becomes less useful as model capability increases. It tests one narrower question: with a strong model held constant, did the legacy harness add value?",
      ],
    },
    {
      id: "results",
      index: "03",
      eyebrow: "Results",
      title: "Both conditions solved every run, but the legacy harness cost more",
      lead:
        "Bare Codex and the legacy harness each resolved all four runs. Across the eight runs, no matched pair differed in resolution.",
      paragraphs: [
        "The additional cost came from separate planning, inspection and completion logging, even for small bug fixes. In this sample, those steps did not change the code outcome.",
      ],
      table: {
        caption: "GPT-5.6 Sol paired comparison, overall median",
        headers: ["Metric", "Bare", "Legacy harness", "Delta"],
        rows: [
          {
            cells: ["Resolved", "4/4", "4/4", "No difference"],
            highlight: true,
          },
          {
            cells: ["Wall time", "120.21 sec", "302.62 sec", "+151.7%"],
          },
          {
            cells: ["Output tokens", "3,613", "8,715.5", "+141.2%"],
          },
          {
            cells: ["Commands", "12.5", "16.5", "+32.0%"],
          },
        ],
      },
    },
    {
      id: "interpretation",
      index: "04",
      eyebrow: "Interpretation",
      title: "The clearest benefit was enforcing team rules, not improving code outcomes",
      lead:
        "The FeatureBench pilot produced no intact, repeatable coding-performance lift. In a separate GPT-5.5 PRD-format evaluation, the plugin improved compliance with WIGTN’s predefined structure from 0/3 to 3/3.",
      table: {
        caption: "Evidence by task type",
        headers: ["Evaluation", "Observed result", "What it supports"],
        rows: [
          {
            cells: [
              "SWE-bench Verified",
              "Bare 4/4, legacy harness 4/4",
              "No quality lift in the selected coding sample",
            ],
          },
          {
            cells: [
              "FeatureBench pilot",
              "0 intact, repeatable lifts",
              "No general coding-quality claim",
            ],
          },
          {
            cells: [
              "PRD format (GPT-5.5)",
              "Bare 0/3 → Plugin 3/3",
              "Reproducible team-defined document structure",
            ],
            highlight: true,
          },
        ],
      },
      paragraphs: [
        "The PRD evaluation measured format compliance rather than overall document quality. It checked requirement IDs, unresolved decisions and acceptance criteria. The result supports a narrower benefit: applying team rules the model cannot infer on its own.",
        "We invalidated the first successful Seaborn Plugin run in FeatureBench after discovering that it had read an installed copy of the same project outside the workspace. The incident made one principle explicit: passing tests is not enough to trust an evaluation. Access to reference implementations and hidden tests must be audited as part of the result.",
      ],
    },
    {
      id: "decision",
      index: "05",
      eyebrow: "Product decision",
      title: "Keep routine implementation light. Add structure where failure is expensive.",
      lead:
        "After the evaluation, we shifted the plugin from directing implementation to selectively applying requirements, verification and release rules. Low-risk local changes no longer follow the same path as work that requires durable requirements and evidence.",
      steps: [
        {
          label: "Fast",
          title: "Routine implementation",
          body: "Find the cause, make the smallest change, run focused tests and perform only the relevant checks. Small changes do not create a WorkGraph or requirements table.",
        },
        {
          label: "Assurance",
          title: "High-risk changes",
          body: "For authorization, data structures, concurrency and migrations, connect requirements and risks to code locations and executed evidence.",
        },
        {
          label: "State",
          title: "WorkGraph",
          body: "Create one only when interruption recovery or a durable plan is explicitly required. When a source changes, dependent work and checks return to stale.",
        },
        {
          label: "Release",
          title: "Separate authority",
          body: "Keep verification state separate from authority to commit, push or open a PR. Recorded state never replaces the user’s current request.",
        },
      ],
    },
    {
      id: "validation",
      index: "06",
      eyebrow: "Validation after redesign",
      title: "We checked that the revised structure stayed out of routine coding",
      lead:
        "We kept the experiment that measured the legacy harness separate from validation of the current design. After the redesign, we independently tested routine-coding noninterference, WorkGraph state rules and fixed-input regression behavior.",
      bullets: [
        "Bare Codex and the current WIGTN configuration both passed 12/12 hidden tests across 12 synthetic Python, JavaScript and Ruby bug fixes.",
        "There were zero out-of-scope edits, unsolicited PRDs, WorkGraphs or release states, and zero losses of user-authored drafts.",
        "WorkGraphs in all 12 isolated repositories passed the final schema check; all 144 provenance, requirement, task, check, risk and protected-path fields passed as well.",
        "We ran 67 fixed-input regression tests covering WorkGraph creation, change propagation, format migration, completion rules and release authority.",
      ],
      paragraphs: [
        "The current evidence supports a narrower claim: in this development sample, the selective design did not turn routine coding into a full product workflow. We have not established that it produces better plans or better general coding outcomes than Bare Codex.",
      ],
    },
  ],
  limitations: [
    "The primary comparison is a development sample limited to two SWE-bench Verified tasks and two trials per task.",
    "Because GPT-5.6 Sol was held constant, the comparison does not establish that every harness becomes less useful as model capability increases.",
    "We invalidated the FeatureBench run that accessed a reference implementation and observed no intact, repeatable lift in general coding quality.",
    "Some raw execution packets are not included in a durable public repository, so this is not a complete third-party reproduction package.",
  ],
  citation:
    'Kim, Hyeonsang. (2026). "WIGTN Plugin for Codex: The harness stopped earning its cost on GPT-5.6 Sol." WIGTN Technical Reports.',
};

const wigtnOcr: ResearchProject = {
  slug: "wigtnocr",
  shortTitle: "WigtnOCR",
  title: "A 2B parser that outperforms its 30B teacher on retrieval",
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
      title: "Use the 30B teacher offline and serve the 2B student",
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
        caption: "OmniDocBench selected metrics",
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
        caption: "KoGovDoc retrieval, 564 queries",
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
  title: "Stopping a phone-call translator from translating its own echo",
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
      id: "detector",
      index: "04",
      eyebrow: "What failed first",
      title: "Three echo gates failed before the one that shipped",
      lead:
        "The deployed gate is the fourth design. The three before it each failed in a way that pointed at the same underlying rule.",
      steps: [
        {
          label: "Attempt 1",
          title: "Audio fingerprinting",
          body: "Correlating outgoing synthesis against incoming line audio. It is the idea the ablation section measures: it halved the loop rate and never became reliable, because μ-law is a non-linear quantizer and the correlation it needs does not survive the codec.",
        },
        {
          label: "Attempt 2",
          title: "Fixed 2.5s gate",
          body: "Blocking a constant window after every synthesis stopped the loop and broke the conversation: a caller who answered quickly was silenced.",
        },
        {
          label: "Attempt 3",
          title: "Dynamic cooldown",
          body: "Scaling the window to synthesis length restored the turn-taking, then exposed a noise spike from the line's automatic gain control the moment the gate released.",
        },
        {
          label: "Deployed",
          title: "Silence injection with settling",
          body: "Replace rather than block, add a settling window scaled to synthesis length, and put an energy gate and a local VAD behind it.",
        },
      ],
      callout: {
        label: "Drop vs replace",
        text: "Dropping packets reads to the far end as a dead stream, and server-side voice activity detection stops with it. Replacing them with valid μ-law silence (0xFF) keeps the stream continuous while the detector correctly hears nothing. The same rule fixed both the echo gate and the VAD, which is why it is stated as a principle rather than a patch.",
      },
    },
    {
      id: "vad",
      index: "05",
      eyebrow: "Voice activity",
      title: "The hosted detector assumed audio the phone network does not carry",
      paragraphs: [
        "Server-side voice activity detection is tuned for clean wideband input. On PSTN, steady background noise sits inside the range it reads as speech, so the end-of-turn event arrived tens of seconds late or never arrived at all. Tuning the energy threshold did not converge: no single value separated speech from line noise across calls.",
        "The detector moved on-device instead, which made the decision inspectable frame by frame and let the gate above it stay authoritative. Onset and offset are deliberately asymmetric, because the cost of the two errors is not symmetric: clipping the start of a sentence is worse than holding the line open a moment too long.",
      ],
      bullets: [
        "Energy gate first, with a higher threshold inside the echo window than outside it.",
        "A local neural detector second, on 8 kHz audio upsampled to the rate it expects.",
        "Asymmetric hysteresis: a short onset to catch the first syllable, a long offset to survive a pause mid-sentence.",
        "A minimum utterance length and a minimum peak, so a weak fragment is rejected as noise rather than sent for recognition.",
      ],
      callout: {
        label: "Measured change",
        text: "End-of-turn detection moved from the tens of seconds, and sometimes never, to sub-second.",
      },
    },
    {
      id: "hallucination",
      index: "06",
      eyebrow: "Recognition safety",
      title: "The recognizer invented a news anchor, and it reached a real phone",
      paragraphs: [
        "Feed line noise to a speech recognizer trained on broadcast and video audio and it does not return nothing. It returns something plausible from that distribution: a station ident, a sign-off, a subscribe prompt. In production, one such phrase passed through translation and was spoken to a recipient. Nothing upstream was wrong; the recognizer had simply been handed noise and answered confidently.",
        "The fix is layered, and the ordering matters. The cheapest layer is not to hand the recognizer noise in the first place, which is what the gates above already do. What survives that is caught by pattern, and what survives pattern matching is caught after translation, where the cost of a false positive is a short delay rather than a wrong sentence in someone's ear.",
      ],
      steps: [
        {
          label: "Before recognition",
          title: "Do not submit contaminated audio",
          body: "The echo gate and silence injection mean the recognizer never receives the frames most likely to produce an invention.",
        },
        {
          label: "After recognition",
          title: "Pattern and shape filters",
          body: "A blocklist of broadcast-style phrases in both languages, plus checks on minimum length, silence timeout, repeated phrases and recognizer confidence.",
        },
        {
          label: "After translation",
          title: "Three-level guardrail",
          body: "Most turns pass through untouched. A suspect turn is spoken while a correction runs behind it. Only the worst class is held back for a corrected rewrite, which is the one path that adds audible delay.",
        },
      ],
      callout: {
        label: "Why this is in the report",
        text: "This subsystem exists because of an incident, not a design review. A relay that is honest about what reached a caller is more useful than one that reports only its aggregate accuracy.",
      },
    },
    {
      id: "pipelines",
      index: "07",
      eyebrow: "System shape",
      title: "One relay, three conversations",
      lead:
        "The echo problem is shared. What differs is who is speaking, and that turned out to be the axis worth building around.",
      steps: [
        {
          label: "Voice to voice",
          title: "Both sides speak",
          body: "The bidirectional case in the paper: two directional sessions, the gates between them, interrupt handling on both ends.",
        },
        {
          label: "Text to voice",
          title: "One side types",
          body: "The caller types and the recipient hears synthesized speech. This is the path for a user who cannot use voice, and it removes the caller-side echo problem entirely.",
        },
        {
          label: "Full agent",
          title: "Neither side is the caller",
          body: "The relay places and holds the call on the user's behalf, with tool calls for the task it was given.",
        },
      ],
      paragraphs: [
        "The three share the echo-gating logic through one component rather than reimplementing it, which is what made the second and third modes cheap to add. An earlier single-object router that switched on mode internally was the thing that had to go first.",
        "The text-to-voice path is not a lesser mode. In the field study it was the most used of the three, which was not what the design assumed at the start.",
      ],
    },
    {
      id: "evaluation",
      index: "08",
      eyebrow: "Field evaluation",
      title: "Then we took it through 155 Korean-English calls",
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
      index: "09",
      eyebrow: "Conference field notes",
      title: "Questions from ACL and IWSLT",
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
    "The field study covers Korean-English calls over PSTN, not wideband app-to-app audio or a broad language matrix.",
    "Session B latency remains ASR-bound and its P95 is not yet acceptable for every conversational setting.",
    "COMET uses offline LLM references rather than human translations, and no formal user study is reported.",
    "Cost reflects one provider configuration and pricing period.",
    "The hallucination blocklist is pattern-based and language-specific, so it generalizes to a new language only after the patterns for it are written.",
    "Mode usage comes from the same field study and reflects who was invited to it, not a representative population.",
  ],
  citation:
    'Kim, H. et al. (2026). "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating." ACL 2026 System Demonstrations, 336–344.',
};

const wigss: ResearchProject = {
  slug: "wigss",
  shortTitle: "WIGSS",
  title: "Fixing the last ten pixels in the browser without losing the diff",
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
    'WIGTN Engineering. (2026). "WIGSS: Fixing the last ten pixels in the browser without losing the diff." WIGTN Research.',
};

const wigtnCoding: ResearchProject = {
  slug: "wigtn-coding",
  shortTitle: "WIGTN Plugin",
  title: "Splitting agent roles is easy; keeping their assumptions in sync is not",
  dek: "An engineering note on the coordination problem behind multi-agent coding: separating roles is easy; keeping assumptions, contracts and release evidence shared is the hard part.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Workflow architecture",
  date: "2026.03.28",
  authors: "WIGTN Engineering",
  heroFigure: {
    src: "/images/projects/wigtn-coding-workflow.svg",
    alt: "WIGTN Plugin six-stage delivery workflow",
    caption:
      "The released workflow moves from PRD definition through independent review, bounded implementation and an explicit release decision.",
    contain: true,
  },
  heroSectionId: "workflow",
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
      title: "Do not make every engineering decision in one context",
      paragraphs: [
        "We started from a recurring failure mode: one coding session mixes requirements, architecture, implementation and review until early assumptions become invisible. Later reviewers then inherit decisions they never independently checked.",
        "WIGTN Plugin separates those responsibilities into named stages with explicit artifacts. Parallelism is useful only when it creates independent scrutiny and bounded ownership, not when it merely increases the number of agents on screen.",
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
    'WIGTN Engineering. (2026). "WIGTN Plugin: Splitting agent roles is easy; keeping their assumptions in sync is not." WIGTN Research.',
};


/* Ordered by publication date, newest first, rather than by hand. `date` is
 * zero-padded "YYYY.MM" or "YYYY.MM.DD", so a plain string compare is already
 * chronological; a month-only entry sorts just after the same month's dated
 * ones, which is what we want. Sorting the exported array (not just the index)
 * keeps the hub, the related-reports rail and the sitemap in one order. */
export const RESEARCH_PROJECTS: ResearchProject[] = [
  codexSelectiveHarness,
  wigtnOcr,
  wigvo,
  wigss,
  wigtnCoding,
].sort((a, b) => b.date.localeCompare(a.date));

export function getResearchProject(slug: string) {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
