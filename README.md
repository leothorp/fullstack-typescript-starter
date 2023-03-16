# fullstack-typescript-starter

Project boilerplate for a full-stack TypeScript monorepo.

## Features

- End-to-end technology choices and configuration for a typical CRUD app, aimed at maximizing iteration speed and developer experience. The repo implements a bare-bones note-taking app to give some examples for common patterns (UI state, DB interactions, API calls, etc).

- Infrastructure-as-Code config for deployment of frontend, backend, and Postgres DB on [Render](https://render.com) (see `render.yaml`). Demo deployment with this configuration here: https://fullstack-ts-client.onrender.com (the free-tier server will be slow to respond on the initial request.)

- Basic user account functionality. Authentication via Google Sign In, authorization against the API via JSON web tokens. Note that while the included implementation of JWT authorization here may be a technically functional starting point, it has not been audited rigorously for security issues, and isn't intended for production use as-is. Use at your own risk.

- Scripts for common dev workflows. (See the "Dev Scripts" section below.)

## Starting a project with this template

Click "Use This Template" near the top of this repo's Github page to create your own copy. Continue from there with the "Local Development Setup" section below.

## Technologies Used

Selection rationale and documentation links for the key technologies are below. In general, the goal here is to optimize for development speed- with rock-solid stability or scalabilty being secondary (though not completely abandoned) as priorities.

- [TypeScript](https://www.typescriptlang.org/docs/)

- [React](https://reactjs.org/)

- [React Router](https://v5.reactrouter.com/)
  Client-side routing. Note that this is the only library in the project that intentionally uses an older version (v5, rather than the current v6). V6 brings many radical API changes, while ditching a number of useful features present in earlier versions- straightforward manipulation of browser history from outside of the React component tree being one example. The implementation of Sign In With Google here currently relies on that feature. [Tanstack Router](https://tanstack.com/router/v1) is a promising alternative for the future- at present, it's still in a beta version and documentation is very sparse.

- [pnpm](https://github.com/pnpm/pnpm)
  Package management. Significantly faster drop-in replacement for npm, with better monorepo support. Recommend `alias pn="pnpm"` to avoid the typing speed tax.

- [TailwindCSS](https://tailwindcss.com/)
  Styling. Significantly improved dev. speed (in my opinion) and moderately improved performance over many other solutions, and has seen a lot of consolidation of usage in the React community.

- [headlessui.dev](https://headlessui.com/)
  Headless/accessible React component library integrated with Tailwind.

- [Flowbite](https://flowbite-react.com/)
  Collection of prestyled Tailwind components, useful for prototyping (essentially Bootstrap for Tailwind.)

- [Zustand](https://github.com/pmndrs/zustand)
  Frontend state management. Much more lightweight and quick to develop with than Redux/Redux Toolkit, and has recently gained a lot more traction.

- [tRPC](https://trpc.io/)
  API layer functionality, shared request/response typing across client and server. Theoretically tRPC can enable faster development speed by streamlining a lot of the typical API boilerplate. In my experience so far, this is partially offset by a lack of clear documentation or examples for some use cases. Still, past the initial learning curve it's been a promising choice for rapid iteration/prototyping.

- [react-query](https://tanstack.com/query/v4)
  Client-side API calls. Response caching and coordination of refetches, integration with loading/error UI states. Included as part of tRPC.

- [Express](https://github.com/expressjs/express)
  API server. Fastify would be the trendier (and more performant) modern choice, but maturity/documentation still felt lacking in some areas compared with Express.

- [Prisma](https://www.prisma.io)
  DB schema definition, queries, migrations. Streamlined DX (particularly around schema updates/auto-generation of migrations); one of the better JS ORM options I've seen for quick prototyping. The performance at higher scale is an open question.

- [PostgreSQL](https://www.postgresql.org)
  Database. A classic.

- [react-hook-form](https://react-hook-form.com)
  Forms. Better performance, DX, and support than Formik. react-hook-form seems to be becoming the new standard React form lib. Still some gaps/wonky behavior around complex validation scenarios (but that seems to be the case with every form library.)

- [Zod](https://github.com/colinhacks/zod)
  API request/response validation, form validation. Good Typescript integration, integrates with tRPC, and has gained a lot of traction recently- appears to be becoming the new Yup/Joi.

- [Render](https://render.com)
  Low-config, PAAS cloud hosting platform. Very straightforward / quick to get a multi-service deployment up and running, with zero infra or devops knowledge required. The included `render.yaml` is in their Infrastructure-As-Code format, and has most of the config you'd need to deploy these services. Docs/specification for `render.yaml`: https://render.com/docs/blueprint-spec

## Project Structure

This template uses a monorepo structure intended to support sharing code and configuration across multiple apps/services.

The `services` directory contains independently deployable units. Currently:

- a frontend client (`services/client`)
- a backend API service (`services/server`)

The `packages` directory is used for shared internal libraries/configuration. Currently:

- baseline for per-package eslint config (`packages/eslint-config-shared`)
- baseline for per-package TypeScript config (`packages/tsconfig`)
- UI component library (`packages/ui`)
- shared utility functions and constants (`packages/utilities`)

Note that the tsconfig files include cross-package import path aliases, which are configured to work with VSCode auto-import.

Example import from within a file in `services/client`:
`import {Button} from "@ui/Button"` would be functionally equivalent to
`import {Button} from "../../../packages/ui/src/Button"`.

## Local Development

### Prerequisites

1. install Nodejs / npm.

2. Install pnpm globally:
   `npm i -g pnpm@latest`

3. Install Docker/docker-compose (used for the dev database). Mac installation: https://docs.docker.com/desktop/install/mac-install/

### Initial Project Setup

1. If you haven't already, follow the `Starting a project with this template` section above. Clone down your newly created repo. Depending on the desired license for your project, remove or replace `LICENSE.md` and all references in the project to the MIT License (package.json entries for `"license": "MIT"`) as needed.

2. As desired for your project, find and replace all strings/names in code that have the prefix `fullstack-ts` or `fullstack_ts` (many of these are in `render.yaml`).

3. **_(Optional):_** Install recommended VSCode extensions from `.vscode/extensions.json`. VSCode will usually prompt you to do this when first opening the project.

4. At project root:
   `chmod +x repo_scripts/setup_env.sh; repo_scripts/setup_env.sh`
   Executing this shell script will do the following:
     - Create two new `.env*` files `env.server.local` and `env.shared.local` with all values specified in the respective `*.example` env files (`.env.server.example` and `.env.shared.example`). The example values will work as-is with the initial template for most of the values, except for those noted by comments in the example files.
     - Generate a jwt_secret using `openssl rand -hex64` and assign it to `JWT_TOKEN` in `env.server.local`
     - **_(Optional):_** The script will delete itself when finished if you uncomment the line `rm repo_scripts/setup_env.sh` which safeguards you from executing the file later on and potentially losing changes.

5. At project root:
   `pnpm run start:dev`

This will start the dev database and apply any pending migrations, followed by starting up the client and server locally. Open http://localhost:3000, and click "Login with Google". After logging in, try filling in and submitting the "New Note" form. If it works, you're all set! Remove anything you don't want and continue developing your app.

## Deployment

The included `render.yaml` file contains much of the configuration needed to deploy a project from this template on [Render](https://render.com). These are the remaining steps.

1. If not completed already, do Step #2 (renaming values for your project) from the Local Development Setup section above.

   Note that the `name` field for services with `type: web` will determine the generated `render.com` domain for the service (example: `name: fullstack-ts-client` results in `fullstack-ts-client.onrender.com`).

   By default, this file will create services on the Free plan (suitable only for basic testing- the server sleeps when inactive, and the DB is wiped after 90 days). Modify the `plan: free` fields on services here as desired if you want to start with a different plan (this can also be upgraded later).

2. Make any necessary environment variable changes in the envVarGroups section of `render.yaml`. Only non-sensitive environment variables should ever have values directly added to `render.yaml` (among other reasons, because you'd check this into git.) For any environment variables marked with `sync: false` here, you'll add the values later via the Render dashboard (Step 6). Note that the default env var group in this template will be accessible by both the `client` and `server` services, so you should only include values you want shared with both here.

This is also a good time to modify any other desired IAC config for your services. Documentation for all other fields available in `render.yaml` is here: https://render.com/docs/blueprint-spec.

3. Push your project to Github or Gitlab.

4. Log into (or create) an account on Render at https://dashboard.render.com, and connect it in the account settings to the relevant Github/Gitlab account (if you didn't use that to create your Render account initially).

5. Go to the [Blueprints section](https://dashboard.render.com/blueprints). Click "New Blueprint Instance". Select the Github/Gitlab repo for your project from the list.

6. Modify "Service Group Name" and "Branch" as desired, and click "Apply" to create all services and `envVarGroups` specified in your `render.yaml`.

7. Go to the [Env Groups](https://dashboard.render.com/env-groups) section on Render. Select the one you just created. Add your production value for `GOOGLE_CLIENT_ID` here.

8. Navigate to your `server` (or equivalent) service in the Render dashboard, and go to the Environment settings. Add your production value for `JWT_SECRET` here.

Assuming the initial deploys for all services were successful, your deployment is complete! Visit the `*.onrender.com` url for your client service to check it out. Future modifications to `render.yaml` will be applied to services automatically on push (this can be configured).

## Connecting to the Deployed DB Instance

1. Get your computer's IP with `curl ifconfig.me`.
2. Add the IP as an allowed source in the Access Control section of the Render dashboard for your database (if not already present).
3. Go to the DB's page in the Render dashboard. Use the connection info given there to connect from your local machine via your preferred method (e.g., a tool like PGAdmin).

## Troubleshooting

**Problem:** the line `import { PrismaClient } from "@prisma/client";` in `queries.ts` is highlighted with an error in your editor. The error says the `@prisma/client` module cannot be found.

**Solution:** Start/restart your local dev server. If that doesn't resolve it, restart the Typescript language server. To do this in VSCode: hit Cmd + Shift + P and run the command `TypeScript: Restart TS server`.

## Dev Scripts

#### PNPM scripts

These would be run from the project root (specified in the root `package.json`.)

To run, all of these need to be prefixed by `pnpm run` (e.g., you'd run `start:dev` below as `pnpm run start:dev`).

##### `start:dev`

Spins up the development Postgres database via docker-compose and starts both the client (at http://localhost:3000) and server (at http://localhost:5000). If you get an error message about the Docker daemon not running, open Docker for Desktop and try again.

##### `build-client:prod`, `build-server:prod`, and `start-server:prod`

Prod build / startup scripts, referenced in `render.yaml`. You'd only ever run these manually if testing the prod build locally.

- Note that start-server:prod also applies any pending migrations (by calling `prisma-migrate:prod`, see below).

##### `prisma-migrate:dev`

During local dev, use this to generate a new migration in `services/server/prisma/migrations` for any changes to prisma.schema that aren't currently reflected in the database. This will also immediately apply those changes to the db.

##### `db-shell:dev`

Open a `psql` shell into the locally running dev database.

##### `prisma-reset:dev`

During local dev, use this to delete all data from the database and re-apply all migrations from scratch.

##### `prisma-init:dev`

If you have an existing local dev DB for an application that wasn't previously using Prisma,
this script will do the following:

1. introspect your existing DB schema and update prisma.schema accordingly
2. generate an 'init' migration file to represent the current state of the database, and mark it as already "applied"

##### `prisma-migrate:prod`

Used to apply pending migrations to a production (or otherwise non-local development) database. This is run automatically as part of `start-server:prod`.

##### `drop-db:dev`

Delete the local dev database Docker container and its associated volume / all data within it.
The next time `pnpm run start:dev` (or just `docker-compose up`) is run, it will be created as an empty db. `pnpm run migrate:dev` could then be used to reapply all migrations.

##### `reset-node-modules`

Delete and reinstall all node_modules. Useful if debugging dependency issues.

#### Git hooks

##### post-merge (runs after `git pull` or `git merge`):

Reinstall node_modules packages whenenever changes to pnpm-lock.yaml are detected in the latest merge.

##### pre-commit (blocks completion of `git commit` on failure):

Format and lint all staged files (Prettier, Eslint). Use `git commit --no-verify` to skip this check if needed. In place of `lint-staged`, this uses a faster custom script.

## Future additions / TODOs

- finish configuring/documenting Playwright e2e tests
- admin interface/react-admin integration
- consider running `server` via Dockerfile (potentially in local dev as well)
- scripts for DB shell access
- server/client logging configuration (Pico is one candidate)
- Hygen template for bulk customizing/renaming after clone (may need a new hygen.js function, like these examples: https://github.com/jondot/hygen/issues/106)
- Hygen generators for routes, entities, etc. (possibly look to RedwoodJS generators as prior art)
- Storybook
