import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { PictRunner } from '@takeyaqa/pict-wasm'

// Create server instance
const server = new McpServer({
  name: 'pict-mcp',
  description: 'Pairwise Independent Combinatorial Testings for MCP',
  version: '0.1.0',
  capabilities: {
    resources: {},
    tools: {},
  },
})

// Register pict tools
server.tool(
  'generates-test-cases',
  'Generates test cases using pairwise combination algorithm',
  {
    parameters: z
      .object({
        name: z.string(),
        values: z.string(),
      })
      .array()
      .describe('Parameters for the test case generation'),
  },
  async ({ parameters }) => {
    const pictRunner = new PictRunner()
    await pictRunner.init()
    const output = pictRunner.run(parameters)
    const formattedOutput = output.body.map((row) =>
      row.map((cell) => cell.trim()).join(', '),
    )
    const formattedHeader = output.header.map((cell) => cell.trim()).join(', ')
    const formattedBody = formattedOutput.join('\n')
    const formattedOutputText = `Header: ${formattedHeader}\nBody:\n${formattedBody}`

    return {
      content: [
        {
          type: 'text',
          text: formattedOutputText,
        },
      ],
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Pict MCP Server running on stdio')
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error('Fatal error in main():', error)
  }
  process.exit(1)
})
