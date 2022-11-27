#!/usr/bin/env bash
set -uex

pnpm i --frozen-lockfile --prefer-offline --filter $1
pnpm exec dotenv -- pnpm run build --filter $1
