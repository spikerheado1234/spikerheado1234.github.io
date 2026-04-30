# Ahan Gupta — Personal Academic Website

A static port of the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme — same look, no Jekyll/Ruby setup required.

## What's included

```
.
├── index.html              # About page
├── publications.html       # Full publications list
├── projects.html           # Project cards
├── blog.html               # Blog placeholder
└── assets/
    ├── css/
    │   ├── main.css        # Compiled from al-folio's _sass/* (MIT license preserved)
    │   └── bootstrap.min.css   # Bootstrap 4 (al-folio depends on it)
    ├── js/
    │   └── theme.js        # Theme toggle (light/dark/system) — MIT, adapted from al-folio
    └── img/
        └── prof_pic.jpg    # Profile photo
```

External CDN dependencies (loaded from each page's `<head>`):
- Google Fonts: Roboto + Roboto Slab + Material Icons (al-folio's exact font config)
- Font Awesome 6.4.2 (for the theme toggle icons and social icons)
- MDB UI Kit 6.4.0 (Material Design components al-folio uses)

## How it was built

1. **CSS**: al-folio's SCSS files (`_sass/_themes.scss`, `_layout.scss`, `_navbar.scss`, `_publications.scss`, etc.) were compiled with Dart Sass into `assets/css/main.css`. The MIT copyright notice is preserved at the top of the file as required by the license.
2. **HTML**: The Liquid templates (`_layouts/about.liquid`, `_layouts/default.liquid`, `_includes/header.liquid`, `_includes/footer.liquid`) were rendered statically with my content baked in. The class structure is identical to what al-folio's Jekyll output would produce — `.navbar.navbar-light.navbar-expand-sm.sticky-top`, `.post-header`, `.post-title`, `.profile.float-right`, `.publications ol.bibliography`, etc.
3. **JS**: al-folio's `theme.js` was simplified to keep only the light/dark/system toggle logic (removing Mermaid, Plotly, ECharts, Vega-Lite, MathJax, search, calendar integration, etc. that aren't used here).

## Deploying to GitHub Pages

1. Create or use repo `<your-username>.github.io`.
2. Drop these files at the repo root.
3. Repo Settings → Pages → deploy from `main` branch root.
4. Done.

## Customization

- **Theme color**: al-folio's `--global-theme-color` is `#b509ac` (purple) in light mode and `#2698ba` (cyan) in dark mode. Change them in `assets/css/main.css` (search for `--global-theme-color`).
- **Max content width**: hardcoded to `930px` (al-folio's default). Search `max-width: 930px` in `main.css`.
- **Profile photo**: replace `assets/img/prof_pic.jpg`. Square images render best (it's masked into a circle).
- **Address block**: edit the `.more-info` `<p>` inside `index.html` to update the office address shown next to the photo.

## License

The compiled CSS in `assets/css/main.css` and the JS in `assets/js/theme.js` derive from al-folio, which is © 2025 Maruan Al-Shedivat under the MIT License. The MIT copyright notice is preserved at the top of `main.css`. See https://github.com/alshedivat/al-folio for the original source.

Your content (bio, publications text, project descriptions) is yours.
