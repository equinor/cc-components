# Knowledge Base

Structured mental-model notes for `equinor/cc-components`, seeded while investigating
[cc-toolbox#4792](https://github.com/equinor/cc-toolbox/issues/4792) (interaction tracking in
embedded ADS Power BI reports).

These files capture **how subsystems connect, why they're designed that way, and the invariants
that must hold** — not step-by-step how-tos (those belong in `.github/skills/`).

## Notation

Each entry uses the knowledge-builder structured notation:

- **OWNS** — what this unit is the source of truth for
- **READS FROM** — its inputs / upstream dependencies
- **WRITES TO** — its outputs / downstream effects
- **INVARIANT** — a rule that must always hold
- **FLOW** — an end-to-end operation trace
- **TENSION** — a known pressure point or trade-off
- **DECIDED** — a deliberate design decision and its rationale

## Index

| File | Scope |
|------|-------|
| [reports-architecture.md](reports-architecture.md) | CC reports (`reports/*`) and the `@cc-components/reportshared` runtime |
| [power-bi-embedding.md](power-bi-embedding.md) | The embed pipeline across `reportshared` → `workspace-fusion` → `workspace-powerbi` → `PowerBIEmbed` |
| [domains/ads-reports.md](domains/ads-reports.md) | The ADS report set and the cc-toolbox#4792 tracking feature |

## Maintaining

Follow `.github/skills/knowledge-builder/SKILL.md` after any non-trivial task: reflect, classify
(code comment vs. knowledge vs. instruction vs. skill), and update in the same change.
