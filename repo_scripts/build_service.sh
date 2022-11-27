#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"


# basic CI checks (skip for now)
# pnpx eslint@latest --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1


pnpm i --frozen-lockfile --ignore-scripts

node_modules/.bin/dotenv -- pnpm run --filter $1 build 
