# WIGTN Research

Static research archive for WIGTN technical reports.

- Current Pages URL: <https://wigtn.github.io/wigtn-tech-report/>
- Planned custom domain: <https://research.wigtn.com>
- Deployment: GitHub Pages
- Source branch: `main`

## Local development

```bash
npm ci
npm run dev
```

The static production build is written to `out/`:

```bash
npm run build
```

## Publishing

Every push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow
builds the Next.js static export under the `/wigtn-tech-report` base path,
uploads `out/`, and deploys it through GitHub Pages.

When the custom domain is ready, remove the Pages base-path environment
variables from the workflow, add `public/CNAME` containing
`research.wigtn.com`, and configure:

```text
Type: CNAME
Name: research
Value: wigtn.github.io
```

After DNS propagation, enable **Enforce HTTPS** in the repository’s Pages
settings.
