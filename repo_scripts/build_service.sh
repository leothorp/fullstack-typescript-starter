#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"

cd "$(dirname $0)/.."


pnpm i --frozen-lockfile


# basic CI checks
pnpx eslint --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1
cd services/$1 && ../../node_modules/.bin/tsc --noEmit 

cd "$(dirname $0)/.."
pnpm run --filter $1 build 
