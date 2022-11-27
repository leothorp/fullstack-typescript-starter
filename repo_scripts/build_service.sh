#!/usr/bin/env bash
set -uex
pnpm -v
npx pnpm@latest -v
npx pnpm@latest i --frozen-lockfile --prefer-offline --filter $1
npx pnpm@latest exec dotenv -- npx pnpm@latest run build --filter $1
