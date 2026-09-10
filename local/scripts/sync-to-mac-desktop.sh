#!/usr/bin/env bash
# Run this script ON YOUR MAC (Terminal) to copy all MDA691 files to ~/Desktop.
# Usage:
#   cd ~/Desktop
#   git clone https://github.com/Amit-shrestha63/MDA691-ThoughtLog-Dashboard.git MDA691_Local
#   cd MDA691_Local
#   git checkout cursor/ieee-citations-report-41f2   # or main after merge
#   bash local/scripts/sync-to-mac-desktop.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DESKTOP="${HOME}/Desktop"
TARGET="${DESKTOP}/MDA691_Local"

echo "==> MDA691 local sync"
echo "    Repo:   ${REPO_ROOT}"
echo "    Target: ${TARGET}"

mkdir -p "${TARGET}/reports" "${TARGET}/diagrams" "${TARGET}/ThoughtLog_Dashboard"

copy_if_exists() {
  local src="$1" dst="$2"
  if [[ -f "${src}" ]]; then
    cp -f "${src}" "${dst}"
    echo "    copied $(basename "${src}")"
  else
    echo "    SKIP missing: ${src}"
  fi
}

# Reports
copy_if_exists "${REPO_ROOT}/local/reports/MDA691_Assignment2_Group_Report_SUBMISSION.docx" \
  "${TARGET}/reports/"
copy_if_exists "${REPO_ROOT}/local/reports/MDA691_Assignment2_Individual_Report_Amit_Shrestha.docx" \
  "${TARGET}/reports/"

# Also copy from repo root if local/ copies missing
copy_if_exists "${REPO_ROOT}/MDA691_Assignment2_Group_Report_SUBMISSION.docx" \
  "${TARGET}/reports/" 2>/dev/null || true
copy_if_exists "${REPO_ROOT}/MDA691_Assignment2_Individual_Report_Amit_Shrestha.docx" \
  "${TARGET}/reports/" 2>/dev/null || true

# Diagrams
for f in MDA691_Project_Architecture_Plan.png \
         MDA691_PdM_Block_Diagram_37in1_Sensors.png \
         MDA691_Figure1_Block_Diagram_Assignment.png; do
  copy_if_exists "${REPO_ROOT}/local/diagrams/${f}" "${TARGET}/diagrams/"
  copy_if_exists "${REPO_ROOT}/${f}" "${TARGET}/diagrams/"
done

# Thought Log dashboard (open index.html in browser)
copy_if_exists "${REPO_ROOT}/index.html" "${TARGET}/ThoughtLog_Dashboard/"
copy_if_exists "${REPO_ROOT}/app.js" "${TARGET}/ThoughtLog_Dashboard/"
copy_if_exists "${REPO_ROOT}/styles.css" "${TARGET}/ThoughtLog_Dashboard/"
copy_if_exists "${REPO_ROOT}/README.md" "${TARGET}/ThoughtLog_Dashboard/"

# Manifest
copy_if_exists "${REPO_ROOT}/local/MANIFEST.json" "${TARGET}/"

echo ""
echo "Done. Files are on your Mac Desktop:"
echo "  ${TARGET}/reports/"
echo "  ${TARGET}/diagrams/"
echo "  ${TARGET}/ThoughtLog_Dashboard/"
echo ""
echo "Open dashboard: open ${TARGET}/ThoughtLog_Dashboard/index.html"
