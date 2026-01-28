import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PictRunner } from "@takeyaqa/pict-wasm";

export class PictMcpServer extends McpServer {
  constructor() {
    super({
      name: "io.github.takeyaqa/PictMCP",
      title: "PictMCP",
      version: "0.2.0",
      description:
        "Provides pairwise combinatorial testing capabilities to AI assistants.",
      websiteUrl: "https://github.com/takeyaqa/PictMCP#readme",
      icons: [
        {
          src: "https://raw.githubusercontent.com/takeyaqa/PictMCP/main/assets/PictMCP_icon@64x64.png",
          mimeType: "image/png",
          sizes: ["64x64"],
        },
        {
          src: "https://raw.githubusercontent.com/takeyaqa/PictMCP/main/assets/PictMCP_icon.svg",
          mimeType: "image/svg+xml",
          sizes: ["any"],
        },
      ],
    });

    // Register pict tools
    super.registerTool(
      "generate-test-cases",
      {
        title: "Generate test cases",
        description:
          "Executes PICT with the given parameters and options to generate test cases.",
        inputSchema: {
          parameters: z
            .object({
              name: z.string().describe("The name of the parameter."),
              values: z
                .string()
                .describe(
                  "A comma-separated string of possible values for this parameter.",
                ),
            })
            .array()
            .describe(
              "Represents a parameter definition for PICT test case generation.",
            ),
          constraintsText: z
            .string()
            .optional()
            .describe(
              "PICT constraint expressions to filter invalid combinations.",
            ),
        },
        outputSchema: {
          result: z
            .object({
              header: z
                .string()
                .array()
                .describe(
                  "An array of parameter names representing the column headers.",
                ),
              body: z
                .string()
                .array()
                .array()
                .describe(
                  "A two-dimensional array where each inner array represents a test case, with values corresponding to the header columns.",
                ),
            })
            .describe(
              "Represents the parsed result of PICT test case generation.",
            ),
          modelFile: z
            .string()
            .describe(
              "The complete model file content that was passed to PICT.",
            ),
          message: z
            .string()
            .optional()
            .describe(
              "Optional message output from PICT, typically containing information.",
            ),
        },
      },
      async ({ parameters, constraintsText }) => {
        const pictRunner = await PictRunner.create();
        const output = pictRunner.run(parameters, {
          constraintsText,
        });

        return {
          structuredContent: {
            result: output.result,
            modelFile: output.modelFile,
            message: output.message,
          },
          content: [
            {
              type: "text",
              text: JSON.stringify(output),
            },
          ],
        };
      },
    );
  }
}
