#!/usr/bin/env bash
set -uex
echo "pnpm version: $(pnpm -v)"
pnpm i -D --frozen-lockfile --prefer-offline --ignore-scripts
dotenv -- pnpm run --filter $1 build 
