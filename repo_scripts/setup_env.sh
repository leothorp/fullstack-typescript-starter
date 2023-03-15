#!/usr/bin/env bash

# cd to project's root directory
cd ..

# Copy contents of .env.*.example files to new .env.*.local files

cat .env.server.example > .env.server.local
cat .env.shared.example > .env.shared.local

# Generate a random secret for JWT
jwt_secret=$(openssl rand -hex 64)

# Replace the JWT secret in the .env.server.local file
sed -i '' -e "s/insert-secret-here/$jwt_secret/g" .env.server.local

# Install dependencies
pnpm i

# Optional: delete this file when the actions are completed to avoid potentially overwriting the .env files and jwt_secret later
# rm repo_scripts/setup_env.sh
