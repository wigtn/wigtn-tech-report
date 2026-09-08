// Uses the shared report renderer. Authorship confirmed by Maximus Kim.
import type { ResearchProject } from "../data";

export const codexScopedInspect: ResearchProject = {
  authorId: "hyeonsang-kim",
  "slug": "codex-scoped-inspect",
  "shortTitle": "WIGTN Codex state inspection",
  "title": "Querying two tasks without returning the entire plan",
  "cardTitle": "Eight state queries, 56.2% less input",
  "dek": "We changed the records returned by a saved-plan inspection tool and the instructions for using it. Across eight internal synthetic state-query cases with GPT-6 Astra, both implementations returned every required field correctly. Aggregate session input fell from 696,334 to 304,669 tokens, a 56.2% reduction. These are CLI input counts including cached input, not a measured reduction in billing or an improvement in general coding performance.",
  "language": "en",
  "track": "Agentic engineering",
  "status": "Engineering note",
  "format": "Engineering report",
  "date": "2026.09.08",
  "heroFigure": {
    "src": "/images/projects/codex_image_v1.jpg",
    "width": 1600,
    "height": 900,
    "alt": "Codex",
    "caption": ""
  },
  "links": [
    {
      "label": "Source repository",
      "href": "https://github.com/wigtn/wigtn-plugins-codex",
      "primary": true
    },
    {
      "label": "Measured study (Korean)",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/report.ko.md"
    },
    {
      "label": "Follow-up protocol",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/protocol.json"
    },
    {
      "label": "Previous Codex report",
      "href": "https://tech.wigtn.com/codex-selective-harness/"
    },
    {
      "label": "Graded results and usage",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/results.json"
    },
    {
      "label": "Command records",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/command-trace.md"
    },
    {
      "label": "Trace audit",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/trace-audit.json"
    },
    {
      "label": "Initial results",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-initial/results.json"
    },
    {
      "label": "Initial command records including the unused option",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-initial/command-trace.md"
    },
    {
      "label": "Additional boundary checks",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-initial/adversarial-results.json"
    },
    {
      "label": "Follow-up tool-output measurements",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/deterministic-results.json"
    },
    {
      "label": "Initial manifest",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-initial/archive-manifest.json"
    },
    {
      "label": "Follow-up manifest",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/scoped-inspect-2026-09-08/evidence-followup/archive-manifest.json"
    },
    {
      "label": "Implementation and reproduction scripts",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/tree/10f284f9e13b77916cf7768dae59357b3443d4d3"
    },
    {
      "label": "Release validation scope",
      "href": "https://github.com/wigtn/wigtn-plugins-codex/blob/10f284f9e13b77916cf7768dae59357b3443d4d3/docs/RELEASE-v0.5.5-KO.md"
    }
  ],
  "metrics": [
    {
      "value": "8/8 = 8/8",
      "label": "Correct state queries",
      "detail": "Eight synthetic cases per condition"
    },
    {
      "value": "−56.2%",
      "label": "Aggregate input",
      "detail": "Cached input included; not billing"
    },
    {
      "value": "16",
      "label": "Model sessions",
      "detail": "One run per case and condition"
    }
  ],
  "sections": [
    {
      "id": "problem",
      "eyebrow": "Problem",
      "title": "A selectively invoked tool can still return unnecessary context",
      "lead": "Our previous Codex report asked whether an older, heavier implementation workflow added value to ordinary coding. This study starts after a user has chosen to save and resume a work plan. Deciding when to invoke a tool and deciding what the tool returns are separate design decisions.",
      "paragraphs": [
        "WIGTN WorkGraph stores task states, dependencies, requirements and check records. Its inspect command validates saved files, detects source changes and reports tasks eligible to resume.",
        "In v0.5.4, inspection returned all tasks, requirements and checks, then repeated some task records in the list of next tasks. A request about two tasks received the remaining records too. Some traces show a full inspection followed by another read of the saved JSON to extract fields for the two requested tasks.",
        "GPT-6 prompted the review, but the experiment does not compare GPT-5.6 with GPT-6. It cannot establish that stronger models universally need less harnessing."
      ],
      "callout": {
        "label": "Evaluation question",
        "text": "Can we retain whole-graph validation while returning a narrower task view, preserve answer correctness and reduce session input?"
      }
    },
    {
      "id": "mechanism",
      "eyebrow": "Mechanism",
      "title": "Validate globally, then select records for the response",
      "lead": "The new inspect --task TASK-ID option includes the requested task and its transitive dependencies. Linked checks, artifacts, requirements and sources remain complete records. Repeat the option to request two tasks.",
      "paragraphs": [
        "Selection happens after validation, so a source change or invalid setting outside the requested task view remains visible. Unknown task IDs fail. Omitting the option retains full inspection. Inspection neither writes files nor executes saved check commands.",
        "A separate saved_revision field distinguishes the on-disk revision from a drift-adjusted preview. The final candidate also shows the scoped command directly when task IDs are known and makes mutation-reference reading conditional. The treatment is this bundle of changes; no ablation isolates their individual contributions."
      ],
      "table": {
        "caption": "Inspection scope: validation stays global; task records are selected after validation",
        "headers": [
          "Stage",
          "v0.5.4",
          "Revised implementation"
        ],
        "rows": [
          {
            "cells": [
              "Saved-file validation",
              "Whole graph",
              "Whole graph"
            ]
          },
          {
            "cells": [
              "Source drift, summary and release gates",
              "Whole graph",
              "Whole graph"
            ]
          },
          {
            "cells": [
              "Task records and linked context returned",
              "Whole graph",
              "Requested tasks and transitive dependencies"
            ]
          },
          {
            "cells": [
              "Next tasks returned",
              "Whole graph",
              "Selected scope"
            ]
          },
          {
            "cells": [
              "Omission information",
              "None",
              "Included, total and omitted counts; scope description"
            ]
          }
        ]
      },
      "callout": {
        "label": "Scoped inspection example",
        "text": "python3 <plugin-root>/scripts/wigtn.py --root <repository> --json inspect --task TASK-061 --task TASK-120"
      }
    },
    {
      "id": "development",
      "eyebrow": "Development result",
      "title": "Providing an option did not ensure its use",
      "lead": "The first study ran eight synthetic cases under three conditions: no plugin, v0.5.4 and an initial candidate, for 24 sessions. All three conditions answered 8/8 correctly. The candidate used 39.26% less aggregate input than v0.5.4, but input increased in two cases.",
      "paragraphs": [
        "In the 120-task case, the candidate omitted --task, inspected the whole graph and then read and filtered the JSON again. Its answer was correct, but input rose from 86,764 to 90,299 tokens, or 4.07%. We retained this run rather than dropping it or replacing it with a retry.",
        "After that observation, we changed the skill's command example and when it tells the model to read the mutation reference. The tool implementation remained the same as in the initial candidate. We then froze new cases with different sizes and conditions for a follow-up comparison.",
        "The first study's 39.26% and the follow-up's 56.25% are estimates on different cases. Their difference does not measure the incremental effect of the skill revision."
      ]
    },
    {
      "id": "protocol",
      "eyebrow": "Protocol",
      "title": "Fix the answer before comparing input",
      "lead": "The follow-up contains eight paired cases, one run per condition per case: 16 sessions in total. It does not estimate within-case variation from repeated trials.",
      "paragraphs": [
        "The 20% gate is a practical adoption threshold, not a statistical significance level.",
        "Cases include small plans with 8 and 16 tasks, large plans with 40 and 140 tasks, source drift with 72 tasks, blocked dependencies with 90, a fully connected dependency chain with 80, and invalid project settings with 80. Each request asks about two tasks.",
        "The answer key is derived when constructing the fixture, without calling the candidate selection function. It specifies the saved revision, global source freshness and changed paths, and the two tasks' effective states, eligibility, dependencies, requirement IDs, intended paths and saved check commands. Array order does not affect grading. Returning a check command does not mean executing it.",
        "Conditions use separate CODEX_HOME directories and workspaces. Access to evaluator and sibling-run directories is prohibited by the task instructions, not an OS read boundary. Before/after hashes check file mutation. A separate command-log review checks saved-command execution and out-of-scope reads. The same development agent performed this review; it is not an independent blinded evaluation."
      ],
      "table": {
        "caption": "Frozen follow-up protocol: eight paired cases, sixteen sessions",
        "headers": [
          "Item",
          "Fixed setting"
        ],
        "rows": [
          {
            "cells": [
              "Model and effort",
              "GPT-6 Astra, medium"
            ]
          },
          {
            "cells": [
              "Runtime",
              "Codex CLI 0.153.4"
            ]
          },
          {
            "cells": [
              "Baseline",
              "Released v0.5.4, commit 175c8e9"
            ]
          },
          {
            "cells": [
              "Candidate",
              "Frozen final candidate; v0.5.5 Core differs only in manifest version"
            ]
          },
          {
            "cells": [
              "Input",
              "Same saved state and request; both conditions explicitly invoke Work Planner"
            ]
          },
          {
            "cells": [
              "Order",
              "Conditions randomized within each case with seed 908731; sequential execution"
            ]
          },
          {
            "cells": [
              "Limits",
              "300 seconds per session; no automatic retry or candidate change during execution"
            ]
          },
          {
            "cells": [
              "Primary outcome",
              "Every requested field matches the answer key; no file mutation"
            ]
          },
          {
            "cells": [
              "Prespecified practical gate",
              "Candidate 8/8 correct, no worse correctness than baseline, at least 20% lower aggregate input"
            ]
          }
        ]
      }
    },
    {
      "id": "results",
      "eyebrow": "Results",
      "title": "Both conditions returned the correct state",
      "lead": "Both implementations scored 8/8. All 16 sessions completed normally, with no missing usage, timeout or retry. Workspace hashes were unchanged. Review of 43 command records found no saved-check execution or reads of sibling-run or evaluator files.",
      "paragraphs": [
        "Aggregate input reduction is 1 − 304,669 / 696,334, not the unweighted mean of case percentages. CLI input accumulates across a session; it is not the length of one prompt, unique information content or internal reasoning. Input minus cached input is a subtraction of CLI fields, not an invoice. Elapsed time is a secondary measurement affected by service conditions and caching."
      ],
      "table": {
        "caption": "Follow-up results: sum of eight runs per condition",
        "headers": [
          "Metric · sum of eight runs per condition",
          "v0.5.4",
          "Final candidate",
          "Change"
        ],
        "rows": [
          {
            "cells": [
              "All required fields correct",
              "8/8",
              "8/8",
              "Unchanged"
            ]
          },
          {
            "cells": [
              "Total input tokens, including cache",
              "696,334",
              "304,669",
              "−56.25%"
            ]
          },
          {
            "cells": [
              "Cached input tokens",
              "582,400",
              "222,080",
              "−61.87%"
            ]
          },
          {
            "cells": [
              "Input minus cached input, arithmetic difference",
              "113,934",
              "82,589",
              "−27.51%"
            ]
          },
          {
            "cells": [
              "Output tokens",
              "5,740",
              "3,689",
              "−35.73%"
            ]
          },
          {
            "cells": [
              "Command execution items",
              "29",
              "14",
              "−51.72%"
            ]
          },
          {
            "cells": [
              "Elapsed seconds",
              "302.739",
              "190.268",
              "−37.15%"
            ]
          }
        ]
      }
    },
    {
      "id": "case-results",
      "eyebrow": "Case results",
      "title": "Every case used less input, with different reductions",
      "lead": "The final candidate used scoped inspection in all eight runs and read the mutation reference in none. The initial candidate used the option in seven of eight different cases. These counts do not establish a statistically reliable improvement in option selection.",
      "figures": [
        {
          "src": "/images/projects/codex-scoped-inspect-input.png",
          "width": 1870,
          "height": 1190,
          "alt": "Paired input token counts for eight synthetic saved-plan queries, comparing v0.5.4 with the final candidate.",
          "caption": "Eight paired synthetic cases, one run per condition. Session input includes cached input. There are no within-case repetitions from which to estimate error bars."
        }
      ],
      "table": {
        "caption": "Per-case input tokens, including cached input",
        "headers": [
          "Case · task count",
          "Baseline input",
          "Candidate input",
          "Change"
        ],
        "rows": [
          {
            "cells": [
              "Small · 8",
              "49,759",
              "31,095",
              "−37.51%"
            ]
          },
          {
            "cells": [
              "Small · 16",
              "53,321",
              "46,258",
              "−13.25%"
            ]
          },
          {
            "cells": [
              "Large · 40",
              "86,192",
              "31,694",
              "−63.23%"
            ]
          },
          {
            "cells": [
              "Large · 140",
              "86,881",
              "31,739",
              "−63.47%"
            ]
          },
          {
            "cells": [
              "Source drift · 72",
              "87,794",
              "31,163",
              "−64.50%"
            ]
          },
          {
            "cells": [
              "Blocked dependencies · 90",
              "116,337",
              "30,689",
              "−73.62%"
            ]
          },
          {
            "cells": [
              "Full dependency chain · 80",
              "130,187",
              "70,721",
              "−45.68%"
            ]
          },
          {
            "cells": [
              "Invalid settings · 80",
              "85,863",
              "31,310",
              "−63.53%"
            ]
          }
        ]
      }
    },
    {
      "id": "boundary",
      "eyebrow": "Boundary",
      "title": "A narrow request can still require the whole graph",
      "lead": "When 80 tasks form one dependency chain, selecting the last task requires all 80. The selected tool response grew from 110,163 to 112,549 bytes, a 2.17% increase, because the response adds scope metadata.",
      "paragraphs": [
        "The candidate ran inspection again with a JSON filter after encountering the long output. Yet its session input decreased from 130,187 to 70,721 tokens, or 45.68%. Reference reading and repeat-query paths also changed. The size of one tool response cannot explain the aggregate session input, and we did not measure each path's contribution separately.",
        "For invalid project settings, both conditions returned valid_artifacts: false and eligible: false for both tasks. The tool's exit code 1 correctly signalled the invalid state. It was not counted as a failed model session or a failed product test.",
        "The expected advantage of selection depends on the relevant records being a sufficiently small part of the whole. Task count alone does not guarantee a smaller response."
      ]
    },
    {
      "id": "interpretation",
      "eyebrow": "Interpretation",
      "title": "Document size is not session input",
      "lead": "The final skill document was 2,324 bytes, larger than the baseline's 2,194 bytes. Session input nevertheless fell. Skill-file size alone is therefore an insufficient proxy for execution efficiency in this comparison.",
      "paragraphs": [
        "The supported result is narrow: on eight saved-plan queries, scoped retrieval and revised guidance preserved answer correctness while reducing input. Correctness did not improve. The experiment did not evaluate the complete plugin or GPT-6's coding ability.",
        "The reusable questions concern the interface: Does each returned record help answer the current request? Does narrowing the response preserve global error detection? Does the model use the new option? Does it still return the correct answer? Other systems can apply those questions, but must measure their own effect size."
      ]
    },
    {
      "id": "artifacts",
      "eyebrow": "Artifacts",
      "title": "Re-scoring is different from rerunning",
      "lead": "The archive retains inputs, answer keys, responses, commands and frozen snapshots for the initial 24 and follow-up 16 sessions. Manifests cover 2,594 and 1,939 files, excluding authentication directories. Re-scoring copies during release preparation reproduced the stored result JSON exactly.",
      "paragraphs": [
        "The measured Core code, skills and references match the released v0.5.5 files. The candidate manifest was still 0.5.4 during measurement; the release changes that version field without rewriting the frozen snapshot. Fourteen inspection regression tests, six additional boundary checks and full repository validation also passed. These checks are not additional model sessions.",
        "Re-scoring archived responses requires no model call. Fresh sessions require Codex CLI, credentials and model access, and are not guaranteed to reproduce the same output. The frozen runner preserves its original macOS CLI path and versioned install path. The current runner supports WIGTN_CODEX_BIN and reads install versions from snapshot manifests. Exact candidate selection and commands appear in the reproduction instructions."
      ],
      "callout": {
        "label": "Next validation",
        "text": "These results informed the inclusion of scoped inspection in v0.5.5. Extending the claim requires fixed resume tasks in real repositories, repeated paired runs and implementation tests, followed by component ablations and external reproduction."
      }
    }
  ],
  "limitations": [
    "Internal synthetic cases. The developer selected cases around the discovered bottleneck. The follow-up uses the same generator with different sizes and conditions; it is not an external independent holdout.",
    "One run per case and condition. Sixteen sessions are not sixteen independent task samples. We do not estimate repeated-run variance or a stable latency improvement.",
    "Bundled changes. Selection, saved revision, examples and reference-loading guidance are not independently ablated. Models and effort levels are not compared.",
    "State queries only. There is no implementation, bug fix or long-running repository task. Answer correctness does not establish better code or project outcomes.",
    "Instruction-based access boundaries. We did not use OS isolation for evaluator reads or independent blinded trace review.",
    "Usage is not billing. Cached-inclusive input and arithmetic subtraction are not a measured invoice or unique context size."
  ]
};
