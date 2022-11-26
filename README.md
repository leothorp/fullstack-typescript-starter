# fullstack-typescript-starter

Project boilerplate for a full-stack TypeScript web application. Technology choices are aimed at maximizing productivity without compromising flexibility.

Features:

*   Configuration and scripts for both local dev and production use
*   Monorepo support
*   user accounts/authentication via Google Sign In
*   bare-bones Login and Registration pages

### Technologies

*   Prettier
*   TypeScript
*   React
*   TailwindCSS / headlessui.dev
*   Zustand
*   react-query
*   react-router
*   Fastify
*   MikroORM
*   pnpm
*   Zod

Scripts

Automated  
* post-merge git hook to auto-reinstall npm packages when package-lock.json changes  
* pre-commit formatting/linting hook

Manual:  
* dev start (both FE and BE)  
* prod build  
* prod start  
* deploy to render

Prior art/projects to check:

*   trpc boilerplates/templates from create-trpc-appx
*   microtask fullstack

# Starting a new project with this template

Complete the form here: https://github.com/leothorp/fullstack-ts-app-starter/generate (alternatively, click "Use This Template" in the Github UI).

# Planned additions / Misc. TODOs

*   hygen template for bulk customizing/renaming after clone (may need a new hygen.js function, like these examples: https://github.com/jondot/hygen/issues/106)
*   better docs/explanations, project technologies list
*   more npm scripts/other repo scripts
*   deploy scripts/render.yml for Render
*   links to library documentation in README
*   Jest / Playwright tests
*   Rationale section with more details on reasons for technology choices
*   admin interface/react-admin
*   Dockerfile
*   local dev sync to running dockerfile
*   scripts for DB access
*   logging library (Pico from Fastify?)
