#!/usr/bin/env bash
set -euo pipefail

BRANCH="project-dashboard-feature"
BASE="main"

git fetch origin --prune

if ! git ls-remote --exit-code origin "refs/heads/$BRANCH" >/dev/null 2>&1; then
  echo "✅ Remote branch '$BRANCH' does not exist. Nothing to delete."
  exit 0
fi

echo "Comparing origin/$BASE vs origin/$BRANCH ..."

UNIQUE=$(git log --oneline "origin/$BASE..origin/$BRANCH" || true)

if [ -n "$UNIQUE" ]; then
  echo "❌ Branch '$BRANCH' has commits not in '$BASE':"
  echo "$UNIQUE"
  echo "ABORTING delete. Merge or cherry-pick these into '$BASE' first."
  exit 2
fi

echo "✅ No unique commits on '$BRANCH' relative to '$BASE'. Safe to delete."
