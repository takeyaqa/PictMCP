import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import type { LoggingMessageNotification } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { PictRunner } from "@takeyaqa/pict-wasm";

export class PictMCPServer {
  private server: McpServer;

  constructor() {
    this.server = new McpServer({
      name: "PictMCP",
      version: "0.2.0",
    });
    // Register pict tools
    this.server.registerTool(
      "generate-test-cases",
      {
        description:
          "Generates test cases using pairwise combination algorithm",
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
        const pictRunner = await PictRunner.create();
        const output = pictRunner.run(parameters, {
          constraintsText: constraints,
        });
        const formattedOutput = output.result.body.map((row) =>
          row.map((cell) => cell.trim()).join(", "),
        );
        const formattedHeader = output.result.header
          .map((cell) => cell.trim())
          .join(", ");
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
  }

  connect(transport: Transport): Promise<void> {
    return this.server.connect(transport);
  }

  close(): Promise<void> {
    return this.server.close();
  }

  isConnected(): boolean {
    return this.server.isConnected();
  }

  sendLoggingMessage(
    params: LoggingMessageNotification["params"],
    sessionId?: string,
  ): Promise<void> {
    return this.server.sendLoggingMessage(params, sessionId);
  }

  sendResourceListChanged(): void {
    this.server.sendResourceListChanged();
  }

  sendToolListChanged(): void {
    this.server.sendToolListChanged();
  }

  sendPromptListChanged(): void {
    this.server.sendPromptListChanged();
  }
}
