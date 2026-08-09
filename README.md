# WIGTN TECH

Static archive for WIGTN technical reports.

- Custom domain: <https://tech.wigtn.com>
- Fallback Pages URL: <https://wigtn.github.io/wigtn-tech-report/> (redirects
  to the custom domain once it is configured)
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
builds the Next.js static export at the site root (no base path — the custom
domain owns the whole origin), uploads `out/`, and deploys it through GitHub
Pages.

## Custom domain cutover

The order matters. Merging this configuration redeploys with root-relative
asset paths, which the old `github.io/wigtn-tech-report` URL cannot serve —
so the DNS record must exist first, and the Pages domain must be set right
after the deploy lands:

1. In Cloudflare (zone `wigtn.com`), add — DNS only, no proxy, same as the
   apex records pointing at Pages:

   ```text
   Type: CNAME
   Name: tech
   Value: wigtn.github.io
   ```

2. Merge this configuration into `main` and wait for the deploy to finish.
3. Set the Pages custom domain (or use Settings → Pages):

   ```bash
   gh api -X PUT repos/wigtn/wigtn-tech-report/pages -f cname=tech.wigtn.com
   ```

4. Once GitHub finishes provisioning the certificate, enforce HTTPS:

   ```bash
   gh api -X PUT repos/wigtn/wigtn-tech-report/pages -F https_enforced=true
   ```

GitHub then 301-redirects every old `wigtn.github.io/wigtn-tech-report/*`
URL to the custom domain, so links already in the wild keep working.
