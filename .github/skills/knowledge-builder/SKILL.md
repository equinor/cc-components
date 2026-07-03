---
name: knowledge-builder
description: Post-task lessons-learned review. Updates knowledge, instruction, and skill files to continuously improve future sessions.
---

# knowledge-builder

After any non-trivial task (feature, bugfix, refactor, debugging session),
run this knowledge-builder.

## Step 1 — Reflect

- What went well? (efficient patterns, tools, approaches)
- What went poorly? (wasted effort, wrong assumptions, dead ends)
- What was surprising? (undocumented quirks, gotchas)
- What was missing from instructions/knowledge? (would have saved time)
- What instructions were wrong or outdated?

## Step 2 — Classify (decision tree, in order)

### 2a. Should we fix this instead of documenting it?

If the lesson is "this is unnecessarily hard," consider whether the root
cause can be eliminated (rename, better default, small refactor). File an
issue instead of (or in addition to) documenting the workaround.

### 2b. Does this belong in the code itself?

- Inline comment: implementation gotcha tied to a specific line
- JSDoc: public API contract, non-obvious parameter semantics
- Type-level doc: property whose name alone is misleading

If someone would need to leave the file to understand the code, the comment
is missing.

### 2c. Does this update the mental model? → `knowledge/`

Route here when the lesson describes:

- How subsystems connect or communicate
- Why something is designed the way it is
- An invariant that must hold
- A known tension or pressure point
- An end-to-end operation trace

Use the structured notation (OWNS / READS FROM / WRITES TO / INVARIANT /
FLOW / TENSION / DECIDED).

### 2d. Is it a rule for working in a file type? → `instructions/`

Conventions, naming rules, lint patterns, framework idioms. Add `applyTo`
glob frontmatter so it auto-loads for matching files.

### 2e. Is it a multi-step workflow? → `skills/<name>/SKILL.md`

A repeatable procedure with multiple steps (release prep, debugging flow,
new-component scaffolding).

## Step 3 — Apply

Make the documentation update in the same commit (or a follow-up) and
reference it in the commit message.
