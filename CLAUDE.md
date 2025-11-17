# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains an interactive website for understanding human subjects research regulations across all governing bodies. Built with pure HTML, CSS, and JavaScript, it provides comprehensive coverage of US federal regulations (FDA, OHRP), international standards (ICH-GCP, Declaration of Helsinki), and regional requirements (GDPR).

## Technology Stack

- **HTML5** - Semantic markup with ARIA labels for accessibility
- **CSS3** - Custom CSS with variables, no frameworks
- **JavaScript (ES6+)** - Vanilla JS for search, filtering, and interactivity
- **JSON** - Structured data for regulations
- **GitHub Pages** - Static site hosting from `/docs` folder

## Project Structure

```
docs/                           # GitHub Pages root
├── index.html                  # Homepage
├── search.html                 # Search page
├── 404.html                    # Custom error page
├── .nojekyll                   # Disable Jekyll processing
├── regulations/                # Regulation pages
│   ├── index.html             # Regulations overview with filters
│   ├── fda.html               # FDA 21 CFR 50 & 56
│   ├── common-rule.html       # 45 CFR 46
│   ├── ich-gcp.html           # ICH E6(R2)
│   ├── helsinki.html          # Declaration of Helsinki
│   ├── hipaa.html             # HIPAA Privacy Rule
│   ├── gdpr.html              # EU GDPR
│   └── comparison.html        # Side-by-side comparison tool
├── topics/                     # Topic-based cross-references
│   ├── index.html
│   ├── informed-consent.html
│   ├── irb-review.html
│   ├── vulnerable-populations.html
│   └── data-privacy.html
├── resources/                  # Additional resources
│   ├── index.html
│   ├── glossary.html
│   └── quick-reference.html
└── assets/
    ├── css/
    │   ├── main.css           # Core styles, variables, typography
    │   ├── components.css     # Reusable UI components
    │   └── responsive.css     # Media queries, mobile-first
    ├── js/
    │   ├── main.js            # Core functions, navigation, utilities
    │   ├── search.js          # Search engine implementation
    │   ├── filter.js          # Filtering logic
    │   └── comparison.js      # Comparison tool (to be implemented)
    └── data/
        └── regulations.json    # Regulation data and metadata
```

## Common Commands

### Local Development

Serve the site locally (Python):
```bash
cd docs
python3 -m http.server 8000
```
Visit `http://localhost:8000`

Serve with Node.js:
```bash
npx http-server docs -p 8000
```

### Testing

Open files directly in browser:
```bash
open docs/index.html  # macOS
xdg-open docs/index.html  # Linux
start docs/index.html  # Windows
```

### Validation

Check HTML validation:
```bash
# Install html5validator if needed
pip install html5validator

# Validate all HTML files
html5validator docs/
```

Check CSS:
```bash
# Use online validator or npx
npx css-validator docs/assets/css/*.css
```

### Deployment

The site deploys automatically to GitHub Pages when pushing to the main branch. No build process is required.

## Site Architecture

### Content Organization

The site uses a three-tier information architecture:

1. **Regulations** - Primary content organized by jurisdiction (US, International, EU)
2. **Topics** - Cross-referenced organization by common research topics
3. **Resources** - Supporting materials (glossary, quick reference, templates)

### Navigation Structure

- **Primary Nav**: Home, Regulations, Topics, Resources, Search
- **Breadcrumbs**: Contextual navigation on all subpages
- **Footer Nav**: Complete site map with categorized links
- **Cross-links**: Extensive linking between related regulations and topics

### Data-Driven Content

`assets/data/regulations.json` contains structured data for all regulations:

```json
{
  "regulations": [...],    // Array of regulation objects
  "topics": [...],         // Topic definitions with related regulations
  "jurisdictions": {...},  // Regulations grouped by jurisdiction
  "categories": {...}      // Regulations grouped by category
}
```

This data powers:
- Search functionality
- Filtering on regulations index page
- Comparison tool
- Topic cross-references

## CSS Architecture

### CSS Variables (Design Tokens)

All theming is controlled via CSS variables in `:root` (`main.css`):
- Colors: `--primary-color`, `--text-primary`, `--bg-secondary`, etc.
- Typography: `--font-sans`, `--font-size-*`, `--line-height-*`
- Spacing: `--spacing-xs` through `--spacing-3xl`
- Layout: `--max-width-*`, `--radius-*`, `--shadow-*`

To change the color scheme, modify variables in `main.css` line 6-48.

### CSS Organization

1. **main.css** - Reset, base styles, typography, layout, cards, buttons, footer, utilities
2. **components.css** - Search bar, filters, comparison table, breadcrumbs, TOC, alerts, badges
3. **responsive.css** - Mobile breakpoints, print styles, reduced motion, dark mode (optional)

### Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1024px
- Large Desktop: > 1024px

Grid columns collapse to single column on mobile.

## JavaScript Architecture

### Core Modules

**main.js** - Core functionality:
- Mobile menu toggle
- Active navigation highlighting
- Smooth scroll for anchor links
- Accordion functionality
- Table of contents generation
- External link marking
- Scroll to top button
- Utility functions (debounce, formatDate, escapeHtml)

**search.js** - Search engine:
- Load regulations from JSON
- Search with weighted scoring (title > shortName > summary > requirements)
- Display results with match highlighting
- URL parameter support (`?q=query`)

**filter.js** - Filtering:
- Multi-select checkbox filtering
- Filter by jurisdiction (US, International, EU)
- Filter by category (Human Subjects, IRB, Clinical Trials, Data Privacy)
- Show/hide cards based on selection
- "No results" message handling

**comparison.js** - To be implemented:
- Side-by-side regulation comparison
- Dropdown selection for regulations to compare
- Highlight similarities/differences
- Export/print functionality

### Adding New JavaScript Features

1. Create modular functions
2. Initialize on `DOMContentLoaded`
3. Use event delegation for dynamic content
4. Include ARIA updates for accessibility
5. Add keyboard support (Enter, Escape, Arrow keys)
6. Debounce expensive operations (search, filter)

## Content Guidelines

### HTML Structure

All pages should include:
```html
- Skip to content link (.skip-link)
- Site header with navigation
- Breadcrumbs (on subpages)
- Page header with title and description
- Main content with semantic sections
- Site footer with links and copyright
- JavaScript files (main.js + page-specific)
```

### Accessibility Requirements

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- ARIA labels on interactive elements
- Alt text on images
- Skip to content link
- Keyboard navigation support
- Focus management
- Sufficient color contrast (4.5:1 for text)
- Responsive and mobile-friendly

### Regulation Pages

Each regulation page should include:
- Regulation title and official citation
- Jurisdiction and authority badges
- Summary section
- Key requirements (bulleted list)
- Applicability section
- Related topics with cross-links
- Link to official regulatory text
- Last updated date
- Disclaimer about consulting official sources

### Topic Pages

Each topic page should include:
- Topic title and description
- Overview of the topic
- Relevant regulations (with links)
- Key requirements across regulations
- Best practices or common approaches
- Related topics
- Resources for further reading

## Adding New Content

### Adding a New Regulation

1. **Update data file** (`assets/data/regulations.json`):
   ```json
   {
     "id": "unique-id",
     "title": "Full Official Title",
     "shortName": "Common Name",
     "jurisdiction": "United States|International|European Union",
     "authority": "Governing body",
     "category": "Category name",
     "lastUpdated": "YYYY-MM-DD",
     "url": "https://official-source.gov",
     "summary": "Brief summary",
     "keyRequirements": ["Requirement 1", "Requirement 2"],
     "applicability": "Who this applies to",
     "relatedTopics": ["topic-id-1", "topic-id-2"]
   }
   ```

2. **Create HTML page** (`regulations/regulation-name.html`):
   - Copy structure from existing regulation page
   - Update content sections
   - Add cross-links to topics
   - Include breadcrumb navigation

3. **Update navigation**:
   - Add link to `regulations/index.html`
   - Add to footer navigation in all pages
   - Update homepage if it's a major regulation

4. **Update search**:
   - Add ID mapping in `search.js` `getRegulationPage()` function

### Adding a New Topic

1. **Update data file** (`assets/data/regulations.json`):
   ```json
   {
     "id": "topic-id",
     "title": "Topic Title",
     "description": "Brief description",
     "relatedRegulations": ["reg-id-1", "reg-id-2"]
   }
   ```

2. **Create HTML page** (`topics/topic-name.html`):
   - Section for each related regulation
   - Comparison of requirements across regulations
   - Best practices
   - Examples or case studies

3. **Update cross-links**:
   - Link from regulation pages to topic
   - Add to `topics/index.html`
   - Add to homepage if it's a major topic

### Updating Existing Content

- **Content changes**: Edit HTML files directly
- **Data changes**: Update `regulations.json`
- **Style changes**: Modify CSS files (preferably variables in `main.css`)
- **New features**: Add to appropriate JavaScript file
- **Always test locally before committing**

## GitHub Pages Configuration

### Setup

1. Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: Main (or your branch) + `/docs` folder
4. Save

### Custom Domain (Optional)

1. Add `CNAME` file to `/docs` with domain name
2. Configure DNS A records or CNAME
3. Update GitHub Pages settings

### Force HTTPS

Enable "Enforce HTTPS" in GitHub Pages settings (recommended).

## Testing Checklist

Before committing changes:

- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices or browser devtools
- [ ] Verify all links work (no 404s)
- [ ] Check console for JavaScript errors
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Verify accessibility (screen reader, keyboard-only)
- [ ] Check color contrast
- [ ] Test search functionality
- [ ] Validate HTML/CSS if making structural changes
- [ ] Review for typos and grammatical errors
- [ ] Ensure all regulation citations are accurate

## Performance Considerations

- No external dependencies (no CDN requests)
- System fonts for performance
- Lazy loading not needed (small site)
- Images should be optimized (use SVG for icons)
- CSS/JS are small and inline-able if needed
- JSON data is lightweight (~20KB)

## Notes for AI Assistants

- This is a static documentation site with no backend
- All data is in `regulations.json` - update this file for data changes
- Maintain consistency in HTML structure across pages
- Regulatory content must be accurate - cite official sources
- Always include disclaimers about consulting authoritative sources
- Accessibility is a priority - maintain WCAG 2.1 AA compliance
- Mobile-first responsive design is required
- Test changes locally before committing
- Link extensively between related content
- Keep language clear and professional (regulatory context)
- Include last updated dates on time-sensitive content
