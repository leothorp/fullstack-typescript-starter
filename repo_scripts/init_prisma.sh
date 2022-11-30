#!/usr/bin/env bash
set -e

# This script generates a Prisma schema file from an existing db.
# steps from https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgres

# revert
# cd services/server

pnpx prisma migrate diff --from-empty --to-schema-datamodel services/server/prisma/schema.prisma --script > test2.sql
# revert
# pnpm run prisma-cli init
# pnpm run prisma-cli db pull


# generate initial migration file, mark it as applied


# revert
# mkdir -p ./prisma/migrations
# pnpm run prisma-migrate:dev
# pnpm run prisma-cli migrate resolve --applied {name_of_init_migration}

# gen timestamp for new migration directory name:
# date -u "+%Y%m%d%H%M%S"



# ***** 
# incorrect instructions from Prisma docs below-
# these result in a non-timestamped "init" migration that gets skipped on subsequent re-runs from a reset db.
# *****

# pnpx -- prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --to-migrations ./prisma/migrations

# mark init migration as applied:
# ../../node_modules/.bin/dotenv -e ../../.env.server.local pnpx -- prisma migrate resolve --applied init
