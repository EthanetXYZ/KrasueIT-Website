# Walkthrough & Deployment Guide - Krause IT

We have successfully built a clean, premium, and SEO-optimized marketing website for **Krause IT** using Astro. The site is structured to prioritize strategic IT consulting for schools and businesses, keeping secondary services visually quieter.

---

## Technical Accomplishments

1. **Clean Astro Project**: Scaffolding complete with Git repository initialization, minimal packages, and development scripts configured.
2. **Flexible Content Collections (V5/V6 Loader)**: Configured the new Astro content model using `src/content.config.ts` and the `glob` loader to query local Markdown files dynamically.
3. **Typography & Layout-led Design**: Established a cohesive design system in `src/styles/global.css` using *Outfit* (headings) and *Inter* (body text), with a Cobalt/Sapphire primary accent.
4. **CSS-Only Mobile Navigation**: Built a fully responsive header in `src/layouts/Layout.astro` that requires zero JavaScript for the mobile dropdown menu toggle, ensuring maximum performance.
5. **Netlify Form Integration**: Form fields configured in `src/pages/index.astro` using semantic markup and `data-netlify="true"` for automated Netlify submission capture.
6. **Automated Sitemap Generation**: Configured `@astrojs/sitemap` to output a sitemap on every production build.
7. **Brand Assets Integration**: Configured the site favicon to use your transparent brand icon and incorporated your transparent logo in the header and footer (with automatic contrast inversion for the dark footer).

---

## How to Run Locally

To run the project in development mode:

1. **Install dependencies** (if in a fresh clone):
   ```bash
   npm install
   ```
2. **Start the local dev server**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   Navigate to `http://localhost:4321/` to preview the site with hot-module reloading.
4. **Build the static site**:
   To test the production build locally:
   ```bash
   npm run build
   ```
   This generates static HTML files, assets, and the sitemap in the `dist/` directory.

---

## Deploying to Netlify (Git-Based Deploys)

Moving from zip uploads to Git-based deployment allows Netlify to automatically build and publish your site every time you push changes to your Git repository (e.g., GitHub, GitLab, or Bitbucket).

### Step 1: Create a Git Remote
If you haven't already, push your local repository to your preferred Git platform (e.g., GitHub):
1. Create a new repository on GitHub named `krauseit`.
2. Add the remote and push your main branch:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/krauseit.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect the Repository to Netlify
1. Log in to your [Netlify Dashboard](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select your Git provider (e.g., GitHub) and authorize Netlify.
4. Search for and select your `krauseit` repository.

### Step 3: Configure Build Settings
Netlify will automatically detect that you are using Astro and fill in the default build configuration. Verify they match:
*   **Build command**: `npm run build`
*   **Publish directory**: `dist`
*   **Base directory**: *Leave empty*

Click **Deploy site**. From now on, any push to your `main` branch will automatically trigger a new production build and deploy it live in seconds.

---

## How to Add a New Case Study

We have isolated case studies into Astro's **Content Collections**. You do not need to touch the page layout code or HTML markup to add more project entries.

To add a new case study, simply create a new Markdown file (`.md`) inside the `src/content/case-studies/` directory:

1. **Create the file**: e.g., `src/content/case-studies/cloud-migration.md`
2. **Add the required frontmatter schema**:
   ```markdown
   ---
   title: "Complete Enterprise Cloud Migration"
   client: "Greenfield Logistics"
   sector: "Logistics"
   date: "2026"
   summary: "Migrating standard local files and active systems to secure cloud directories with zero downtime."
   challenge: "Greenfield was operating off a vulnerable local NAS drive causing lag and outages for field employees."
   approach: "We audited data structures, restructured network credentials, and conducted a weekend transition to SharePoint."
   outcome: "100% remote availability, zero file conflicts, and improved document security."
   featured: true
   ---
   ```
3. **Build or run the dev server**: The homepage will dynamically detect the new file, compile its frontmatter, and render it in the **Projects in the field** section with correct styling.
