#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"


pnpm i --frozen-lockfile --ignore-scripts

node_modules/.bin/dotenv -- pnpm run --filter $1 build 
