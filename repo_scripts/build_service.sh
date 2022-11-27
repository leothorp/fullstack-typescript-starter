#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"

ls -a
pnpm i --frozen-lockfile -P -D --ignore-scripts
ls -a
node_modules/.bin/dotenv -- pnpm run --filter $1 build 
