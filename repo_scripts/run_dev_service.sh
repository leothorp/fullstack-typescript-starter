#!/usr/bin/env bash
set -e
cd "$(dirname $0)/.."

dotenv -e .env.shared.local -e .env.server.server -- tsx watch src
