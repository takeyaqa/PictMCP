#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPictMcpServer } from "./server.js";

async function main() {
  const server = createPictMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PictMCP Server running on stdio");
}

try {
  await main();
} catch (error: unknown) {
  console.error("Fatal error in main():", error);
  process.exit(1);
}
