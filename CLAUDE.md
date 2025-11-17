# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a training guide and documentation for research regulations. Built with MkDocs and the Material theme, it provides comprehensive guidance on regulatory compliance, best practices, and training materials for research professionals.

## Technology Stack

- **MkDocs**: Static site generator for documentation
- **Material for MkDocs**: Modern, responsive documentation theme
- **Python**: Runtime environment (3.8+)
- **Markdown**: Content format with extensions for enhanced features

## Project Structure

```
Research-Regulation-Training-Guide/
├── docs/                    # Documentation source files
│   ├── index.md            # Home page
│   ├── modules/            # Training module content
│   ├── regulations/        # Regulatory reference documentation
│   ├── resources/          # Additional resources and links
│   ├── assessments/        # Knowledge checks and quizzes
│   └── templates/          # Template forms and documents
├── mkdocs.yml              # MkDocs configuration
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation
└── site/                  # Generated static site (gitignored)
```

## Common Commands

### Initial Setup

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Development

Start local development server with live reload:
```bash
mkdocs serve
```
- Serves site at `http://127.0.0.1:8000/`
- Auto-reloads on file changes
- Press `Ctrl+C` to stop

Serve on custom port:
```bash
mkdocs serve -a localhost:8080
```

### Building

Build static site for deployment:
```bash
mkdocs build
```
- Generates production-ready static site in `site/` directory
- Validates links and configuration
- Minifies output

Clean build (remove previous build artifacts):
```bash
mkdocs build --clean
```

### Validation

Check for broken links and configuration issues:
```bash
mkdocs build --strict
```
- Treats warnings as errors
- Useful for CI/CD validation

## Documentation Architecture

### Content Organization

Documentation is organized into five main sections:

1. **Training Modules** (`docs/modules/`): Structured learning materials covering compliance topics
2. **Regulations** (`docs/regulations/`): Reference documentation for regulatory requirements
3. **Resources** (`docs/resources/`): Supplementary materials, glossaries, and external links
4. **Assessments** (`docs/assessments/`): Quizzes and knowledge checks
5. **Templates** (`docs/templates/`): Downloadable forms and document templates

### Navigation Structure

The site navigation is defined in `mkdocs.yml` under the `nav:` section. When adding new pages:

1. Create the markdown file in the appropriate directory
2. Add an entry to the `nav:` section in `mkdocs.yml`
3. Use relative links between pages (e.g., `[link](../other-page.md)`)

### Markdown Features

This project uses extended Markdown features via `pymdownx` extensions:

**Admonitions** (callouts):
```markdown
!!! note "Title"
    Content here

!!! warning "Important"
    Warning content

!!! tip
    Tip content
```

**Code blocks with syntax highlighting**:
````markdown
```python
def example():
    pass
```
````

**Tabbed content**:
```markdown
=== "Tab 1"
    Content 1

=== "Tab 2"
    Content 2
```

**Tables** (standard Markdown tables are supported)

### Theme Configuration

The Material theme is configured in `mkdocs.yml` with:
- Light/dark mode toggle
- Navigation features (tabs, sections, expand, top)
- Search with suggestions and highlighting
- Code copy buttons

To modify theme settings, edit the `theme:` section in `mkdocs.yml`.

## Content Guidelines

When working with this repository:

- Maintain clear, professional documentation suitable for regulatory and training purposes
- Ensure accuracy in all regulatory references and compliance information
- Use admonitions (note, warning, tip, info) to highlight important information
- Include "Last updated" dates on pages that reference time-sensitive regulatory information
- Link to authoritative sources for regulatory citations
- Keep training materials accessible and well-organized
- Test documentation builds locally before committing

## Adding New Content

### Creating a New Training Module

1. Create a new markdown file in `docs/modules/` (e.g., `irb-basics.md`)
2. Use the module template structure (see `docs/modules/index.md`)
3. Add the module to navigation in `mkdocs.yml`:
   ```yaml
   nav:
     - Training Modules:
       - modules/index.md
       - IRB Basics: modules/irb-basics.md
   ```
4. Link to related assessments and resources

### Adding Regulatory Reference Content

1. Create markdown files in `docs/regulations/` organized by topic
2. Include clear section headings for: Summary, Key Requirements, Applicability, Implementation
3. Add warning admonitions about consulting authoritative sources
4. Update `docs/regulations/index.md` with links to new content

### Adding Templates

1. Place template files in `docs/templates/`
2. Create a markdown page describing the template and providing download links
3. Include usage instructions and customization guidelines
4. Add disclaimer about institutional approval requirements

## Deployment

The static site can be deployed to any web server or hosting platform:

- **GitHub Pages**: `mkdocs gh-deploy`
- **Manual**: Upload contents of `site/` directory to web server
- **CI/CD**: Integrate `mkdocs build` into deployment pipeline

## Notes for AI Assistants

- This is a documentation-focused project; prioritize clarity and accuracy
- Regulatory content requires careful attention to detail and correctness
- When adding content, verify it follows the established structure and style
- Always include appropriate disclaimers and warnings for regulatory content
- Suggest consulting authoritative sources and institutional compliance offices
- Test documentation builds after making changes
