# HealthLens AI

Next.js starter for an AI-powered health report assistant.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## GitHub

```bash
git init
git add .
git commit -m "Initial HealthLens AI website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Important

The current analyzer is a frontend demo. The next implementation step is the secure `/api/analyze-report` backend that accepts the report, extracts PDF/OCR content, structures results, retrieves evidence-backed information, performs safety checks, and returns a structured explanation.

Do not use an LLM-only response to diagnose patients or make treatment decisions.
