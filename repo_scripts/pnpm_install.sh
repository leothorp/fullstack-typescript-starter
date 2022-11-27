#!/usr/bin/env bash
set -uex
pnpm -F $1 i --frozen-lockfile --prefer-offline
