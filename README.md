# Research Regulation Training Guide

A comprehensive, interactive website for understanding human subjects research regulations across all governing bodies.

## Overview

This project provides an accessible, searchable reference for research regulations including:
- **US Federal**: FDA, OHRP Common Rule, HIPAA
- **International**: ICH-GCP, Declaration of Helsinki
- **Regional**: EU GDPR

## Features

✨ **Interactive Search** - Full-text search across all regulations
🔍 **Advanced Filtering** - Filter by jurisdiction, category, and topic
⚖️ **Comparison Tool** - Side-by-side regulation comparison
📚 **Topic-Based Navigation** - Cross-referenced by common research topics
📱 **Responsive Design** - Mobile-first, accessible on all devices
♿ **WCAG 2.1 AA Compliant** - Fully accessible design

## Technology Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks or build process required
- **Static Site** - Optimized for GitHub Pages deployment
- **JSON Data** - Structured regulation data for easy updates
- **Vanilla JS** - ES6+ modules for search, filtering, and comparison

## Project Structure

```
docs/                           # GitHub Pages root
├── index.html                  # Homepage
├── search.html                 # Search page
├── 404.html                    # Custom error page
├── regulations/                # Regulation pages
│   ├── index.html             # Regulations overview
│   ├── fda.html               # FDA regulations
│   ├── common-rule.html       # Common Rule
│   ├── ich-gcp.html           # ICH-GCP
│   ├── helsinki.html          # Declaration of Helsinki
│   ├── gdpr.html              # GDPR
│   └── comparison.html        # Comparison tool
├── topics/                     # Topic pages
│   ├── index.html
│   ├── informed-consent.html
│   ├── irb-review.html
│   ├── vulnerable-populations.html
│   └── data-privacy.html
├── resources/                  # Resources
│   ├── index.html
│   ├── glossary.html
│   └── quick-reference.html
└── assets/
    ├── css/                    # Stylesheets
    │   ├── main.css           # Core styles
    │   ├── components.css     # UI components
    │   └── responsive.css     # Media queries
    ├── js/                     # JavaScript
    │   ├── main.js            # Core functionality
    │   ├── search.js          # Search engine
    │   ├── filter.js          # Filtering logic
    │   └── comparison.js      # Comparison tool
    └── data/
        └── regulations.json    # Regulation data
```

## Local Development

### Prerequisites

- A modern web browser
- A local web server (optional, for testing)

### Running Locally

**Option 1: Simple HTTP Server (Python)**
```bash
cd docs
python3 -m http.server 8000
```
Visit `http://localhost:8000`

**Option 2: Node.js HTTP Server**
```bash
npx http-server docs -p 8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `docs/index.html`
- Select "Open with Live Server"

### No Build Process Required

This project uses pure HTML/CSS/JavaScript with no build step. Simply open the HTML files in a browser or serve the `docs` folder.

## GitHub Pages Deployment

The site is configured for GitHub Pages deployment from the `/docs` folder.

### Setup

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: Select your branch and `/docs` folder
4. Save

The site will be available at: `https://[username].github.io/Research-Regulation-Training-Guide/`

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to `/docs` with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

## Adding Content

### Adding a New Regulation

1. Add regulation data to `assets/data/regulations.json`
2. Create an HTML page in `regulations/` folder
3. Update navigation links in all pages
4. Add cross-references to related topics

### Adding a New Topic

1. Create HTML page in `topics/` folder
2. Link to relevant regulations
3. Update topic navigation
4. Add to homepage feature grid

### Updating Existing Content

- Edit HTML files directly
- Update `regulations.json` for data changes
- Modify CSS for styling updates
- Test changes locally before committing

## File Organization

### HTML Pages
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Follow established header/footer structure
- Include breadcrumb navigation

### CSS
- CSS variables in `main.css` for theming
- Component styles in `components.css`
- Responsive breakpoints in `responsive.css`
- Mobile-first approach

### JavaScript
- Modular functions
- Event delegation where appropriate
- Accessibility keyboard support
- Progressive enhancement

## Accessibility

This site follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip to content link
- Color contrast compliance
- Screen reader compatibility
- Focus management

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Edit content in `docs/` folder
2. Test locally
3. Commit changes with descriptive messages
4. Push to repository
5. GitHub Pages will auto-deploy

## Content Disclaimer

This guide provides educational summaries of research regulations. Always consult:
- Official regulatory text
- Your institution's compliance office
- Legal counsel for authoritative guidance

Regulations may change. Verify currency with official sources.

## License

[Specify your license]

## Contact

- Repository: https://github.com/technical-communicator/Research-Regulation-Training-Guide
- Issues: https://github.com/technical-communicator/Research-Regulation-Training-Guide/issues
