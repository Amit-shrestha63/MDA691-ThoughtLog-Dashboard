# MDA691 — Local setup on your Mac

Cloud Agent sessions cannot write to your Mac Desktop. Use this guide to keep **everything local**.

## One-time setup (Mac Terminal)

```bash
cd ~/Desktop
git clone https://github.com/Amit-shrestha63/MDA691-ThoughtLog-Dashboard.git MDA691_Local
cd MDA691_Local
git checkout cursor/ieee-citations-report-41f2
bash local/scripts/sync-to-mac-desktop.sh
```

After this, your Desktop folder looks like:

```
~/Desktop/MDA691_Local/
├── reports/
│   ├── MDA691_Assignment2_Group_Report_SUBMISSION.docx
│   └── MDA691_Assignment2_Individual_Report_Amit_Shrestha.docx
├── diagrams/
│   ├── MDA691_Project_Architecture_Plan.png
│   ├── MDA691_PdM_Block_Diagram_37in1_Sensors.png
│   └── MDA691_Figure1_Block_Diagram_Assignment.png
├── ThoughtLog_Dashboard/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── MANIFEST.json
```

## Open Thought Log dashboard locally

```bash
open ~/Desktop/MDA691_Local/ThoughtLog_Dashboard/index.html
```

## Update after Cloud Agent changes

```bash
cd ~/Desktop/MDA691_Local
git pull
bash local/scripts/sync-to-mac-desktop.sh
```

## Work fully local in Cursor (recommended)

1. **File → Open Folder** → `~/Desktop/MDA691_Local`
2. Use **local Cursor chat** (not Cloud Agent) so files save directly on your Mac
3. Edit reports/diagrams in that folder

## Files not in this repo (keep on Desktop if you have them)

- `MDA691_Assignment2_Appendix_II_Literature.docx`
- `692_Agentic_AI_PdM_FIXED.pod` (ProjectLibre)
- `MDA691_ProjectLibre_Screenshots/`
- `MDA691_Prototype_Evidence/`

Copy those into `~/Desktop/MDA691_Local/` manually so one folder holds the full submission pack.

## Moodle submission checklist

| File | Location after sync |
|------|---------------------|
| Group report | `reports/MDA691_Assignment2_Group_Report_SUBMISSION.docx` |
| Individual report (Amit) | `reports/MDA691_Assignment2_Individual_Report_Amit_Shrestha.docx` |
| Appendix II literature | Add manually to `reports/` |
| ProjectLibre `.pod` | Add manually |
