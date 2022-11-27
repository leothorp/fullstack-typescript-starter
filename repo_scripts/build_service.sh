#!/usr/bin/env bash
set -e
echo "pnpm version: $(pnpm -v)"

cd "$(dirname $0)/.."


# basic CI checks (skip for now)
# pnpx eslint@latest --no-error-on-unmatched-pattern --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx services/$1
# cd services/$1 && tsc --noEmit

# certain scripts in devDependencies needed for the build process
NODE_ENV=development pnpm i --frozen-lockfile --ignore-scripts


pnpm run --filter $1 build 
