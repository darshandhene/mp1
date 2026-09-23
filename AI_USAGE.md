# AI Usage Disclosure

## Tools used
- Claude Code (Anthropic) — desktop app, multi-agent workflow (planner, implementer and reviewer agents)

## Chat logs
- [Claude Code session](chatlogs/claude-code-session.txt)
- [Chatgpt Codex session](chatlogs/chatgpt-codex-session.txt)

## How AI was used
- Planned the build in chunks (layout/stripes, navbar, hero, carousel, work grid + modals, video, footer, responsiveness pass) before writing code.
- Generated initial HTML/SCSS/JS for each chunk based on the plan.
- Ran automated per-task code review that caught real bugs, including a carousel arrow misalignment, a modal re-entrancy/stuck-open race condition, and a 3-column grid collapsing incorrectly at the 768px breakpoint.
- Verified the site in the browser at the 5 required resolutions after each chunk and after fixes.
- Drafted the README and this AI-usage disclosure.

The author reviewed, tested and modified all generated code and committed every change manually.

## Other sources
See the "Sources" section of [README.md](./README.md) for MDN pages, Sass documentation, Font Awesome, Google Fonts, the course template, and media credits.
