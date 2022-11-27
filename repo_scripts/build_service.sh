#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"
pwd
cd "$(dirname $0)/.."
pwd 
ls -a
pnpm i --frozen-lockfile --prefer-offline --ignore-scripts
ls -a
node_modules/.bin/dotenv -- pnpm run --filter $1 build 
