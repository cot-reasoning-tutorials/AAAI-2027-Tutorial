# AAAI-27 Tutorial — Chain-of-Thought Reasoning in Large Language Models

Website for the AAAI-27 tutorial **“Chain-of-Thought Reasoning in Large Language Models:
Recent Advances and New Frontiers”** (Libo Qin, Hao Fei, Zhuosheng Zhang, Liangming Pan,
Yafu Li, Min Zhang).

Static site built with plain HTML, CSS, and JavaScript. No build step, no dependencies —
GitHub Pages can serve it directly.

Design references: [LMM evaluation tutorial (CVPR 2025)](https://lmm-understand.github.io/) and
[Current Advances in LLM Reasoning (ACL 2026)](https://llmreasoning.github.io/acl2026/).

## Preview locally

Either double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Publish with GitHub Pages

1. Commit and push these files to `main`.
2. In the repository: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**; Branch: **main**; Folder: **/ (root)**; Save.
4. The site will appear at
   `https://cot-reasoning-tutorials.github.io/AAAI-2027-Tutorial/`.

## What still needs updating

The page content now follows the tutorial proposal. The remaining placeholders are
things that are only known closer to the conference.

| Item | Where in `index.html` | What to change |
| --- | --- | --- |
| Tutorial day, clock times, room | `.hero-meta` | Add the confirmed AAAI-27 slot |
| Contact email | footer `mailto:` | Currently `qinlibo@hit.edu.cn` |

### Speaker photos

Portraits are in `assets/people/` (400×400, face-centered crops):

| Speaker | Source |
| --- | --- |
| Libo Qin, Hao Fei, Zhuosheng Zhang | Photos supplied in `AAAI信息.docx` |
| Liangming Pan | [liangmingpan.bio](https://liangmingpan.bio/) |
| Yafu Li | [yafuly.github.io](https://yafuly.github.io/) |
| Min Zhang | [homepage.hit.edu.cn/MinZhang](https://homepage.hit.edu.cn/MinZhang) |

To replace a photo, keep the same file name or update the `src` in the corresponding
`.speaker` card. A square crop works best; the CSS clips it into a circle.

### Internal files are git-ignored

`main.pdf` and `AAAI信息.docx` contain personal contact details and are listed in
`.gitignore`, so they will not be published. Keep them local. Delete those two lines in
`.gitignore` only if you have checked that the files are safe to make public.

## File structure

```
index.html          — all page content
style.css           — design tokens, layout, light/dark themes
main.js             — theme toggle, mobile nav, scroll effects, copy button
assets/favicon.svg  — tab icon
assets/preview.png  — 1200×630 social preview image (Open Graph)
assets/program-outline.png — tutorial outline figure (Figure 1)
assets/logos/       — institution logos for the affiliation strip
assets/people/      — speaker portraits
```

## Design notes

- **Light / dark theme** follows the system preference and can be toggled; the choice is
  remembered in `localStorage`.
- **Centered layout** throughout: headings, prose, and grids are centered on the page;
  the Schedule section presents the sessions as a table modeled on the reference site.
- **Responsive** down to 360 px: the navigation collapses into a menu and every section
  stacks cleanly.
- **Accessibility**: skip link, visible focus rings, semantic landmarks, and
  `prefers-reduced-motion` support.
- Colors are defined once as CSS variables at the top of `style.css`; changing the
  `--accent` values re-themes the entire site.
