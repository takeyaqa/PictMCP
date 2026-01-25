# PictMCP

## 🚧 Work in Progress 🚧

> [!WARNING]
> This project is currently under active development.
> It is not yet stable and its API and features may change without notice.
>
> Use in production environments is **not recommended** at this time.

## Project overview

PictMCP is an MCP (Model Context Protocol) server that provides pairwise combinatorial testing capabilities to AI assistants. It wraps the PICT (Pairwise Independent Combinatorial Testing) algorithm via WebAssembly, enabling AI clients to generate optimized test case combinations.

## Install

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 or higher)
- [pnpm](https://pnpm.io/) (v10 or higher)

### Commands

In your MCP client

```json
{
  "mcpServers": {
    "PictMCP": {
      "command": "pnpx",
      "args": ["pictmcp"]
    }
  }
}
```
