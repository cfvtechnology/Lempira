# Skill Registry — cfv-calculation-precing

Generated: 2026-04-22

## Project Context

- **Stack**: Astro 6, TypeScript (strict), vanilla JS
- **Persistence**: engram

## Matched User Skills

| Skill | Trigger | Source |
|-------|---------|--------|
| typescript | When writing TypeScript code — types, interfaces, generics | `~/.claude/skills/typescript/SKILL.md` |

## Project Conventions

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project guidance for Claude Code — commands, architecture, calculation logic, conventions |

## Compact Rules

### typescript

- Use const object + `as const` then extract type with `typeof` — never raw string unions
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `satisfies` for type-safe defaults without widening
- Discriminated unions over optional fields for state variants
- Generic constraints with `extends` — avoid `any`
