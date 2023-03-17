#!/usr/bin/env bash

# change directory to the project's root, one-level up from the current directory
cd $(dirname "$0")/..
if [[ -f .env.server.local ]] || [[ -f .env.shared.local ]]; then
  echo "Error: local env files already exist."
  exit 1
fi
# Copy contents of .env.*.example files to new .env.*.local files

cat .env.server.example > .env.server.local
cat .env.shared.example > .env.shared.local

# Generate a random secret for JWT
jwt_secret=$(openssl rand -hex 64)

# Replace the JWT secret in the .env.server.local file
sed -i '' -e "s/insert-secret-here/$jwt_secret/g" .env.server.local

# Install dependencies
pnpm i

