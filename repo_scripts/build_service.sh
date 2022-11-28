#!/usr/bin/env bash
set -e

cd "$(dirname $0)/.."

npm i -g pnpm@latest
echo "pnpm version: $(pnpm -v)"
pnpm i


# basic CI checks
node_modules/.bin/eslint --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1

pnpm run --filter $1 build 
