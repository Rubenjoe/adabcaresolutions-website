# AdAb Care Solutions — Website

The official website for **AdAb Care Solutions**, a Tasmania-based medical equipment rental service providing wheelchairs, pressure-relief mattresses, and related mobility/care equipment with delivery, setup, and support.

🔗 **Live site:** [adabcaresolutions.com.au](https://adabcaresolutions.com.au)

## About

This is a single-page marketing and information site built to:

- Introduce AdAb Care Solutions and its mission
- Showcase rental equipment (mattresses, wheelchairs, mobility aids) with specs and daily rates
- Outline rental services (delivery, setup, support)
- Provide a contact form for quote requests and enquiries

## Tech stack

- **HTML5 / CSS3** — single-page layout, custom properties for theming
- **Vanilla JavaScript** — equipment data, interactivity, form handling
- **[Web3Forms](https://web3forms.com/)** — contact form submission (no backend required)
- **GitHub Pages** — hosting, with a custom domain via the `CNAME` file

No build step, framework, or package manager — the site is plain static files served as-is.

## Project structure

```
.
├── index.html          # Main page: hero, services, equipment, about, contact
├── style.css            # All styling
├── app.js                # Equipment data + interactive functionality
├── CNAME                 # Custom domain config for GitHub Pages
├── logo.jpg
├── bgimg.jpg              # Hero background
├── aboutbgimg.jpg         # About section background
├── servicesbg.jpg         # Services section background
├── servicesbgimg.jpg      # Services section background (alt)
├── contactbg.jpg          # Contact section background
├── wheelchair.jpg
├── jazzypowerchair.jpg
└── mattress.jpeg
```

## Page sections

| Section | Anchor | Content |
|---|---|---|
| Home | `#home` | Hero banner, calls to action |
| Equipment | `#equipment` | Rental catalogue with specs and pricing |
| Services | `#services` | Delivery, setup, and support offerings |
| About | `#about` | Mission and background |
| Contact | `#contact` | Enquiry/quote request form |

## Running locally

No build tools needed — just open the file or serve the folder:

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally (recommended, avoids any local file restrictions)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is deployed via **GitHub Pages** using the custom domain configured in `CNAME` (`adabcaresolutions.com.au`). Pushing to the default branch updates the live site directly — there is no staging environment, so review changes carefully before merging.

## Notes for maintainers

- The contact form submits via Web3Forms using a public **access key** embedded in `index.html`. This is expected — Web3Forms access keys are designed to be client-side/public (unlike a secret API key) and only allow form submissions to the configured inbox, so this is not a security issue.
- A few background images (`servicesbg.jpg`, `servicesbgimg.jpg`) are very large (10800×7200, ~8.5MB each) relative to their display size on the page. Compressing/resizing these would noticeably improve page load time without a visible quality loss.
- There is currently no `.gitignore` — consider adding one if editor/OS files start getting committed (e.g. `.DS_Store`, `.vscode/`).

## License

This codebase is licensed under the MIT License — see [LICENSE](LICENSE) for details. Site content, branding, and imagery belong to AdAb Care Solutions.
