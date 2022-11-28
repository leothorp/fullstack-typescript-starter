#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"

cd "$(dirname $0)/.."


pnpm i --frozen-lockfile --filter $1


# basic CI checks
node_modules/.bin/eslint --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1

pnpm run --filter $1 build 
