# fullstack-ts-app-starter

Project boilerplate for a full-stack TypeScript web application.

Features:

*   user accounts/authentication via Google Sign In
*   bare-bones Login and Registration pages

Included Technologies:

*   trpc
*   Fastify
*   MikroORM
*   Prettier
*   React
*   TailwindCSS / headlessui.dev
*   Zustand
*   react-query
*   react-router (suppose we can use 6)

Scripts:  
Automatic:  
post-merge git hook to auto-reinstall npm packages when package-lock.json changes  
pre-commit formatting/linting hook

Manual:  
dev start (both FE and BE)  
prod build  
prod start  
deploy to render

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
