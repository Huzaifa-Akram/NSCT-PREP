# NSCS Revision Quiz (Frontend Only)

This is a frontend-only quiz app for revision records.

- Category 1: MCQ questions
- Category 2: Text-based questions
- No grading system
- You can reveal answer any time with `Show Answer`

## Run locally (important)

Because the app loads JSON files with `fetch`, use a local server (not direct double-click on `index.html`).

### Option 1: Python

```bash
python -m http.server 5500
```

Then open: `http://localhost:5500`

### Option 2: VS Code Live Server extension

Right click `index.html` and open with Live Server.

## Data files

- `data/mcq.json`
- `data/text-questions.json`

## MCQ JSON format

```json
[
  {
    "id": "mcq-1",
    "question": "Your question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 2,
    "note": "Optional explanation"
  }
]
```

- `correctIndex` is zero-based:
  - `0` means first option
  - `1` means second option
  - `2` means third option

## Text Question JSON format

```json
[
  {
    "id": "text-1",
    "question": "Your descriptive question",
    "answer": "Expected answer text"
  }
]
```
