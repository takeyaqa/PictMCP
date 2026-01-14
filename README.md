# PictMCP

Pairwise Independent Combinatorial Testings for MCP

## 🚧 Work in Progress 🚧

> [!WARNING]
> This project is currently under active development.
> It is not yet stable and its API and features may change without notice.
>
> Use in production environments is **not recommended** at this time.

## Install

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)
- [pnpm](https://pnpm.io/) (v10 or higher)

### Commands

In your terminal

```sh
git clone https://github.com/takeyaqa/PictMCP.git
cd PictMCP
pnpm install
pnpm build
```

In your MCP client

```json
{
  "mcpServers": {
    "PictMCP": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/PictMCP/dist/index.js"]
    }
  }
}
```
