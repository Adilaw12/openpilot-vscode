# Changelog

## [0.2.1] — 2026-06-12

### Changed
- **Renamed to Freebird AI** — new name, same product, zero conflicts. Continues from `TenLabs.openpilot-ai` v0.2.1, the final release under the OpenPilot AI name.
- All commands, settings, and extension IDs updated to `freebird.*`
- License key format updated to `FB-XXXX-XXXX-XXXX-XXXX`

---

## [0.2.0] — 2026-06-12

### Added
- **@ file mentions** — type `@filename` in chat to inject any file as context
- **`/` command picker** — type `/` to see all slash commands with descriptions
- **Clear conversation** button + `/clear` command
- **`/help`** command listing all available commands and shortcuts
- **History trimming** — conversation capped to prevent context overflow
- **Pro gating** — Pro features now properly require an active license

### Improved
- **Chat UI redesign** — custom SVG logo, feature grid welcome screen, full markdown renderer
- **Markdown rendering** — headings, lists, blockquotes, code copy buttons
- **Performance** — workspace file tree cached per session (no re-scan on every message)
- **Performance** — license status cached in memory (no network call on every message)
- **Performance** — both caches pre-warmed at startup so first message is instant
- **Inline edit** — now sends surrounding context so the AI understands scope

### Fixed
- Pro features could be triggered without a valid license
- Offline grace period now only applies to previously server-confirmed keys

---

## [0.1.3] — 2026-06-09

### Added
- Initial marketplace release
- Standalone chat panel — no GitHub Copilot required
- Agentic codebase tools: read, search, write, edit files
- Multi-step agent loop with approve/reject flow
- Inline code editing with `Ctrl+Alt+K`
- AI commit message generation
- Git push and status support
- Ollama, Anthropic Claude, and OpenAI backends

---

## Earlier history (as OpenPilot AI)

### [0.2.1] — OpenPilot AI
- Final release under the OpenPilot AI name — development continued as Freebird AI (`TenLabs.freebird-ai`)

### [0.1.0] — 2025
- Standalone chat panel — no GitHub Copilot required
- Agentic codebase tools: read files, search code, write and edit files
- Multi-step agent loop: AI reads your codebase then makes targeted edits
- Approval flow for all write/edit/run/push operations
- Inline code editing with `Ctrl+Alt+K`
- AI commit message generation (`/commit`)
- Git push support (`/push`, `/status`)
- Supports Ollama (free/local), Anthropic Claude, and OpenAI backends
