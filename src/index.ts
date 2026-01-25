import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { PictRunner } from "@takeyaqa/pict-wasm";

// Create server instance
const server = new McpServer({
  name: "PictMCP",
  version: "0.2.0",
});

// Register pict tools
server.registerTool(
  "generate-test-cases",
  {
    description: "Generates test cases using pairwise combination algorithm",
    inputSchema: {
      parameters: z
        .object({ name: z.string(), values: z.string() })
        .array()
        .describe("Parameters for the test case generation"),
      constraints: z
        .string()
        .optional()
        .describe("Constraints for the test case generation"),
    },
  },
  async ({ parameters, constraints }) => {
    const pictRunner = new PictRunner();
    await pictRunner.init();
    const output = pictRunner.run(parameters, { constraintsText: constraints });
    const formattedOutput = output.body.map((row) =>
      row.map((cell) => cell.trim()).join(", "),
    );
    const formattedHeader = output.header.map((cell) => cell.trim()).join(", ");
    const formattedBody = formattedOutput.join("\n");
    const formattedOutputText = `Header: ${formattedHeader}\nBody:\n${formattedBody}`;

    return {
      content: [
        {
          type: "text",
          text: formattedOutputText,
        },
      ],
    };
  },
);

// export for testing purposes
export { server };

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PictMCP Server running on stdio");
}

main().catch((error: unknown) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
