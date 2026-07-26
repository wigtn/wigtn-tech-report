# WIGTN Research

Static research archive for WIGTN technical reports.

- Production domain: <https://research.wigtn.com>
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
builds the Next.js static export, uploads `out/`, and deploys it through GitHub
Pages.

The repository includes `public/CNAME` for `research.wigtn.com`. In the DNS
provider, configure:

```text
Type: CNAME
Name: research
Value: wigtn.github.io
```

After DNS propagation, enable **Enforce HTTPS** in the repository’s Pages
settings.
