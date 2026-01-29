# PictMCP

## 🚧 Work in Progress 🚧

> [!WARNING]
> This project is currently under active development.
> It is not yet stable and its API and features may change without notice.
>
> Use in production environments is **not recommended** at this time.

## Project overview

PictMCP is an MCP (Model Context Protocol) server that provides pairwise combinatorial testing capabilities to AI assistants. It wraps the PICT (Pairwise Independent Combinatorial Testing) algorithm via WebAssembly, enabling AI clients to generate optimized test case combinations.

### Why use this?

- LLMs struggle with strict algorithmic data processing
- This tool offloads combinatorial logic that LLMs handle poorly

## FAQ

### Does this communicate with external servers?

No. All processing runs locally with no external network calls.

### I already use the `pict` CLI. Do I need this?

If your AI agent can execute CLI commands directly, you may not need this tool.

## Install

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 or higher)

### Commands

In your MCP client

```json
{
  "mcpServers": {
    "PictMCP": {
      "command": "npx",
      "args": ["pictmcp"]
    }
  }
}
```
