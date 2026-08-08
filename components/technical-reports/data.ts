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
 * `contain` and `focalPoint` now only affect the hub card, which crops every
 * report to one 16:10 tile. Inside a report nothing crops, so neither is read. */
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
  citation: string;
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
   * caption and stays out of the body: `heroSectionId` is deliberately absent,
   * which keeps it to the hub card. The chart it replaced now sits in `results`,
   * where its caption can sit next to the numbers it plots. */
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
    'Kim, Hyeonsang. (2026). "Running a harness on frontier models, part 2: Codex." WIGTN Technical Reports.',
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
   * `heroSectionId`, so it identifies the report on the hub card without posing
   * as a figure in the body. The highlights chart it replaced moved into
   * `parsing`, next to the table of the numbers it plots. */
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
      index: "01",
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
      index: "02",
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
      index: "03",
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
      index: "04",
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
      index: "05",
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
      index: "06",
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
      index: "07",
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
      index: "08",
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
      index: "09",
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
  cardTitle: "Real-time translation over an ordinary PSTN call",
  dek: "A field-tested account of what changed when a browser translator met ordinary phone audio, including the echo-control ideas that failed before the deployed design.",
  track: "AI systems",
  status: "Peer reviewed",
  format: "ACL system paper",
  date: "2026.07",
  authorId: "sangwoo-son",
  authors: "Hyeong-seob Kim · Sang-Woo Son · Hyun-woo Cho · Hyeonsang Kim · Jinmo Kim",
  venue: "ACL 2026 System Demonstrations · pp. 336–344",
  featured: true,
  /* Brand banner, same treatment as the other reports: no caption, no
   * `heroSectionId`, so it identifies the report on the hub card rather than
   * posing as a figure. Everything it asserts is already in this report: the
   * venue is in `venue`, and the provider is named in the cost section. The
   * architecture diagram it replaced moved into `architecture`. */
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
      index: "03",
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
      index: "05",
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
      index: "06",
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
      index: "07",
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
      index: "08",
      eyebrow: "Recognition",
      title: "Asking one model to hear and to translate produced sentences nobody said",
      paragraphs: [
        "The realtime speech API can transcribe and translate in one pass, and doing that added content the speaker had not produced. Not mishearing: fluent, plausible additions that fit the conversation and were never said.",
        "The two jobs are now separate. Recognition stays inside the realtime session, and translation runs as a discrete text call at temperature zero against the transcript, with the realtime session's own translation path switched off by configuration rather than left unused.",
        "The architecture diagram at the top of this report predates that change and still shows the realtime session handling translation on the voice-to-voice path. The deployed arrangement is the one described here.",
      ],
      callout: {
        label: "The pattern, not a rule",
        text: "Several stages that could be made deterministic were moved out of the model: echo control is a gate rather than a classifier, and translation is a fixed-temperature call rather than an improvisation. Recognition and the last-resort guardrail rewrite are still model calls, so this is a direction the system leans rather than a property it has.",
      },
    },
    {
      id: "hallucination",
      index: "09",
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
      index: "10",
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
      index: "11",
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
      index: "12",
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
      index: "13",
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
  citation:
    'Kim, H. et al. (2026). "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating." ACL 2026 System Demonstrations, 336–344.',
};

const wigss: ResearchProject = {
  slug: "wigss",
  shortTitle: "WIGSS",
  title: "Fixing the last ten pixels in the browser without losing the diff",
  cardTitle: "Open-source drag-to-edit that rewrites your source",
  dek: "An engineering note on why we moved small visual corrections into the browser while keeping the repository, reviewable diffs and rollback as the source of truth.",
  track: "Agentic engineering",
  status: "Engineering note",
  format: "Open-source architecture",
  date: "2026.04.10",
  authorId: "jinmo-kim",
  /* Brand banner, same treatment as the other four: no caption, no
   * `heroSectionId`, so it stays on the hub card. The npm screenshot it replaced
   * moved into `architecture`.
   *
   * The banner art shows `npm i @wigtn/wigss`. That scoped package does not
   * exist; the published one is `wigss`, which is what every link in this file
   * points at. The string is illegible at card size and nothing on this site
   * repeats it, so it is not shipping a wrong instruction to a reader, but the
   * art should be corrected before it is used anywhere at full size. */
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
      figures: [
        {
          src: "/images/carousel/wigss-npm.png",
          width: 1698,
          height: 1169,
          alt: "WIGSS browser editor package",
          caption:
            "WIGSS wraps the target development server with a visual editor while keeping source code as the final artifact. Published as wigss on npm.",
        },
      ],
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
   * on. Same treatment as part 2: no caption, no `heroSectionId`, so it stays on
   * the hub card instead of appearing in the body as if it were a figure. The
   * workflow diagram it replaced moved into the `workflow` section. */
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
      id: "origin",
      index: "04",
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
      index: "05",
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
      index: "06",
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
      index: "07",
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
  citation:
    'WIGTN Engineering. (2026). "Running a harness on frontier models, part 1: Claude Code." WIGTN Technical Reports.',
};


/* Ordered by date, oldest first, rather than by hand. `date` is zero-padded
 * "YYYY.MM" or "YYYY.MM.DD", so a plain string compare is already chronological;
 * a month-only entry sorts just before the same month's dated ones. Sorting the
 * exported array (not just the index) keeps the hub, the related-reports rail
 * and the sitemap in one order.
 *
 * Oldest first, not newest, because the index has to read as a sequence: the
 * harness work is a numbered two-part series, and a newest-first index puts
 * part 2 above part 1. Reversing it opens on the plugin's origin and closes on
 * the evaluation that came out of it, which is the order the reports were
 * written to be read in. The cost is that the newest report is at the bottom;
 * for a five-item index that is a trade worth making. */
export const RESEARCH_PROJECTS: ResearchProject[] = [
  codexSelectiveHarness,
  wigtnOcr,
  wigvo,
  wigss,
  wigtnCoding,
].sort((a, b) => a.date.localeCompare(b.date));

export function getResearchProject(slug: string) {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
