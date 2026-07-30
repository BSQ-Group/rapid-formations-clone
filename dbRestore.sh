#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: $0 push|pull" >&2
  echo "  push — mongodump LOCAL_MONGODB_URI → mongorestore REMOTE_MONGODB_URI (--drop)" >&2
  echo "  pull — mongodump REMOTE_MONGODB_URI → mongorestore LOCAL_MONGODB_URI (--drop)" >&2
  exit 1
}

case "${1:-}" in
  push)
    SOURCE_URI="${LOCAL_MONGODB_URI}"
    TARGET_URI="${REMOTE_MONGODB_URI}"
    ;;
  pull)
    SOURCE_URI="${REMOTE_MONGODB_URI}"
    TARGET_URI="${LOCAL_MONGODB_URI}"
    ;;
  *)
    usage
    ;;
esac

mongodump --uri="${SOURCE_URI}" --out=./dump

DUMP_DB="$(find ./dump -mindepth 1 -maxdepth 1 -type d | head -n 1)"
if [ -z "${DUMP_DB}" ]; then
  echo "mongodump produced no database directory under ./dump" >&2
  exit 1
fi

mongorestore --uri="${TARGET_URI}" --drop "${DUMP_DB}"
rm -rf ./dump
