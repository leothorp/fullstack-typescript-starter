#!/usr/bin/env bash
set -uex
pnpm -v

npx pnpm@latest -v
pnpm i --frozen-lockfile --prefer-offline
pnpm exec dotenv -- pnpm run build --filter $1
