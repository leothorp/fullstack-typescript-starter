# fullstack-typescript-starter

Project boilerplate for a full-stack TypeScript monorepo.

Features:

- configured for production deployment of frontend, backend, and Postgres DB on Render (see `render.yaml`)
- cross-package import path aliases, with VSCode auto-import
  - example: from a file the `client` package, `import {Button} from "@ui/Button"` is equivalent to `import {Button} from "../../../packages/ui/src/Button"`.
- user accounts/authentication via Google Sign In, with bare-bones login/registration UI

### Technologies

- Prettier
- TypeScript
- React
- TailwindCSS / headlessui.dev
- Zustand
- react-query
- react-router
- Fastify
- Prisma
- pnpm
- Zod

Scripts

Automated

- post-merge git hook to auto-reinstall npm packages when package-lock.json changes
- pre-commit formatting/linting hook

Manual:

- dev start (both FE and BE)
- prod build
- prod start
- deploy to render

Prior art/projects to check:

- trpc boilerplates/templates from create-trpc-appx
- microtask fullstack

# Starting a new project from this template

click "Use This Template" near the top of this repo's Github page.

# Render deploy steps

1. replace values in render.yaml with the desired service names, env var. group names, etc.

# Planned additions / Misc. TODOs

- hygen template for bulk customizing/renaming after clone (may need a new hygen.js function, like these examples: https://github.com/jondot/hygen/issues/106)
- better docs/explanations, project technologies list
- more npm scripts/other repo scripts
- deploy scripts/render.yml for Render
- links to library documentation in README
- Jest / Playwright tests
- Rationale section with more details on reasons for technology choices
- admin interface/react-admin
- Dockerfile
- local dev sync to running dockerfile
- scripts for DB access
- logging library (Pico from Fastify?)
- hosted demo of baseline features
- storybook
