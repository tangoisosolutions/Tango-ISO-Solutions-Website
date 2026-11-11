# Tango ISO Solutions website

Static website: no build step, no frameworks. Live at https://tangoiso.netlify.app

## Structure
```
index.html            Page markup (all sections/pages live here, switched by JS)
assets/css/style.css  All styles (brand colours are CSS variables at the top)
assets/js/app.js      Navigation, enquiry forms, Document Builder, file uploads
assets/img/           Logo (navy + white) and favicon
logo.png, og-image.png  Used for Google/social sharing previews
robots.txt, sitemap.xml  Search engine files
netlify.toml          Netlify settings
```

## Run locally
Open `index.html` in a browser, or from this folder run `python -m http.server 8000` and visit http://localhost:8000

## Brand
Navy `#022143`, green `#0d7b01`, bright green `#48c434`. Fonts: Montserrat (headings), Inter (body).

## Services used
- **Web3Forms**: sends contact/enquiry/builder emails to the company inbox (key in `app.js`, public by design)
- **Supabase Storage**: private `client-uploads` bucket for Document Builder files (publishable key in `app.js`, upload-only policy)
- **Never** commit a Supabase `service_role` key or any other secret.

## Workflow
1. Create a branch for each change (`git checkout -b feature-name`)
2. Open a pull request into `main`
3. Merge after review. Netlify deploys `main` automatically.

## Notes
- Standard names and editions (e.g. ISO 9001:2026) must be checked against what is currently published.
- Keep the Document Builder, forms and upload logic working when restyling: test one full run before merging.
