#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"

cd "$(dirname $0)/.."


# basic CI (skip for now)
pnpx eslint@latest --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1
cd services/$1 && tsc --noEmit

pnpm i --frozen-lockfile


pnpm run --filter $1 build 
