import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { PictMCPServer } from "./server.js";

async function main() {
  const server = new PictMCPServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PictMCP Server running on stdio");
}

try {
  await main();
} catch (error) {
  console.error("Fatal error in main():", error);
  process.exit(1);
}
