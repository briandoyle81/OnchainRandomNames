#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./ignition-deploy-retry.sh --network <network-name> --deploy-script <path/to/OnchainModule.ts>

Options:
  --skip-verify        Do not pass `--verify` to hardhat ignition deploy
  --sleep-seconds <n> Sleep seconds between retries when the error contains: "The next nonce"

Environment variables:
  LOG_FILE            Log file to write (default: ignition_deploy_retry.log)
  SLEEP_SECONDS      Sleep seconds between retries (default: 2)
EOF
}

NETWORK=""
DEPLOY_SCRIPT=""
VERIFY=1
SLEEP_SECONDS_DEFAULT="2"

LOG_FILE="${LOG_FILE:-ignition_deploy_retry.log}"
SLEEP_SECONDS="${SLEEP_SECONDS:-$SLEEP_SECONDS_DEFAULT}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --network)
      NETWORK="${2:-}"
      shift 2
      ;;
    --deploy-script)
      DEPLOY_SCRIPT="${2:-}"
      shift 2
      ;;
    --skip-verify)
      VERIFY=0
      shift 1
      ;;
    --sleep-seconds)
      SLEEP_SECONDS="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -z "$NETWORK" || -z "$DEPLOY_SCRIPT" ]]; then
  usage >&2
  exit 2
fi

CMD=(npx hardhat ignition deploy "$DEPLOY_SCRIPT" --network "$NETWORK")
if [[ "$VERIFY" -eq 1 ]]; then
  CMD+=(--verify)
fi

while true; do
  : > "$LOG_FILE"
  echo "--- retry $(date) ---"

  # Run and stream output to log; capture the deploy command exit code from bash's PIPESTATUS.
  set +e
  "${CMD[@]}" 2>&1 | tee "$LOG_FILE"
  ec="${PIPESTATUS[0]}"
  set -e

  if [[ "$ec" -eq 0 ]]; then
    echo "SUCCESS"
    exit 0
  fi

  # Retry only when the error indicates a nonce mismatch.
  python3 -c 'import pathlib,sys; s=pathlib.Path("'"$LOG_FILE"'").read_text(errors="ignore"); sys.exit(0 if "The next nonce" in s else 1)'
  if [[ $? -eq 0 ]]; then
    echo "Retrying due to nonce mismatch..."
    sleep "$SLEEP_SECONDS"
    continue
  fi

  echo "Stopping due to non-nonce error (exit code: $ec)"
  exit "$ec"
done

