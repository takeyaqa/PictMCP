import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { PictMcpServer } from "./server.js";

async function main() {
  const server = new PictMcpServer();
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
