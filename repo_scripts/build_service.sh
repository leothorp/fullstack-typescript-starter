#!/usr/bin/env bash
set -uex
echo "pnpm version: $(pnpm -v)"
pwd
cd "$(dirname $0)/.."

pnpm i -D --frozen-lockfile --prefer-offline --ignore-scripts
node_modules/.bin/dotenv -- pnpm run --filter $1 build 
