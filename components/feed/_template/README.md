# Blog post template

A blog post is one file, `components/blog/posts/<slug>.ts`, plus its images
under `public/images/blog/<slug>/`. `components/blog/data.ts` imports it and
puts it in `BLOG_POSTS`.

Two shapes, because a conference week and a two-day hackathon do not want the
same sections:

- `conference/STRUCTURE.md` for a trip report
- `hackathon/STRUCTURE.md` for a build under a deadline

Both moved here from `wigtn-webpage` on 2026-08-09 with the four posts they
describe. They were written for that repo's `Article` type, so the field names
in the examples differ from `BlogPost`:

| there | here |
| --- | --- |
| `summary` | `dek` |
| `image` | `cover`, an object with `src`, `alt`, `width`, `height` |
| colocated `import cover from "./x.jpg"` | `/images/blog/<slug>/x.jpg` string |
| `kind`, `channel`, `newsTopic`, `icon` | dropped |

The section advice in each STRUCTURE.md is what matters and carries over
unchanged.

## Rules that are not in the structure files

**No em-dashes**, prose or comments. An em-dash almost always marks a sentence
that wanted to be two, a clause that wanted parentheses, or a list that wanted
a colon. Rewrite it rather than substituting a hyphen.

**No invented facts.** Every number, name and date traces to a source named in
the file header: an event page, a repo, a commit log, a photograph. If nothing
says it, cut the sentence. The four migrated posts carry those headers; read
one before writing a fifth.

**Images carry `width` and `height`.** This site has no static-import loader
for post images, so the intrinsic size is written out to reserve layout space.
Get it with `sips -g pixelWidth -g pixelHeight <file>`.

**Byline is the team.** `byline: "WIGTN"`. `authorId` exists for a post one
person is answerable for, which a trip report is not. Reports are the other
way round, and `technical-reports/data.ts` requires it.
