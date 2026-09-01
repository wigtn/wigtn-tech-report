// Shared content model for the technical report index and detail routes.
import type { ReportAuthorId } from "./authors";

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

/* `width` and `height` are the file's real pixel dimensions, measured rather
 * than guessed. They are what lets a figure render at its own aspect ratio
 * instead of being letterboxed into a fixed box, and what stops the page
 * reflowing as images arrive. Measure with sips, or read the viewBox for an
 * SVG. Do not estimate: a wrong ratio here is a visibly stretched chart.
 *
 * `contain` affects the two places that crop to a 16:10 tile: the hub card and
 * the banner above section 01. Body figures never crop — they render at their
 * own ratio — so it is not read there. `focalPoint` is read nowhere. */
export type ResearchFigure = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  contain?: boolean;
  portrait?: boolean;
  focalPoint?: string;
};

/* No `index` field. The number a section displays is its position in this
 * array, computed where it is rendered.
 *
 * It used to be a hand-written string, and it drifted: WIGVO ran 01, 02, 03,
 * 05 ... 13, because a section was cut and nothing renumbered what followed.
 * The hole then collided with the rest of the page, since Limitations and
 * Sources were already derived from `sections.length`: Limitations came out as
 * 13 next to a section that also called itself 13. Two numbering schemes over
 * one list, one typed and one derived, could only agree by luck. */
export type ResearchSection = {
  id: string;
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
  /* Headline for the hub card. The full `title` is written to sit above the
   * article, where it has a whole page under it; on a 370px tile it wraps to
   * three ragged lines and stops being a hook. The banner already carries the
   * product name, so this says what the report found, not what it is about. */
  cardTitle?: string;
  dek: string;
  language?: "en" | "ko";
  track: ResearchTrack;
  status: ResearchStatus;
  format: string;
  date: string;
  /* Who is answerable for this report, rendered as the byline with their
   * portrait. Required on purpose: a new report cannot be added without picking
   * a person, because `tsc` fails on a missing key. The alternative was a note
   * asking whoever adds a report to remember, and a note is not a check.
   *
   * Ask the person creating the report who to register, rather than inferring
   * it from whoever ran the commit. Ids are in authors.ts. */
  authorId: ReportAuthorId;
  /* The formal credit line, kept only where it says something the byline does
   * not. WIGVO is a five-author ACL paper: naming one of them as the report's
   * author is right, dropping the other four is not. The four reports that had
   * "WIGTN Engineering" or a single name here carry no such list, so theirs is
   * absent and the byline is the whole credit. */
  authors?: string;
  venue?: string;
  featured?: boolean;
  heroFigure?: ResearchFigure;
  heroSectionId?: string;
  links: ResearchLink[];
  metrics: ResearchMetric[];
  sections: ResearchSection[];
  limitations: string[];
};

export const researchHref = (slug: string) => `/${slug}/`;

const codexSelectiveHarness: ResearchProject = {
  slug: "codex-selective-harness",
  shortTitle: "WIGTN Plugin for Codex",
  title: "Running a harness on frontier models, part 2: Codex",
  dek: "On two SWE-bench Verified tasks, GPT-5.6 Sol resolved 4/4 runs in each condition, with and without the legacy WIGTN harness. The harness increased median wall time by 151.7%, output tokens by 141.2%, and command count by 32.0%. We used this result to redesign WIGTN around selective, task-dependent intervention.",
  language: "en",
  track: "Agentic engineering",
  status: "Measured system",
  format: "Evaluation report",
  date: "2026.07.28",
  authorId: "hyeonsang-kim",
  /* The banner is OpenAI's Codex brand image, used to identify the tool this
   * report evaluates. It illustrates nothing we measured, so it carries no
   * caption and `heroSectionId` is deliberately absent: it runs on the hub card
   * and as the banner above section 01, never as a numbered figure in the body.
   * The chart it replaced now sits in `results`, where its caption can sit next
   * to the numbers it plots. */
  heroFigure: {
    src: "/images/projects/codex_image_v1.jpg",
    width: 1600,
    height: 900,
    alt: "Codex",
    caption: "",
  },
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
      eyebrow: "Results",
      title: "Both conditions solved every run, but the legacy harness cost more",
      lead:
        "Bare Codex and the legacy harness each resolved all four runs. Across the eight runs, no matched pair differed in resolution.",
      paragraphs: [
        "The additional cost came from separate planning, inspection and completion logging, even for small bug fixes. In this sample, those steps did not change the code outcome.",
      ],
      figures: [
        {
          src: "/images/projects/codex-selective-harness-eval.svg",
          width: 1600,
          height: 1000,
          alt: "Task resolution and execution cost for Bare Codex and the legacy WIGTN harness",
          caption:
            "GPT-5.6 Sol on the SWE-bench Verified development sample. Bare Codex and the legacy harness each resolved 4/4 runs, while the legacy-harness condition increased median wall time, output tokens and command count.",
          contain: true,
        },
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
};

const wigtnOcr: ResearchProject = {
  slug: "wigtnocr",
  shortTitle: "WigtnOCR",
  title: "A 2B parser that outperforms its 30B teacher on retrieval",
  cardTitle: "Distilled from 30B, first of six on Hit@1",
  dek: "An engineering account of how we used a 30B teacher once, served the task with a 2B student, and checked whether parsing gains survived downstream retrieval.",
  track: "Models & evaluation",
  status: "Open model",
  format: "Model report",
  date: "2026.05.20",
  authorId: "hyeongseob-kim",
  featured: true,
  /* Brand banner, same treatment as the two harness reports: no caption, no
   * `heroSectionId`, so it identifies the report on the hub card and above
   * section 01 without posing as a figure in the body. Square, and the only one
   * that is: the 16:10 banner crop takes it from the empty sky around the mark,
   * not from the mark. The highlights chart it replaced moved into `parsing`,
   * next to the table of the numbers it plots. */
  heroFigure: {
    src: "/images/projects/wigtnocr_v1_image.jpg",
    width: 1254,
    height: 1254,
    alt: "WigtnOCR on Hugging Face",
    caption: "",
  },
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
      eyebrow: "Problem",
      title: "The output looked readable. Retrieval told a different story",
      lead:
        "Korean public documents combine scans, multi-column layouts, forms, charts, stamps and dense tables. We learned quickly that readable text alone was not the useful output. The structure had to survive long enough for retrieval to recover it.",
      paragraphs: [
        "A parser can look visually clean and still remove the value that answers a user’s question. That gap changed the evaluation plan: WigtnOCR separates intrinsic parsing quality from downstream retrieval quality instead of compressing both into one headline score.",
        "OmniDocBench measures text, tables, formulas and reading order. KoGovDoc then holds the retriever and chunking policy fixed and measures how much answer-bearing content remains recoverable after parsing.",
      ],
      figures: [
        {
          src: "/images/projects/wigtnocr-highlights.png",
          width: 4270,
          height: 1424,
          alt: "WigtnOCR benchmark highlights",
          caption:
            "Parsing and retrieval highlights from the released WigtnOCR evaluation, shown together because the report's argument is that the two do not move together. Lower is better for NED; higher is better for TEDS and retrieval metrics.",
          contain: true,
        },
      ],
      callout: {
        label: "What we wanted to know",
        text: "Can a 2B student preserve the useful document behavior of a 30B teacher, and does that preservation survive all the way to retrieval?",
      },
    },
    {
      id: "why",
      eyebrow: "Alternatives",
      title: "Four kinds of parser, and what each one loses on a Korean government PDF",
      lead:
        "The model exists because the four things you would reach for first each fail differently on this corpus.",
      steps: [
        {
          label: "Plain OCR",
          title: "Reads characters, not documents",
          body: "It recovers text and drops the structure that says which value belongs to which field. PaddleOCR, the one measured here, returned between a third and a thirtieth of the text the deployed model did, losing most tables, forms and multi-column layouts.",
        },
        {
          label: "Rule-based",
          title: "Fast, and structurally blind",
          body: "PyMuPDF4LLM extracts quickly and recognises almost no structure: the article-clause-item hierarchy in a statute, and any page mixing a table with a diagram and prose, come out flat. Not the whole family, though. Marker is rule-based and leads text accuracy and reading order in the comparison two sections down.",
        },
        {
          label: "Recent VLM parsers",
          title: "Trained on other people's documents",
          body: "The current open VLM parsers are trained mostly on English and Chinese material. Korean government documents bring complex tables, forms, official seals, scanned pages mixed with digital ones, and multi-column layouts they were not tuned for.",
        },
        {
          label: "A 30B VLM",
          title: "Good, and not deployable here",
          body: "Parsing quality is high, but it needs two GPUs and is slow to serve. The project's constraint was the GPU budget, and a 2B model meets it: one GPU to serve, and an edge deployment that is actually realistic.",
        },
      ],
      callout: {
        label: "Where the constraint came from",
        text: "The work started inside a B2B2G retrieval service, where the end user's document structure cannot be known in advance but the domain can: Korean government documents. That fixed the target and left the infrastructure budget as the hard limit.",
      },
    },
    {
      id: "method",
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
      id: "judge",
      eyebrow: "Supervision",
      title: "The judge reads text only, and that is the point",
      paragraphs: [
        "A 122B text-only model scored every generated page on five dimensions: structure, table quality, completeness, hallucination and consistency. It never sees the source image, and that is deliberate rather than a shortcut.",
        "A vision model grading a vision model's output shares its visual interpretation bias, so the two agree on the same misreading and the evaluation closes a loop instead of testing anything. Separating the judge into a text-only model asks a different question: not whether this matches the image, but whether this output is usable as training data at all. Repetition loops, truncated text and leaked reasoning are all detectable from the text alone.",
        "Scores run one to five and anything below three was dropped. 75.1% of the Korean government pages cleared that bar, and 73.8% of the arXiv pages.",
      ],
      callout: {
        label: "A finding that changed the pipeline",
        text: "The first teacher was a reasoning model. Its output was unstable for this task: thinking tags leaked into the transcription and long pages truncated. Switching to the instruction-tuned model of the same size fixed both. For document transcription, instruction tuning beat reasoning.",
      },
    },
    {
      id: "data",
      eyebrow: "Data",
      title: "Two things wrong with the corpus before any training ran",
      bullets: [
        "One document accounted for 53% of the pages. A model trained on that learns that document rather than the domain, so a per-document ratio cap of 0.25 was applied.",
        "The reasoning teacher had left English thinking traces inside some of the generated Markdown. Twenty pages were deleted outright and 257 were repaired.",
        "What survived: 2,667 training pages and 294 held out and excluded from training. The split is at page level; the source does not establish that a held-out page never shares a document with a trained one.",
      ],
      callout: {
        label: "Why this is in the report",
        text: "Both problems were invisible in the aggregate quality score and would have been invisible in the final metrics too. They were found by looking at the corpus rather than at the numbers it produced.",
      },
    },
    {
      id: "parsing",
      eyebrow: "Intrinsic evaluation",
      title: "The student improves tables without winning every metric",
      lead:
        "WigtnOCR matches the teacher on text NED and substantially improves table TEDS, while the teacher remains stronger on formula CDM.",
      figures: [
        {
          src: "/images/projects/wigtnocr-omnidocbench.png",
          width: 5421,
          height: 1704,
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
      id: "ablation",
      eyebrow: "Ablation",
      title: "A bigger adapter made the tables worse",
      lead:
        "At this data size, rank 8 beat rank 32. The larger adapter improved formula CDM slightly and regressed the structure preservation the model exists for.",
      table: {
        caption: "LoRA configuration against OmniDocBench",
        headers: ["Config", "Rank", "Epochs", "Text NED ↓", "Table TEDS ↑", "TEDS-S ↑", "CDM F1 ↑", "RO NED ↓", "Skip % ↓"],
        rows: [
          { cells: ["v1, deployed", "8", "3", "0.288", "0.649", "0.732", "0.884", "0.211", "5.8%"], highlight: true },
          { cells: ["v2, best", "32", "3", "0.309", "0.600", "0.697", "not run", "0.215", "0.7%"] },
          { cells: ["v2, last", "32", "5", "0.306", "0.610", "0.695", "0.892", "0.214", "0.0%"] },
        ],
      },
      paragraphs: [
        "Rank 32 costs 4.9 points of Table TEDS and 2.1 points of text NED, which is an error metric, so that is a regression too. Five epochs overfits: validation loss turns up, and the table metric does not return to rank 8's level.",
        "The tempting row is v2 at five epochs, which reaches a 0% skip rate. It gets there by producing something for every page rather than by parsing better, and the parsing metrics say so. The deployed model keeps a 5.8% skip rate and the table quality, which is the trade this corpus rewards.",
      ],
      callout: {
        label: "What was frozen and why",
        text: "The vision encoder and the aligner are untouched; the adapter is on the language model's linear layers only. A pilot run had already shown the visual recognition was adequate and the text generation was the gap, so training the part that was working would have spent capacity on the wrong problem.",
      },
    },
    {
      id: "retrieval",
      eyebrow: "Downstream evaluation",
      title: "Cleaner chunks do not automatically retrieve better",
      lead:
        "MinerU produces the strongest boundary metrics but ranks fifth in retrieval. WigtnOCR preserves more answer-bearing structure and leads Hit@1, Hit@5 and MRR@10.",
      figures: [
        {
          src: "/images/projects/wigtnocr-bc-vs-retrieval.png",
          width: 2421,
          height: 1821,
          alt: "Boundary Clarity compared with retrieval Hit at 1",
          caption:
            "Boundary quality and retrieval diverge: intrinsic chunk cleanliness is not a substitute for end-to-end evaluation.",
          contain: true,
        },
        {
          src: "/images/projects/wigtnocr-retrieval.png",
          width: 4221,
          height: 1704,
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
};

const wigvo: ResearchProject = {
  slug: "wigvo",
  shortTitle: "WIGVO",
  title: "Stopping a phone-call translator from translating its own echo",
  cardTitle: "Real-time translation over an ordinary PSTN call",
  dek: "A field-tested account of what changed when a browser translator met ordinary phone audio, including the echo-control ideas that failed before the deployed design.",
  track: "AI systems",
  status: "Peer reviewed",
  format: "ACL system paper",
  date: "2026.07",
  authorId: "hyeongseob-kim",
  authors: "Hyeong-seob Kim · Sang-Woo Son · Hyun-woo Cho · Hyeonsang Kim · Jinmo Kim",
  venue: "ACL 2026 System Demonstrations · pp. 336–344",
  featured: true,
  /* Brand banner, same treatment as the other reports: no caption, no
   * `heroSectionId`, so it identifies the report on the hub card and above
   * section 01 rather than posing as a figure. Everything it asserts is already
   * in this report: the venue is in `venue`, and the provider is named in the
   * cost section. The architecture diagram it replaced moved into
   * `architecture`. */
  heroFigure: {
    src: "/images/projects/wigvo_image_v1.jpg",
    width: 1535,
    height: 1024,
    alt: "WIGVO, real-time bidirectional speech translation over PSTN calls",
    caption: "",
  },
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
      /* Both diagrams sit after the stage list, in the order the reader needs
       * them: the whole relay first, then the phone-side path it describes. The
       * architecture diagram moved here when the hub card became a banner. */
      figures: [
        {
          src: "/images/projects/wigvo_architecture.png",
          width: 1299,
          height: 540,
          alt: "WIGVO dual-session system architecture",
          caption:
            "Session A translates browser speech into PSTN audio. Session B receives the phone side through echo, energy and voice-activity gates.",
          contain: true,
        },
        {
          src: "/images/projects/wigvo_pipeline.png",
          width: 621,
          height: 974,
          alt: "WIGVO three-stage phone audio pipeline",
          caption:
            "The phone-side path combines deterministic silence injection with energy and neural voice-activity gates.",
          contain: true,
        },
      ],
    },
    {
      id: "landscape",
      eyebrow: "Constraint",
      title: "The place left over, once you own neither the handset nor the network",
      paragraphs: [
        "Bidirectional speech translation is not new, and neither is doing it on a phone. The implementations that work well get there by controlling something this project does not have. A device-level implementation cancels echo in hardware because it owns the microphone. A carrier implementation intervenes inside the network itself. Both are correct engineering, and both are closed to a team with neither asset.",
        "What is left is a server relay, which is the awkward middle. It sees the audio only after the network has already degraded it, it cannot touch the recipient's device, and it has to solve echo in software or not at all. It is also the arrangement this project needed, because the constraint that shaped everything was that the person being called installs nothing.",
      ],
      callout: {
        label: "What is deliberately not here",
        text: "An earlier draft of this section carried a feature matrix comparing named third-party systems. It came out. The marks were transcribed from an internal write-up with no citation, several were contestable, and a blank cell in a comparison table reads as a missing capability rather than as an unchecked one. Describing our own constraint does the same work without asserting anything about somebody else's product.",
      },
    },
    {
      id: "ablation",
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
      eyebrow: "What failed first",
      title: "Three echo gates failed before the one that shipped",
      lead:
        "The deployed gate is the fourth design. The three before it each failed in a way that pointed at the same underlying rule.",
      steps: [
        {
          label: "Attempt 1",
          title: "Audio fingerprinting",
          body: "Correlating outgoing synthesis against incoming line audio. It is the idea the previous section measures: it halved the loop rate and never became reliable, because μ-law is a non-linear quantizer and the correlation it needs does not survive the codec.",
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
      id: "separation",
      eyebrow: "Recognition",
      title: "Asking one model to hear and to translate produced sentences nobody said",
      paragraphs: [
        "The realtime speech API can transcribe and translate in one pass, and doing that added content the speaker had not produced. Not mishearing: fluent, plausible additions that fit the conversation and were never said.",
        "The two jobs are now separate. Recognition stays inside the realtime session, and translation runs as a discrete text call at temperature zero against the transcript, with the realtime session's own translation path switched off by configuration rather than left unused.",
        /* The diagram is not at the top any more: it moved into Architecture
         * when the hub card became a banner, so this sentence was pointing at a
         * place it no longer sits. That it is still the wrong diagram is a
         * separate problem, and the fix for it is a redrawn figure. */
        "The architecture diagram in Architecture, above, predates that change and still shows the realtime session handling translation on the voice-to-voice path. The deployed arrangement is the one described here.",
      ],
      callout: {
        label: "The pattern, not a rule",
        text: "Several stages that could be made deterministic were moved out of the model: echo control is a gate rather than a classifier, and translation is a fixed-temperature call rather than an improvisation. Recognition and the last-resort guardrail rewrite are still model calls, so this is a direction the system leans rather than a property it has.",
      },
    },
    {
      id: "hallucination",
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
      id: "cost",
      eyebrow: "Operating profile",
      title: "What the field study cost, and which mode people actually used",
      paragraphs: [
        "USD 0.28 per minute on the evaluated provider stack, over the reported call set. That figure covers one provider configuration and one pricing period, and it is the number the paper reports rather than a current quote.",
        "Cost is not incidental to this design. A relay pays for two directional sessions plus telephony minutes for the whole call, including the stretches where nobody is speaking, which is why the gates that suppress noise before recognition are a cost control as much as a quality one.",
      ],
      callout: {
        label: "What this figure is not",
        text: "It is not a unit economics claim. It is what one evaluated stack charged during one measurement window, on Korean-English calls, and any of those three can move it.",
      },
    },
    {
      id: "evaluation",
      eyebrow: "Field evaluation",
      title: "Then we took it through 155 Korean-English calls",
      lead:
        "The evaluation contains 155 calls, 148 instrumented calls and 147 completed calls across voice-to-voice, text-to-voice and full-agent modes.",
      figures: [
        {
          src: "/images/projects/wigvo_latency_histogram.png",
          width: 2962,
          height: 1234,
          alt: "WIGVO latency distribution",
          caption:
            "Caller-to-callee and callee-to-caller latency distributions. The phone-originating path is dominated by transcription.",
          contain: true,
        },
        {
          src: "/images/projects/wigvo_utterance_scatter.png",
          width: 2061,
          height: 1462,
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
          width: 1280,
          height: 1707,
          alt: "Four WIGTN team members at ACL 2026 in San Diego",
          caption:
            "The WIGTN team at ACL 2026 in San Diego, where the accepted System Demonstrations paper was presented.",
          focalPoint: "50% 66%",
        },
        {
          src: "/images/projects/wigvo-acl-2026-booth.jpeg",
          width: 1780,
          height: 1536,
          alt: "WIGVO paper discussion at the ACL 2026 booth",
          caption:
            "Discussion at the ACL 2026 booth around the WIGVO paper, architecture and recorded system workflow.",
        },
        {
          src: "/images/projects/wigvo-iwslt-2026-talk.jpeg",
          width: 1920,
          height: 1078,
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
};

const wigss: ResearchProject = {
  slug: "wigss",
  shortTitle: "WIGSS",
  title: "Editing source from the browser by address, not by class string",
  cardTitle: "Matching by class string picked the wrong element half the time",
  dek: "WIGSS joins a rendered element to its source by searching every project file for a matching className string. Over ten common React and Tailwind patterns that join produced the intended edit 5 times out of 10, and its accuracy falls as 1/N when N components share a class string: 3% at N = 32. Reading an address that the development JSX transform already carries brought both figures to 100% and cut the bytes read per save from 162,606 to 284.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Architecture evaluation",
  date: "2026.09.02",
  authorId: "jinmo-kim",
  /* Brand banner, same treatment as the other reports: no caption, no
   * `heroSectionId`, so it runs on the hub card and above section 01.
   *
   * ⚠ THE ART IS STILL WRONG AND IS STILL LEGIBLE. It shows `npm i
   * @wigtn/wigss`; the published package is `wigss`, which is what every link
   * here points at. The debt was taken knowingly on 2026-08-09 rather than
   * holding a report back, and it survives this revision for the same reason.
   * Re-export the art with `npm i wigss` and replace the file. The fix belongs
   * in the image, not in a caption apologising for it. */
  heroFigure: {
    src: "/images/projects/wigss_image_v1.jpg",
    width: 1536,
    height: 1024,
    alt: "WIGSS, WIGTN Style Sync Studio",
    caption: "",
  },
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/wigss",
      primary: true,
    },
    {
      label: "Source repository",
      href: "https://github.com/wigtn/wigss",
    },
  ],
  metrics: [
    {
      value: "5/10 → 10/10",
      label: "Intended edit produced",
      detail: "Ten React and Tailwind patterns, one edit each",
    },
    {
      value: "3% → 100%",
      label: "Join accuracy at 32 duplicates",
      detail: "A string search falls as 1/N; an address does not",
    },
    {
      value: "573×",
      label: "Fewer bytes read per save",
      detail: "162,606 → 284 on this repository, 15-run mean",
    },
    {
      value: "1",
      label: "Data-loss path found",
      detail: "Rollback restores whole files over concurrent edits",
    },
  ],
  sections: [
    {
      id: "problem",
      eyebrow: "Problem",
      title: "The last ten pixels are expensive to describe",
      paragraphs: [
        "Coding agents produce a first layout quickly. The friction arrives later, when a ten-pixel correction becomes another round of prose, CSS edits, reloads and screenshots.",
        "WIGSS uses the browser as the editing surface and turns each manipulation back into a constrained, reviewable source change. The repository stays the source of truth. Whether that translation lands on the element the user actually dragged is a separate question, and it is the one this report measures.",
      ],
      callout: {
        label: "Design decision",
        text: "The browser is where the intent is expressed. The repository is where the change must end up.",
      },
    },
    {
      id: "join",
      eyebrow: "Mechanism",
      title: "The screen and the file share one value, so that value became the key",
      lead:
        "A DOM node does not know which file produced it, and a file does not know where it was painted. Something has to link them.",
      paragraphs: [
        "The browser holds class=\"flex h-48 w-64\". The file holds className=\"flex h-48 w-64\". The class string is the only value present on both sides without adding anything to the user's build, so WIGSS made it the join key. The scan copies the whole string, the server parses each source file with Babel, and the first attribute whose value matches exactly becomes the target.",
        "The choice follows from a product constraint rather than from convenience. The original PRD required npx wigss to run with nothing installed into the project, which rules out a build-time plugin and therefore rules out a real source coordinate. Within that constraint the class string is the best available key.",
        "It is still a guess. The rest of this report is about where the guess is wrong and what it costs.",
      ],
    },
    {
      id: "patterns",
      eyebrow: "Pattern coverage",
      title: "Half of the common patterns produced the wrong edit",
      lead:
        "Ten fixtures cover the React and Tailwind shapes a real codebase contains. Each defines one drag gesture and one correct outcome. Version A calls the shipped pipeline directly rather than reimplementing it.",
      paragraphs: [
        "Five of ten produced the intended change. Three wrote an edit that was wrong, which is worse than refusing: the save reports success, the file changes, and nothing signals that the wrong element moved. Two produced no diff and surfaced no reason, so the user sees only \"could not generate a code change; try a larger edit\", which is unrelated to the actual cause.",
        "Class-string collisions across files were removed from this fixture set so that pattern handling and duplicate density are not measured together. Duplicates are measured separately in the next section.",
      ],
      table: {
        caption:
          "Ten patterns, one edit each · A = shipped v0.2.0 · B = address-based prototype",
        headers: ["Pattern", "A", "B", "What A wrote"],
        rows: [
          { cells: ["Unique static className", "Correct", "Correct", "h-48 → h-64"] },
          {
            cells: [
              "Two identical siblings in one file",
              "Wrong element",
              "Correct",
              "Edited the first card; the target was untouched",
            ],
            highlight: true,
          },
          { cells: ["Template literal with interpolation", "No diff", "Correct", "—"] },
          { cells: ["cn() call", "No diff", "Correct", "—"] },
          { cells: ["Multi-line attribute", "Correct", "Correct", "h-48 → h-64"] },
          {
            cells: [
              "Responsive h-32 md:h-48 lg:h-64",
              "Wrong breakpoint",
              "Correct",
              "h-32 → h-80, editing base while the viewport was lg",
            ],
            highlight: true,
          },
          { cells: ["Item inside .map()", "Correct", "Correct", "h-48 → h-64"] },
          {
            cells: [
              "Move a flex child by 12 px",
              "Wrong element, arbitrary value",
              "Correct",
              "mt-[12px] on the preceding sibling",
            ],
            highlight: true,
          },
          { cells: ["Single-quoted className", "Correct", "Correct", "h-48 → h-64"] },
          { cells: ["Static element beside a prop className", "Correct", "Correct", "h-48 → h-64"] },
        ],
      },
      figures: [
        {
          src: "/images/projects/wigss-join-failures.png",
          width: 2360,
          height: 1786,
          alt: "Six outcomes of searching every file for an exact class-string match, and the two token faults that remain when the search returns the right element",
          caption:
            "Only the leftmost branch reaches the intended element. Two of the remaining five write into the wrong place, and the token edit can still be wrong after a correct join.",
        },
      ],
      bullets: [
        "The responsive case is the most damaging of the three. findTwClass matches h- without regard to a breakpoint prefix, so an edit made at lg rewrites the base token. The desktop view looks correct, the post-apply check runs at the desktop width and passes, and the mobile height changes from 128 px to 320 px with nothing on screen to indicate it.",
        "The 12 px move is a second, smaller instance of the same shape. Twelve pixels is exactly mt-3 on the Tailwind scale, but when no top margin exists the rewriter appends a hard-coded mt-[12px] without consulting pxToTw, so a value that had a preset became an arbitrary one.",
        "Both faults were already described in the v2.2 PRD, which notes that the Tailwind strategy replaces utility classes by guesswork without knowing the parent layout. They were deferred, not missed.",
      ],
    },
    {
      id: "duplicates",
      eyebrow: "Duplicate density",
      title: "Accuracy falls as one over the number of duplicates",
      lead:
        "Copy-pasted markup is normal. When N components carry the same class string, each of the N was made the edit target once.",
      paragraphs: [
        "The result is exactly 1/N, because a search that stops at the first match is correct only when the target happens to be first. An address does not depend on N.",
        "Latency did not grow with N, because the rewriter stops iterating at the first match. That observation moved the cost measurement to the right place: the expense is not parsing but the collection step in the refactor endpoint, which reads the project on every save.",
      ],
      table: {
        caption: "Duplicate density against join accuracy",
        headers: ["Duplicates N", "A correct", "A", "B correct", "B"],
        rows: [
          { cells: ["1", "1/1", "100%", "1/1", "100%"] },
          { cells: ["2", "1/2", "50%", "2/2", "100%"] },
          { cells: ["4", "1/4", "25%", "4/4", "100%"] },
          { cells: ["8", "1/8", "13%", "8/8", "100%"] },
          { cells: ["16", "1/16", "6%", "16/16", "100%"] },
          { cells: ["32", "1/32", "3%", "32/32", "100%"], highlight: true },
        ],
      },
    },
    {
      id: "causes",
      eyebrow: "Root causes",
      title: "Two roots account for most of the faults",
      lead:
        "The failures are not independent. Almost all of them descend from one of two decisions, which is why a narrow change removes several at once.",
      paragraphs: [
        "The first root is the join key. Searching for a class string means duplicates resolve to whichever match comes first, dynamic class names resolve to nothing, and the project has to be read and parsed on every save. It also means the resolved position is a string rather than a coordinate, so the apply step looks the element up a second time and can disagree with the step that found it.",
        "The second root is the translation. Converting a drag into a margin without knowing whether the parent is flow, flex or grid produces an edit that is sometimes absorbed and sometimes lands on the wrong axis. That uncertainty is what makes post-apply measurement necessary in the first place, and the measurement in turn introduced the rollback path that discards concurrent edits.",
      ],
      figures: [
        {
          src: "/images/projects/wigss-causes.png",
          width: 2360,
          height: 1826,
          alt: "Two root decisions and the faults that descend from each: the searched class string above, the layout-blind translation below",
          caption:
            "Everything in the upper tree follows from resolving by search. The lower tree explains why verification exists, and why the rollback it depends on can lose work.",
        },
      ],
      callout: {
        label: "Consequence",
        text: "Replacing the join removes the upper tree. It does not remove the lower one, so verification remains necessary and its rollback still has to be made safe.",
      },
    },
    {
      id: "address",
      eyebrow: "Approach",
      title: "The development JSX transform already knows the answer",
      lead:
        "React compiles JSX to jsxDEV(type, props, key, isStatic, source, self) in development, and the fifth argument carries the file, line and column. React DevTools opens a file from it. The value is already flowing; it simply never reaches the DOM.",
      steps: [
        {
          label: "01",
          title: "Wrap the development runtime",
          body: "A thirty-line module re-exports jsxDEV and adds data-wigss=\"file:line:column\" to DOM elements. Components are left alone; the attribute lands on the tag whose class literal is being edited.",
        },
        {
          label: "02",
          title: "Ask for one line of configuration",
          body: "\"jsxImportSource\": \"wigss\" in tsconfig. No Babel plugin, so a Next project keeps its SWC pipeline and its build times. Production is unaffected because it does not use jsxDEV.",
        },
        {
          label: "03",
          title: "Read one file instead of the project",
          body: "The address names the file, so the collection step reads 1 file rather than 40, and parses 1 rather than 10.",
        },
        {
          label: "04",
          title: "Carry the character range forward",
          body: "The resolved range travels into the apply step, so nothing is looked up a second time. The next section explains why this last step is not optional.",
        },
      ],
      figures: [
        {
          src: "/images/projects/wigss-address-join.png",
          width: 2360,
          height: 1166,
          alt: "Two paths from a screen element to a source location: a class-string search across every file, and an address read from the JSX development transform",
          caption:
            "The shipped path searches; the proposed path reads. Removing the search removes the duplicate-collision class of failure along with the per-save file I/O.",
        },
      ],
      paragraphs: [
        "The same package can inject the scan runtime, which resolves a second problem. The script that answers a scan request currently lives only inside the bundled demo page, so an arbitrary project returns nothing and the editor falls back to an empty component list after four seconds.",
        "Knowing where an element is does not always mean it can be written. A cn() call is resolvable but not rewritable as a string, so the prototype edits the first string argument and escalates when there is none. The address turns a class of silent failures into a class of explicit ones.",
      ],
      callout: {
        label: "Unverified",
        text: "Whether Next passes jsxImportSource through to SWC has not been tested. The whole approach rests on it, so it is the first thing to check, and the fallbacks are a Babel plugin (which costs SWC), an SWC plugin, or proxy injection without addresses.",
      },
    },
    {
      id: "apply",
      eyebrow: "Apply path",
      title: "Resolving by address is not enough if apply looks the element up again",
      lead:
        "The first version of the prototype resolved the correct element and still failed the duplicate and move cases, exactly as the shipped pipeline did.",
      paragraphs: [
        "CodeDiff carries an original and a modified snippet and nothing else, and the apply route locates the edit with content.indexOf(original). An address resolved upstream is discarded at that line, and with two identical siblings the search returns the first one again.",
        "Passing the character range through to apply made both cases pass. The type for this already exists: TargetLocation has a range field, and the dispatcher supplies { start: 0, end: 0 } with a comment saying that later locators will produce real values.",
        "This did not appear in the design notes. It appeared when the experiment ran, which is the argument for running the experiment before writing the plan.",
      ],
    },
    {
      id: "rollback",
      eyebrow: "Rollback safety",
      title: "The rollback path restores whole files",
      lead:
        "Every save issues a rollback token so the user can undo an edit whose on-screen result drifted. The token restores the file, not the edit.",
      figures: [
        {
          src: "/images/projects/wigss-save-loop.png",
          width: 2360,
          height: 1626,
          alt: "A save passing through three fixed delays to a verification that ends in done, skipped or a warning, with no edge returning to the writer",
          caption:
            "Three fixed delays put at least 4.5 seconds between a save and its verdict, and the slowest branch is the one that gives up. Nothing returns to the writer: the automatic re-edit the first PRD specified was never built.",
        },
      ],
      paragraphs: [
        "In the simulation WIGSS changed a className, the user then edited a different line of the same file in their editor, and the fidelity check failed. Rolling back returned the file to the pre-save snapshot and removed the user's line: const total = items.filter(Boolean).length; became const total = items.length; again. A style tool reverted logic.",
        "Reversing only the range that was written keeps the user's edit. When the written text is no longer present, because the user changed that line too, the operation has to be refused rather than performed, and the reason shown.",
      ],
      table: {
        caption:
          "Save, then a concurrent edit to another line of the same file, then a failed fidelity check",
        headers: ["Outcome", "A · whole-file restore", "B · range reversal"],
        rows: [
          { cells: ["Style change reverted", "Yes", "Yes"] },
          { cells: ["User's concurrent edit kept", "Lost", "Kept"], highlight: true },
          {
            cells: [
              "User had also changed the written line",
              "Overwritten silently",
              "Refused, with a reason",
            ],
          },
        ],
      },
      bullets: [
        "The apply route also writes a .bak.<timestamp> sidecar next to every file it touches and never removes it, which leaves artefacts in a repository that already has version control.",
      ],
    },
    {
      id: "surface",
      eyebrow: "Editing surface",
      title: "The interface hides the one thing the user needs to see",
      lead:
        "The captures below come from a scan of the bundled demo page: 75 DOM elements grouped into 12 components. What follows is about how those 12 are presented, not how they were found.",
      paragraphs: [
        "Because the target page fills the viewport, every control was moved behind a hover reveal. On first run the screen offers a small tab at the top and another at the right edge, and nothing indicates that a scan has to be run before anything can be selected.",
        "Overlays carry a colour per component type across ten types, plus a depth badge from L1 to L5. At twelve components the labels already collide and the colours stop separating anything. The names come from a running index, so a hero section reads as Section 12 and a card grid as Grid 10, neither of which points at a file.",
        "Nothing on screen states which breakpoint an edit will land on. The mobile toggle narrows the viewport to 375 px and changes nothing in the edit path, so the breakpoint fault measured earlier is invisible while it happens and stays invisible afterwards.",
      ],
      figures: [
        {
          src: "/images/projects/wigss-editor-idle.jpg",
          width: 1400,
          height: 875,
          alt: "The shipped editor on first run, showing only two small tabs and no visible controls",
          caption:
            "First run. Two tabs are the entire interface until the pointer finds them.",
        },
        {
          src: "/images/projects/wigss-editor-overlay.jpg",
          width: 1400,
          height: 875,
          alt: "Overlay boxes after a scan, with labels overlapping each other and ten border colours in use",
          caption:
            "After a scan of 12 components. Section 12 sits under another label and cannot be read, Grid 10 and Section 10 overlap at the project list, and the depth badges scatter across the corners.",
        },
        {
          src: "/images/projects/wigss-editor-panel.jpg",
          width: 1400,
          height: 875,
          alt: "The agent panel sliding over the right side of the page being edited",
          caption:
            "The agent panel covers the region it is commenting on. Reading a suggestion and editing the element it refers to are mutually exclusive.",
        },
      ],
      bullets: [
        "A drag that produces no diff reports \"could not generate a code change; try a larger edit\". The actual causes are a template literal or a cn() call, and neither is affected by the size of the drag.",
      ],
      callout: {
        label: "Design decision reversed",
        text: "Hiding the chrome was correct while a single iframe filled the window. On a surface that pans and zooms it is not, because space is no longer the constraint.",
      },
    },
    {
      id: "prototype",
      eyebrow: "Canvas prototype",
      title: "A canvas makes the breakpoint fault visible while it happens",
      lead:
        "The second prototype is an editing surface rather than a pipeline. It runs the same scan protocol against the same demo page, and the cards hold live iframes.",
      paragraphs: [
        "Placing one route at three widths side by side turns the responsive fault into something a person can see. An edit made at lg shows its effect on sm and md in the same glance, which is the check that no amount of care in the pipeline can replace.",
        "The active breakpoint is stated in the top bar and never hidden. Colour is reserved for hover and selection; component identity moves to badges that carry the hygiene score and the reuse count, so a name says which file it came from and a badge says whether an edit there is likely to fail.",
        "A drag ends in a decision rather than a write. The insertion line shows the destination before the pointer is released, and the arbitration list names the candidates with the code each would produce. Absolute positioning is present as the last option and marked as breaking the responsive layout.",
      ],
      figures: [
        {
          src: "/images/projects/wigss-canvas-set.jpg",
          width: 1400,
          height: 875,
          alt: "A pannable canvas holding the same route at 375, 768 and 1280 pixels, with the active breakpoint shown in the top bar",
          caption:
            "One route at three widths. The 375 card is marked stale and waiting for its update, and the top bar states that edits will land on lg.",
        },
        {
          src: "/images/projects/wigss-canvas-arbitration.jpg",
          width: 1400,
          height: 875,
          alt: "A drag in progress with an insertion line, a ghost following the pointer, and a list of candidate interpretations with confidence",
          caption:
            "Releasing a drag opens the candidate list: reorder, margin, parent gap, then absolute position with its warning. Each candidate names the code it would write.",
        },
      ],
      table: {
        caption: "The same page in both surfaces",
        headers: ["", "Shipped editor", "Canvas prototype"],
        rows: [
          { cells: ["Controls visible on first run", "2", "12 or more"] },
          { cells: ["Active breakpoint shown", "No", "Always"], highlight: true },
          { cells: ["Viewports reviewable at once", "1", "3"], highlight: true },
          { cells: ["Label collisions at 12 components", "Present", "None; labels appear on hover and selection"] },
          { cells: ["Warning before a risky edit", "None", "Hygiene and reuse badges"] },
          { cells: ["Panel occludes the edit target", "Yes", "No; the rail displaces the canvas"] },
        ],
      },
    },
    {
      id: "tiers",
      eyebrow: "Escalation",
      title: "What happens when the deterministic path cannot write",
      lead:
        "Today an unwritable edit falls back to an inline style attribute. The v2.2 PRD recorded that as a deliberate temporary trade-off and added a cleanup pass to convert such diffs back to classes when every property maps to a preset.",
      paragraphs: [
        "If the tool is not permitted to leave code that a reviewer would reject, the fallback has to go, and with it the cleanup pass that exists to repair its output. What replaces them is an escalation: a scoped model edit, then a prompt at a range the user chooses, then an explicit refusal that leaves the file alone.",
        "A model edit is bounded by the same machinery as a deterministic one. It receives the node and its parent rather than the file, its output is spliced into a fixed range, it is re-parsed and checked for token parity, and the on-screen measurement is the last word. A plausible but wrong edit does not reach the user because the result is judged by the rendered page, not by reading the code.",
      ],
      figures: [
        {
          src: "/images/projects/wigss-edit-tiers.png",
          width: 2360,
          height: 1346,
          alt: "Escalation from a deterministic AST edit to a scoped model edit to a user prompt, with every tier passing the same linter, apply guards and on-screen check before a failed check rolls back and returns the next candidate",
          caption:
            "Every tier writes through the same linter, the same guards and the same check. The retry edge on the right is the loop the current build does not have: verification stops at a warning and waits for a person.",
        },
      ],
      callout: {
        label: "Claim under test",
        text: "A model may write the code as long as the result is graded on screen and reverted when it drifts. The number that would support this is the share of model edits the on-screen check rejects, and it does not exist yet.",
      },
    },
    {
      id: "evidence",
      eyebrow: "Evidence status",
      title: "This reproduces defects; it does not benchmark the tool",
      paragraphs: [
        "The harness runs ten fixtures, a duplicate-density sweep and a rollback simulation, and calls the shipped pipeline for the A side rather than a description of it. The 340 existing unit tests pass and tsc --noEmit is clean at the measured commit.",
        "Ten fixtures chosen for the shapes they exercise are not a sample of any codebase, and the B side implements three axes rather than a product. The figures below are what the measurements support and what they do not.",
      ],
      bullets: [
        "Supported: an address-based join produced the intended edit on all ten patterns and is unaffected by duplicate density; the shipped build rewrites the wrong breakpoint, emits an arbitrary value where a preset exists, and discards concurrent edits on rollback; per-save reads fall from 162,606 bytes to 284.",
        "Not supported: coverage of the deterministic path on real projects, the share of edits a model tier would rescue, and whether the address survives Next's SWC pipeline.",
        "Required before this becomes a measured system: a fixed set of open-source Next and Tailwind repositories with a scripted edit suite, and telemetry for tier outcome, latency and convention violations recorded from the first release rather than added later.",
      ],
      callout: {
        label: "Publication rule",
        text: "Until the fixed repository set, the scripted edit suite and the recorded outcomes ship together, WIGSS stays an engineering note rather than a benchmark report.",
      },
    },
  ],
  limitations: [
    "Ten fixtures were written to exercise particular code shapes. They show that each failure occurs and how, not how often any of them occurs in a given repository.",
    "The comparison holds the px-to-Tailwind scale table and the apply-time safety guards constant across both sides, so it measures the join, the breakpoint handling and the output policy, and nothing else.",
    "The 5/10 figure is specific to this fixture set. Removing the cross-file class collisions raised it from 2/10, which shows how strongly the number depends on how much duplication the sample contains.",
    "The address approach is unverified end to end. jsxImportSource has not been tested against Next's SWC pipeline, and behaviour under React Server Components, where a change re-renders a route rather than a component, has not been measured at all.",
    "The prototype implements resolution, breakpoint-aware token editing and range-based application. It does not implement structure edits, the model tiers, or the editing surface, so no claim here covers them.",
    "Latency was measured in-process on one machine. It excludes the fixed delays the current save flow adds after writing, which dominate the wall-clock time a user experiences.",
    "The rollback result comes from a simulation of the documented restore behaviour rather than from a running session, though the restore path it models is a single call that rewrites the file with its pre-save contents.",
  ],
};

const wigtnCoding: ResearchProject = {
  slug: "wigtn-coding",
  shortTitle: "WIGTN Plugin",
  title: "Running a harness on frontier models, part 1: Claude Code",
  dek: "Seven months of a Claude Code plugin, measured at each commit. The instruction surface peaked at 49,275 lines and is 19,912 today, but it did not fall in a straight line: it grows back between frontier releases and gets cut at each one. What never got cut was the enforcement a model cannot skip.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Workflow architecture",
  /* The date the plugin repository opened, taken from its first commit
   * (0593d8d, 2026-01-12 16:35 KST; the GitHub repo was created a minute
   * earlier). It is the origin of the work this report traces, and it is what
   * puts part 1 at the head of the index and part 2 at the end.
   *
   * Note what it is not: this report was written later and its content runs
   * past this date — the reductions table ends at the 2026.08.04 Opus 5 pass
   * and the metric reads "19,912 today". So the byline date sits before events
   * the report describes. Recorded here deliberately, decided by the author. */
  date: "2026.01.12",
  authorId: "hyunwoo-cho",
  /* Anthropic's Claude Code brand image, identifying the tool this plugin runs
   * on. Same treatment as part 2: no caption, no `heroSectionId`, so it runs on
   * the hub card and above section 01 instead of appearing in the body as if it
   * were a figure. The workflow diagram it replaced moved into the `workflow`
   * section. */
  heroFigure: {
    src: "/images/projects/claudecode_image_v1.jpg",
    width: 1920,
    height: 1080,
    alt: "Claude Code",
    caption: "",
  },
  links: [
    {
      label: "Source repository",
      href: "https://github.com/wigtn/wigtn-plugins",
      primary: true,
    },
  ],
  metrics: [
    {
      value: "49,275 → 19,912",
      label: "Instruction surface, peak to today",
      detail: "Counted at each commit, not a diff total",
    },
    {
      value: "29 → 7",
      label: "Skills kept after the March cut",
      detail: "The rest documented what the model already knew",
    },
    {
      value: "+24%",
      label: "Regrowth, March to June",
      detail: "The cuts are not monotonic and we do not claim they are",
    },
    {
      value: "4/4 = 4/4",
      label: "Task outcomes with and without",
      detail: "Measured on GPT-5.6 Sol. See part 2.",
    },
  ],
  sections: [
    {
      id: "problem",
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
      eyebrow: "Workflow",
      title: "Turn every handoff into an artifact",
      figures: [
        {
          src: "/images/projects/wigtn-coding-workflow.svg",
          width: 1600,
          height: 1000,
          alt: "WIGTN Plugin six-stage delivery workflow",
          caption:
            "The released workflow moves from PRD definition through independent review, bounded implementation and an explicit release decision.",
          contain: true,
        },
      ],
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
      id: "origin",
      eyebrow: "Origin",
      title: "We shipped a marketplace of stack plugins and then took it apart",
      paragraphs: [
        "The repository opened on 12 January 2026 and took 72 commits in its first month. The shape was wrong. Work was divided by technology, with separate plugins for frontend, backend, mobile and AI development, each carrying its own skills for the frameworks in that stack.",
        "On 14 February those five became one. The division had been by technology, but the work does not divide that way. A React change and a FastAPI change need the same sequence of definition, independent review, bounded implementation and a release decision. They do not need different plugins. The merge removed 6,321 lines and added 3,011.",
        "Three weeks later, two commits on consecutive days removed a further 30,670. The first cut 54 components to 32 and its message names the reason: twenty-two of the removed skills documented React, Tailwind and Jest, which the model already knew. Skills went from 29 to 7 in that pass and to 3 in the one that followed; they stand at 7 again today, after five months of regrowth. What survives at any count is project-specific information only.",
      ],
      figures: [
        {
          src: "/images/projects/wigtn-coding-composition.svg",
          width: 1600,
          height: 900,
          alt: "Agent, command and skill counts in February 2026, March 2026 and today",
          caption:
            "Directory listings at each commit. The agent row barely moves across all three snapshots while the skill row collapses from 29 to 3 and stands at 7 again today, which is the shape of the decision: roles were kept, documentation was not. The middle column is the second March pass, three days after the cut described above.",
          contain: true,
        },
      ],
      callout: {
        label: "What the first cut taught",
        text: "Most of what we had written was documentation the model did not need. The harness was competing with the model's own knowledge instead of adding to it.",
      },
    },
    {
      id: "reductions",
      eyebrow: "Model upgrades",
      title: "Every upgrade is a cut, and every quiet month undoes part of it",
      paragraphs: [
        "Checking out each milestone commit and counting the instruction text gives a shape we did not expect to have to admit. The surface does fall, from 49,275 lines to 19,912, but not in a straight line. It comes down hard at a model release and climbs back through the months in between, because that is when features get added. The March cut took 58% out in three days; the twelve weeks that followed put 24% back.",
        "The cuts themselves are specific. In June, adapting to Opus 4.8 meant removing what the commit calls expressive over-harness, with no change to behaviour or logic: eight forced xhigh effort settings, and the fabricated numbers we had written into our own prompts, including hardcoded durations, speedup claims and example scores. In August, the Opus 5 pass kept the contracts and cut the rest.",
        "Part 2 of this series put a number on the cost of leaving that growth alone. On two SWE-bench Verified tasks, GPT-5.6 Sol resolved 4 of 4 runs with the legacy harness and 4 of 4 without it, while the harness raised median wall time by 151.7% and output tokens by 141.2%. We published that against our own product, and it is what set the rule below.",
      ],
      figures: [
        {
          src: "/images/projects/wigtn-coding-instruction-surface.svg",
          width: 1600,
          height: 900,
          alt: "Instruction surface in lines from February to August 2026, falling in steps with regrowth between them",
          caption:
            "Every .md file under agents, commands and skills, counted with wc -l at each milestone commit. The series is not smoothed. The regrowth between March and June is design styles, screen-spec, the diagram skill and the presentation generator being added.",
          contain: true,
        },
      ],
      table: {
        caption: "Instruction surface immediately before and after each cut",
        headers: ["Date", "Trigger", "Before", "After", "Change"],
        rows: [
          { cells: ["2026.03.07", "v3 streamline", "49,275", "27,918", "−43%"], highlight: true },
          { cells: ["2026.03.09", "v3 streamline, second pass", "27,918", "20,361", "−27%"] },
          { cells: ["2026.06.26", "Opus 4.8", "25,308", "23,795", "−6%"] },
          { cells: ["2026.07.09", "Prompt slim", "24,360", "22,584", "−7%"] },
          { cells: ["2026.08.04", "Opus 5", "22,748", "19,754", "−13%"] },
        ],
      },
      callout: {
        label: "The rule we work from",
        text: "Instructions are advice, and a better model needs less advice. Contracts are not advice: they state what this team requires, which no model can infer from the code in front of it. Every cut has taken advice and left contracts.",
      },
    },
    {
      id: "enforcement",
      eyebrow: "Enforcement",
      title: "The prompts shrank; the enforcement grew",
      paragraphs: [
        "Deleting instructions is only safe if the things that must not be skipped stop being instructions. A prompt is advice a model can quietly drop when the context fills. A hook is not. Between July and August the plugin moved each rule that mattered out of the prompt and into something mechanical.",
        "One of those replacements fixed nondeterminism in our own tooling. The gate used to sum findings into a score out of 100, and the same diff could score 78 on one run and 85 on the next, which decided whether the commit was blocked. The score is gone. A rollup counts critical and major findings instead, so the same findings now always produce the same decision.",
      ],
      figures: [
        {
          src: "/images/projects/wigtn-coding-commit-gate.svg",
          width: 1600,
          height: 900,
          alt: "Two independent gates between a commit and the repository",
          caption:
            "Traced from hooks/gate.sh. The gates are independent: the objective checks run on every commit and never read the message, while the review record is demanded only from commits that claim to have passed a review. The emergency path removes the claim, not the checks.",
          contain: true,
        },
      ],
      table: {
        caption: "What replaced prompt instructions",
        headers: ["Was written as an instruction", "Is now"],
        rows: [
          { cells: ["Run the quality gate before committing", "A pre-commit hook that blocks the commit when no gate record exists"] },
          { cells: ["Report the review honestly", "A checks script the hook runs itself, so the exit code is not written by the model"], highlight: true },
          { cells: ["Do not reuse an old review", "A 30-minute freshness window on the gate record"] },
          { cells: ["Weigh security findings heavily", "Security-critical blocks the commit regardless of any other finding"] },
          { cells: ["Keep the checks enabled", "Deleting the script regenerates it; opting out requires writing down a reason"] },
        ],
      },
      callout: {
        label: "The division of labour",
        text: "The harness does not make the model better at writing code, and we have measured that it does not. It makes the result repeatable, and it refuses to record a check that never ran.",
      },
    },
    {
      id: "benchmark",
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
    "The surface figures count lines of Markdown under agents, commands and skills. They measure how much instruction text ships, not how much of it the model reads on a given turn, and a smaller file is not evidence that what remains is correct.",
    "The reductions are decisions this team made about its own tool, not a controlled comparison of harness sizes. The one controlled result we have is in part 2, and it covers two tasks on one model.",
    "Operational timing observations are not a controlled single-agent comparison.",
    "The current benchmark matrix is incomplete and must not be summarized as a result.",
  ],
};

/* Published 2026.08.26 on acceptance to the EMNLP 2026 Industry Track. The
 * report sat in drafts/ (gitignored) through the anonymity period, because the
 * banner alone named the venue, the organisation and the title; the same
 * article was pulled from wigtn.com on 2026-08-08 for that reason.
 *
 * Every figure is quoted at the precision the WigtnOCR-RADP camera-ready
 * manuscript and audited README use — do not round them. The source record
 * went through a version audit between
 * the staged draft (2026-08-09) and publication, and the audit moved numbers:
 * the correlation is r = −0.74 (not −0.81), the headline Hit@1 gap is 42.6
 * points against the audited MinerU-on run (not 35.2 against the submitted-
 * output diagnostic), and the aligned Distill audit reports +1.36 Hit@5 points
 * as a matched fidelity control whose direct comparisons with R2 and R3 both
 * cross zero. Re-quote from the README, not from an earlier version of this
 * report. */
const rcps: ResearchProject = {
  slug: "rcps",
  shortTitle: "RCPS",
  title: "Choosing document parsers by retrieval, not by appearance",
  cardTitle: "The cleanest-looking parser retrieves worst",
  dek: "Retrieval-Conditional Parsing Score ranks parser–chunker pipelines on a fixed retrieval probe instead of judging parser output in isolation. Across five complete 294-page outputs, RCPS spans 0.137–0.584; coverage then locates whether lost evidence belongs to the parser or the chunker, and training is reserved for what selection cannot fix.",
  track: "Models & evaluation",
  /* Set together, from the acceptance notification, not from the poster. */
  status: "Peer reviewed",
  venue: "EMNLP 2026 Industry Track",
  format: "Evaluation protocol",
  date: "2026.08.26",
  authorId: "sangwoo-son",
  /* Formal credit line follows the frozen OpenReview and camera-ready order.
   * Hyeong-seob Kim is corresponding author without changing that order. */
  authors: "Sang-Woo Son · Hyeong-seob Kim · Hyeonsang Kim · Hyun-woo Cho · Jinmo Kim",
  /* Brand banner: no caption and no `heroSectionId`, so it identifies the
   * report on the hub card and above section 01 and never poses as a figure.
   * Not `contain`: this art has thin crop margins — the venue badge starts
   * ~55px from the top and the wordmark ends ~100px from the bottom — and the
   * 16:10 cover every surface now uses trims 32px from each, badge and
   * wordmark intact even under the hover scale. It was `contain` while the
   * carousel still cropped to 16:9, which took 80px and beheaded both; the fix
   * was the tile, not this flag, because contained it sat in a pillarbox. */
  heroFigure: {
    src: "/images/projects/rcps_image_v1.png",
    width: 1536,
    height: 1024,
    alt: "RCPS, Retrieval-Conditional Parsing Score",
    caption: "",
  },
  links: [
    {
      label: "Research repository and RCPS implementation",
      href: "https://github.com/wigtn/WigtnOCR-RADP",
      primary: true,
    },
    {
      label: "Final camera-ready paper",
      href: "https://github.com/wigtn/WigtnOCR-RADP/blob/main/output/pdf/EMNLP2026_Industry_384_camera_ready_final.pdf",
    },
    {
      label: "KoGovDoc-Bench source dataset",
      href: "https://huggingface.co/datasets/Wigtn/KoGovDoc-Bench",
    },
    {
      label: "WigtnOCR v1 production parser",
      href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR",
    },
    {
      label: "Nine released RADP adapters",
      href: "https://github.com/wigtn/RCPS-RADP-Adapters/releases/tag/v1.0.0",
    },
  ],
  metrics: [
    {
      value: "0.137–0.584",
      label: "RCPS across complete parsers",
      detail: "Five outputs, one 294-page evaluation frame",
    },
    {
      value: "+42.6pp",
      label: "Prod over MinerU-on at Hit@1",
      detail: "0.123 → 0.549; 4.47× relative",
    },
    {
      value: "20.2 / ≤2.3%",
      label: "Absent / split reference spans",
      detail: "Prod fixed, eight chunkers, no retriever",
    },
    {
      value: "66.1 / 20.2%",
      label: "MinerU-on / Prod absent spans",
      detail: "Normalised exact match before chunking",
    },
  ],
  sections: [
    {
      id: "problem",
      eyebrow: "Problem",
      title: "The cleanest parser was the worst retriever",
      paragraphs: [
        "A document RAG system does not retrieve from the PDF. It retrieves from a parser's transcription after a chunker has divided that transcription into an index. Intrinsic parsing scores inspect the output in isolation; they do not tell us whether answer-bearing evidence survived in a form the retriever can find.",
        "On the audited deployment grid, table-enabled MinerU-on has the highest measured Boundary Clarity among the complete outputs, 0.713, while our production 2B parser scores 0.610. Retrieval reverses that result: MinerU-on reaches 0.123 Hit@1 and 0.137 RCPS, while Prod reaches 0.549 and 0.583. The parser that looks best by the intrinsic boundary metric retrieves worst in this pool.",
        "Among the four complete 294-page outputs with defined Boundary Clarity, its correlation with RCPS is r = −0.74. Adding Marker's partial 38-page output gives r = −0.83 at n = 5. These are descriptive results over a small candidate pool, not a general law. A source-aligned OHR-Bench perturbation adds a controlled check: semantic corruption lowers retrieval in every parser family while Boundary Clarity stays stable, changes non-monotonically, or even rises.",
      ],
      callout: {
        label: "Deployment consequence",
        text: "Choosing Prod instead of MinerU-on moves Hit@1 from 0.123 to 0.549: +42.6 percentage points and 4.47× relative, before changing a retriever or training a model.",
      },
    },
    {
      id: "architecture",
      eyebrow: "System architecture",
      title: "Select the pipeline, locate the loss, then decide whether to act",
      lead:
        "RCPS is a deployment workflow around an existing text-RAG stack, not another parser or similarity model.",
      paragraphs: [
        "The fixed frame contains 294 pages — 229 Korean government pages and 65 arXiv pages — and 663 held-out question–answer pairs. Every parser produces one page-level Markdown corpus. Every chunker turns each parser output into a candidate index. The same queries, retrievers, retrieval depths and relevance rule score every parser–chunker pair, producing an RCPS matrix rather than one number tied to one production stack.",
        "The highest-ranked pair becomes the provisional deployment choice. Coverage then checks the selected parser output and chunks without running a retriever. A covered span clears the parser and chunker, so a continuing retrieval miss points downstream to the index or retriever. Split spans call for rechunking or overlap. Absent spans call for parser-output inspection first, with switching or training reserved for evidence that is genuinely missing. Any changed parser or chunker returns to the same RCPS evaluation before deployment.",
      ],
      figures: [
        {
          src: "/images/projects/rcps-overview.png",
          width: 3180,
          height: 1772,
          alt: "RCPS workflow from a fixed evaluation frame through candidate parser and chunker pipelines, retrieval scoring, coverage diagnosis and deployment",
          caption:
            "The complete RCPS workflow. A fixed held-out probe scores every parser–chunker pair, coverage separates parser-side absence from chunk-boundary splitting, and only changed configurations are re-evaluated before deployment.",
        },
      ],
    },
    {
      id: "rcps",
      eyebrow: "Protocol",
      title: "One retrieval score for every parser–chunker pair",
      lead:
        "RCPS is standard mean reciprocal rank placed inside a controlled comparison. The score is simple; keeping the probe and decision rule fixed is the contribution.",
      steps: [
        {
          label: "Extrinsic",
          title: "Score on a probe, not on the text",
          body: "Held-out question–answer pairs judge whether the downstream retriever can find the evidence, rather than whether the Markdown resembles a reference transcription.",
        },
        {
          label: "Averaged",
          title: "Declare retrievers and depths",
          body: "We average BGE-M3, multilingual-e5-large and Qwen3-Embedding-8B at k ∈ {1, 5, 10}. If deployment already fixes one retriever, the protocol uses that singleton instead.",
        },
        {
          label: "Comparable",
          title: "Apply one relevance rule",
          body: "A hit must come from the reference page and contain the reference answer after shared Unicode, whitespace and Markdown normalisation. Every candidate is judged by the same rule.",
        },
      ],
      paragraphs: [
        "Formally, RCPS(P,C) is the mean of MRR@k(r, C(P), D) over every declared retriever r and depth k. For each query, MRR@k is the reciprocal rank of the first relevant chunk within the top k, or zero if none is retrieved: rank 1 scores 1.0 and rank 5 scores 0.2. C(P) is the corpus produced by parser P and chunker C; D is the fixed probe. RCPS averages these query-level values across retrievers and depths, so higher is better. Fixing C ranks parsers, while fixing P ranks chunkers. The result is relative to the candidate pool and probe, not an intrinsic score that travels unchanged to another corpus.",
        "Execution parses each page once per parser, then chunks, indexes and searches each candidate corpus. With m parsers, c chunkers and |R| retrievers, the evaluation requires m parsing runs and mc|R| retrieval evaluations. It needs no training and no manually labelled chunks because the answer span and source page define relevance.",
      ],
      figures: [
        {
          src: "/images/projects/rcps-protocol.png",
          width: 637,
          height: 561,
          alt: "RCPS protocol from evaluation pages and a parser-chunker candidate to indexing, retrieval, relevance checking and mean MRR scoring",
          caption:
            "RCPS evaluates every candidate on the same probe. It averages MRR over the declared retrievers and depths, with a hit requiring both the reference page and the normalised answer span.",
        },
      ],
    },
    {
      id: "coverage",
      eyebrow: "Diagnosis",
      title: "Coverage identifies the layer that lost the answer",
      lead:
        "A retrieval score selects the better pipeline but cannot say whether a miss came from parsing or chunking. Coverage performs that localization before a retriever runs.",
      steps: [
        {
          label: "Absent",
          title: "Inspect the parser output first",
          body: "The normalised answer span has no exact match in the source-page transcription. Rechunking cannot reconstruct it, but case review must separate a surface-form mismatch from genuine evidence loss before switching or training the parser.",
        },
        {
          label: "Covered",
          title: "Move the diagnosis downstream",
          body: "The reference span appears whole inside at least one chunk, so it survived both parser and chunker under the operational matcher. If retrieval still fails, inspect the index or retriever.",
        },
        {
          label: "Split",
          title: "Change chunking or overlap",
          body: "The span exists in the page transcription but crosses chunk boundaries. This is the class a chunker change can repair directly.",
        },
      ],
      paragraphs: [
        "For Prod, 134 of 663 reference spans, 20.2%, have no normalised exact match before chunking. Across eight chunkers, no configuration splits more than 15 spans, or 2.3%. The absent rate stays fixed because it is measured on parser output before chunks exist. In one audited example, MinerU-on transcribes A = 180 m² as A = 180m; no chunker can restore the missing exponent as an exact span.",
        "MinerU-on's exact-match absent rate is 66.1%, 45.9 points above Prod. Matcher choice changes the absolute rate but not that audited gap: under the character-tolerant L4 criterion, MinerU-on remains 62.1% absent versus 16.9% for Prod, a 45.2-point difference. In a separate full-set check limited to the retained MinerU-off output, a GPT-5.4 case judge classifies 56% of Prod's exact-match-absent cases as recoverable surface artifacts, yet the MinerU-off–Prod retrieval-unusable gap remains 50.4 points.",
        "Two authors also labelled 100 parser-masked absent cases, agreeing on 81 before adjudication (κ = 0.615). The final labels mark 42 of 50 sampled MinerU-on cases, 12 of 30 Prod cases and 19 of 20 PaddleOCR cases as retrieval-unusable. The stratified sample verifies the direction of the gap, not population rates.",
        "The failure review also makes the diagnosis actionable. For table-evidence answers, exact-match absence is 87.9% with MinerU-off, 41.7% with MinerU-on and 13.9% with Prod. Recurring causes include dropped table cells, text left inside captions, stamps, seals or figure labels, and numerals or units corrupted beyond the tolerant matchers.",
      ],
      figures: [
        {
          src: "/images/projects/rcps-coverage.png",
          width: 919,
          height: 493,
          alt: "Reference-span split rate across eight chunkers, ranging from zero to 2.3 percent",
          caption:
            "With Prod fixed, chunk-boundary splitting ranges from 0 to 2.3% across eight chunkers. The 20.2% pre-chunking absent rate is constant and is therefore not plotted as a chunker-dependent result.",
        },
      ],
      callout: {
        label: "Operational label",
        text: "Absent means no match under the declared normalisation. It does not by itself prove that the meaning vanished; tolerant matching, model review or human inspection is required before assigning a semantic cause.",
      },
    },
    {
      id: "frames",
      eyebrow: "Evaluation design",
      title: "The main comparison keeps one 294-page frame fixed",
      lead:
        "RCPS and coverage share the same corpus and held-out probe so that a parser or chunker changes without the question set changing underneath it.",
      bullets: [
        "Corpus: 294 pages, split into 229 Korean government pages and 65 arXiv pages.",
        "Probe: 663 verbatim-answerable Q–A, split into 527 government and 136 arXiv questions.",
        "Evidence frame: answers occur on 242 pages; the other 52 pages remain in every selection index as Q–A-free distractors. Coverage still inspects all 294 parser outputs.",
        "External check: 1,043 source-aligned Law–Manual Q–A from OHR-Bench test semantic perturbations. Its variants share source outputs and are not independent parsers.",
        "Training frames: the pooled KoGovDoc-RAG analysis retrieves the same 663 Q–A against only the 242 evidence-bearing pages; the pre-specified pilot uses 202 Q–A on 73 pages; the OHR compatibility analysis uses 2,036 Q–A across six domains. None of these denominators is interchangeable with the 294-page selection frame.",
      ],
      paragraphs: [
        "Qwen3-VL-30B produced the pseudo-reference Markdown, which was manually de-noised. GPT-5.4 generated the question–answer probe. A separate LLM-assisted check accepted 94 of 100 sampled pairs for question clarity, answer correctness and support in the reference context. The complete pseudo-reference and probe were not human-verified.",
        "MinerU-off is the originally submitted output with table recognition disabled. MinerU-on is a later audited, table-enabled 294-page run used for the deployment comparison. Software and retrieval environments also changed, so their difference is not a controlled table-recognition ablation.",
      ],
    },
    {
      id: "parser-selection",
      eyebrow: "Parser selection",
      title: "The 30B teacher and 2B production parser form the top tier",
      lead:
        "The full grid compares five complete 294-page parser outputs under the same parser-native chunking and RCPS protocol. Marker remains a separately labelled 38-page partial run.",
      paragraphs: [
        "The 30B teacher ranks first at 0.584 RCPS, only 0.001 above Prod at 0.583. Prod has slightly higher Hit@1, 0.549 versus 0.545. In 1,000 fixed-seed probe subsets, the teacher stays above Prod in only 62.5% of draws, so latency and compute may decide between them more honestly than the point estimate.",
        "MinerU-on is the opposite case: its Boundary Clarity is the highest measured, but its RCPS and Hit@1 are the lowest among complete outputs. PaddleOCR is near MinerU-on on retrieval but has no adjacent parser-native boundaries, so Boundary Clarity is undefined for that configuration rather than missing by accident.",
        "The mixed-corpus score also hides domain sensitivity. MinerU-on reaches 0.046 RCPS on the 527 government-document questions but 0.486 on the 136 arXiv questions. RCPS should therefore be rerun on the intended deployment probe rather than treated as a portable parser leaderboard.",
      ],
      table: {
        caption:
          "Audited parser comparison · 294 pages and 663 Q–A · BC = Boundary Clarity (higher is better); CS = Chunk Stickiness (lower is better)",
        headers: ["Parser", "BC ↑", "CS ↓", "RCPS ↑", "Hit@1 ↑"],
        rows: [
          {
            cells: ["Qwen3-VL-30B teacher", "0.623", "3.38", "0.584", "0.545"],
            highlight: true,
          },
          {
            cells: ["Prod, ours (2B)", "0.610", "3.07", "0.583", "0.549"],
            highlight: true,
          },
          { cells: ["Qwen3-VL-2B base", "0.520", "3.74", "0.532", "0.500"] },
          { cells: ["PaddleOCR", "Undefined", "3.46", "0.140", "0.125"] },
          { cells: ["MinerU-on", "0.713", "Not recomputed", "0.137", "0.123"] },
          { cells: ["Marker (38 pages)", "0.717", "3.41", "0.073", "0.068"] },
        ],
      },
      callout: {
        label: "Tie policy",
        text: "RCPS ranks candidates; it does not pretend a 0.001 point gap is operationally decisive. When the probe cannot separate two systems, latency, compute, licensing and failure review should break the tie.",
      },
    },
    {
      id: "chunker-selection",
      eyebrow: "Chunker selection",
      title: "Changing the parser moves more than changing the chunker in this pool",
      paragraphs: [
        "The candidates expose four different boundary policies. md-h3 splits at Markdown headings through level 3; parser-native follows blank-line paragraph boundaries; fixed-500 uses 500-character windows; and LumberChunker asks a local instruction model to find topic shifts between line-level segments.",
        "With Prod fixed, md-h3 ranks first at 0.593 RCPS, followed by parser-native at 0.583, LumberChunker at 0.557 and fixed-500 at 0.535. The 0.058 chunker range is much smaller than the 0.447 range across the heterogeneous parser pool, and close to the 0.052 range among its three vision–language parsers.",
        "The decision is not tied to one lucky probe draw. Across 1,000 subsets of 500 from the 663 Q–A, the four-chunker order is unchanged in 96.1% of draws, and md-h3 remains above parser-native in 96.5%. The six-configuration parser ranking has mean Kendall τa = 0.902; all changes are confined to the near-tied teacher–Prod and PaddleOCR–MinerU-on pairs. Prod stays above Base, MinerU-off, PaddleOCR and MinerU-on in every draw.",
      ],
      table: {
        caption: "Chunker comparison with Prod fixed · 294 pages and 663 Q–A",
        headers: ["Chunker", "RCPS ↑", "Rank"],
        rows: [
          { cells: ["md-h3", "0.593", "01"], highlight: true },
          { cells: ["Parser-native", "0.583", "02"] },
          { cells: ["LumberChunker", "0.557", "03"] },
          { cells: ["Fixed-500", "0.535", "04"] },
        ],
      },
      bullets: [
        "A stored MinerU-off submission grid gives the same complete parser and chunker orders when the three-retriever average uses MRR@10 alone instead of averaging k ∈ {1, 5, 10}: Kendall τa = 1.0.",
        "Replacing format-normalised relevance with raw substring matching lowers every RCPS by 0.024–0.041 without changing either full ranking.",
        "A pre-audit BGE-M3-only ablation changes only the near-tied 30B–Prod order. It does not test the later MinerU-on–PaddleOCR order.",
      ],
    },
    {
      id: "end-to-end",
      eyebrow: "Answer generation",
      title: "The top RCPS choice also wins the end-to-end check",
      paragraphs: [
        "BGE-M3 retrieves five chunks for each of the 663 questions, then GPT-5.4 generates an answer and judges it against the reference. Prod reaches 72.5% answer accuracy, compared with 23.8% for MinerU-on and 20.5% for PaddleOCR. The RCPS top choice therefore remains the top choice when a reader is added.",
        "The lower pair reverses relative to RCPS, so this experiment does not validate the full ranking. It also uses one retriever instead of the three-retriever RCPS average, and the same GPT-5.4 checkpoint generates and judges the answers. We treat it only as an end-to-end check of the winner.",
      ],
      table: {
        caption: "Three-parser answer-generation check · BGE-M3 top five · 663 Q–A",
        headers: ["Parser", "Answer accuracy", "Exact match", "Answered", "RCPS"],
        rows: [
          { cells: ["Prod", "72.5%", "49.8%", "87.9%", "0.583"], highlight: true },
          { cells: ["MinerU-on", "23.8%", "14.5%", "39.1%", "0.137"] },
          { cells: ["PaddleOCR", "20.5%", "11.5%", "45.9%", "0.140"] },
        ],
      },
    },
    {
      id: "training",
      eyebrow: "Secondary experiment",
      title: "Training stays behind the selection and diagnosis gate",
      lead:
        "RADP asks a narrower follow-up: if RCPS has selected the pipeline and coverage still identifies genuine parser-side loss, does retrieval-oriented parser training help? It is not the main contribution or the first deployment action.",
      paragraphs: [
        "The pre-specified pilot misses its success gate: at least a five-percentage-point RCPS gain with the 95% confidence-interval lower bound above zero. On the audited 2,036-Q–A OHR compatibility subset, two DPO checkpoints improve Hit@5 by 0.95 and 1.15 points, while a matched edit-distance control improves it by 1.36 points. Direct control-versus-DPO intervals include zero, and SimPO's point estimates are negative. The study therefore does not isolate a retrieval-reward training benefit.",
        "In the pooled 242-page KoGovDoc-RAG analysis, the three DPO checkpoints have Hit@5 point estimates 1.96–2.11 points above Prod, but every two-sided confidence interval crosses zero. The reporting configuration was selected after multiple settings were examined, so these estimates remain exploratory rather than confirmatory.",
        "The same 294-page selection frame provides a cleaner scale comparison: fine-tuning raises Prod Hit@1 by 4.9 points over Base, while choosing Prod over MinerU-on changes Hit@1 by 42.6 points. This is descriptive scale, not a causal upper bound on training, but it reinforces selection before optimisation.",
        "The practical result is a stop rule, not a new training recipe: prefer the large, immediate gains from candidate selection; use coverage to decide which layer to change; train only when required evidence is genuinely absent and switching parsers is not enough.",
      ],
      callout: {
        label: "Scope",
        text: "RCPS selection and coverage diagnosis define the workflow. RADP is optional evidence about the last branch of that workflow, and its current gains remain small or uncertain.",
      },
    },
    {
      id: "release",
      eyebrow: "Artifacts",
      title: "What can be audited, and what a clean checkout still cannot reproduce",
      lead:
        "The release separates claims supported by tracked artifacts from the parts of the experiment that still depend on external or author-held material.",
      bullets: [
        "Tracked in the research repository: the frozen 663-Q–A probe, portable 294-page source map, RCPS and coverage implementations, both MinerU configurations' 294-page outputs, aligned per-Q–A arrays, stability results and deterministic compatibility audits.",
        "Released separately: all nine evaluated LoRA adapters with portable configurations, source and release hashes, and available structured trainer states. The release was checked from a clean checkout with CPU-only artifact gates.",
        "Not public in full: original source documents, every third-party parser output, embedding caches, raw preference-pair text and complete original training logs. A complete fresh-clone end-to-end rerun therefore remains unavailable.",
        "The adjudicated human-study inputs remain in an author-only audit package; the public repository reports aggregate results. The mixed-version OHR seven-domain artifact is excluded rather than repaired into a full v2 claim.",
      ],
      callout: {
        label: "Practical sequence",
        text: "Evaluate candidates with RCPS. Diagnose misses with coverage. Switch the parser or chunker when the fault is clear. Train only for unresolved parser-side loss, then put the changed pipeline back through the same evaluation gate.",
      },
    },
  ],
  limitations: [
    "The complete parser comparison contains five 294-page outputs, and its Boundary Clarity correlation uses only the four outputs where that metric is defined. Adding one 38-page partial run does not make the result a general law.",
    "KoGovDoc-RAG uses manually de-noised Qwen3-VL-30B pseudo-references and GPT-5.4-generated question–answer pairs. A 100-pair check accepted 94, but neither complete set was human-verified and shared model lineage may bias the fixed probe.",
    "RCPS evaluates verbatim answer-span retrieval for a particular corpus, probe, candidate pool, retriever set and relevance rule. It does not predict performance on an unscored corpus or measure implicit and paraphrased answers.",
    "The 20.2% absent rate is matcher-defined rather than a semantic-loss rate. GPT-5.4 reclassifies 56% of Prod's exact-match-absent cases as surface artifacts. Tolerant matchers preserve the broader gap, while the stratified parser-masked human sample confirms only its direction and does not estimate population rates.",
    "The end-to-end check covers only three parsers and uses the same GPT-5.4 checkpoint to generate and judge answers. It supports the top choice but not the full RCPS ordering.",
    "The secondary RADP evidence is not confirmatory: its OHR frame is an audited compatibility subset rather than a full v2 rerun, the matched fidelity control performs similarly to DPO, and the available measurements do not identify a causal training mechanism.",
    "A clean checkout can audit released results and nine adapters, but it cannot reproduce the full chain without external source documents, missing parser outputs and embedding caches.",
  ],
};


/* Ordered by date, newest first, rather than by hand. `date` is zero-padded
 * "YYYY.MM" or "YYYY.MM.DD", so a plain string compare is already chronological;
 * a month-only entry sorts just after the same month's dated ones. Sorting the
 * exported array (not just the index) keeps the hub, the related-reports rail
 * and the sitemap in one order.
 *
 * Newest first is the index convention and what this returns to. Note the
 * consequence, so nobody rediscovers it as a bug: part 1 of the harness series
 * is dated to its repository's origin (2026.01.12) and is therefore the oldest
 * entry, so a newest-first index puts part 2 at the top and part 1 at the
 * bottom. The series numbering in the titles is what carries the reading order;
 * the sort does not. */
export const RESEARCH_PROJECTS: ResearchProject[] = [
  rcps,
  codexSelectiveHarness,
  wigtnOcr,
  wigvo,
  wigss,
  wigtnCoding,
].sort((a, b) => b.date.localeCompare(a.date));

export function getResearchProject(slug: string) {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
