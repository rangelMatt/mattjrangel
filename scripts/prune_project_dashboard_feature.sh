#!/usr/bin/env bash
set -euo pipefail

BRANCH="project-dashboard-feature"
BASE="main"

git fetch origin --prune

# Safety check
UNIQUE=$(git log --oneline "origin/$BASE..origin/$BRANCH" 2>/dev/null || true)

if [ -n "${UNIQUE:-}" ]; then
  echo "❌ '$BRANCH' has commits not in '$BASE':"
  echo "$UNIQUE"
  echo "ABORT. Merge/cherry-pick into '$BASE' before pruning."
  exit 2
fi

# Delete remote if exists
if git ls-remote --exit-code origin "refs/heads/$BRANCH" >/dev/null 2>&1; then
  echo "Deleting remote branch origin/$BRANCH ..."
  git push origin --delete "$BRANCH"
else
  echo "Remote branch '$BRANCH' already gone."
fi

# Delete local if exists
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "Deleting local branch $BRANCH ..."
  git branch -D "$BRANCH"
else
  echo "Local branch '$BRANCH' already gone."
fi

# Prune stale remotes
git remote prune origin || true

echo "✅ Prune complete."
