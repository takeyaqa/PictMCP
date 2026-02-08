# Agent Instructions for PictMCP

## Overview

PictMCP is an MCP (Model Context Protocol) server that provides pairwise combinatorial testing via WebAssembly-compiled PICT. It exposes a `generate-test-cases` tool for AI assistants.

## Build and Test Commands

```bash
# Install dependencies
pnpm install

# Compile TypeScript to dist/
pnpm run build

# Run all tests once
pnpm run test:run

# Lint and format
pnpm run fmt
pnpm run lint
pnpm run typecheck
```

## Architecture

- `src/index.ts` - Entry point; creates server and connects via stdio transport
- `src/server.ts` - MCP server definition with `generate-test-cases` tool registration
- `tests/e2e.spec.ts` - End-to-end tests using in-memory MCP transport
- `server.json` - MCP server manifest (version must stay in sync with package.json)

The server uses `@modelcontextprotocol/sdk` for MCP protocol handling and `@takeyaqa/pict-wasm` for the PICT algorithm.

## Key Conventions

- **Git Workflow**: Always create a new branch from `main` before starting any task
- **Zod for schemas**: Tool input/output schemas use Zod v4 with `.describe()` for documentation
- **Version sync**: `version` in `package.json`, `server.json`, and `src/server.ts` must match
- **ES modules**: Project uses `"type": "module"` with `.js` extensions in imports
- **Strict TypeScript** - `tseslint/strictTypeChecked` for source, `tseslint/recommended` for tests
- **Prettier** for formatting
- **Commit Messages**: Use Conventional Commits format (e.g., `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `ci:`)
- **Before committing** - Always run `pnpm run fmt`, `pnpm run lint`, `pnpm run typecheck`, and `pnpm run test:run`
- **Ignore `pnpm-lock.yaml`** - Always skip this file during code review and pull request creation
