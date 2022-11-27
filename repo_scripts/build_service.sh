#!/usr/bin/env bash
set -uex
pnpm -v

npx pnpm@latest -v
pnpm i -D --frozen-lockfile --prefer-offline --ignore-scripts
dotenv -- pnpm run --filter $1 build 
