#!/usr/bin/env bash
set -e
# modify prisma.schema, then:
../../node_modules/.bin/dotenv -e ../../.env.server.local -- pnpx prisma migrate dev
