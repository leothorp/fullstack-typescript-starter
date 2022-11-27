#!/usr/bin/env bash
set -e

# generate Prisma schema from existing db.
# steps from https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgres

cd services/server
pnpx prisma init
../../node_modules/.bin/dotenv -e ../../.env.server.local -- pnpx prisma db pull


# to generate initial migration:
mkdir -p ./prisma/migrations
# pnpx -- prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --to-migrations ./prisma/migrations

# mark init migration as applied:
# ../../node_modules/.bin/dotenv -e ../../.env.server.local pnpx -- prisma migrate resolve --applied init
