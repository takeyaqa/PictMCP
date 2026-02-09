# PictMCP

<p align="center">
  <img src="assets/PictMCP_logo.svg" alt="PictMCP Logo" width="400">
</p>

## Pairwise testing for your AI assistant

**PictMCP** is an MCP server for software developers who design test cases with AI assistants, providing **reliable, algorithm-correct pairwise test generation**.

### Why use this?

- AI is great at test design, but not at combinatorial math.
- Pairwise generation must be deterministic and correct.
- PictMCP separates thinking (AI) from calculation (PICT).

Prefer a GUI? Check out **[PictRider](https://pictrider.takeyaqa.dev/)**.

## Features

- 🔒 **Local Processing** - All processing runs locally with no external network calls
- ⚡ **WebAssembly Powered** - Fast execution using Microsoft's PICT algorithm compiled to WebAssembly
- 🔗 **Constraint Support** - Define constraints to filter out invalid parameter combinations
- 📊 **Structured Output** - Returns well-structured JSON results for easy integration

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)

### MCP Client Configuration

Add the following configuration to your MCP client. This is an example configuration; the exact format may vary depending on your client. Please refer to your MCP client's documentation for details.

```json
{
  "mcpServers": {
    "PictMCP": {
      "command": "npx",
      "args": ["-y", "pictmcp"]
    }
  }
}
```

## Quick Start

Once installed, you can ask your AI assistant to generate test cases using pairwise combinatorial testing.

### Example Prompt

> Generate test cases for a login form with the following parameters:
>
> - Browser: Chrome, Firefox, Safari
> - OS: Windows, macOS, Linux
> - Language: English, Japanese, Spanish

The AI assistant will use the `generate-test-cases` tool to create an optimized set of test cases that covers all pairwise combinations.

### Example Result

AI assistants typically format the results as a table:

> | #   | Browser | OS      | Language |
> | --- | ------- | ------- | -------- |
> | 1   | Chrome  | Linux   | Japanese |
> | 2   | Chrome  | macOS   | Spanish  |
> | 3   | Safari  | Linux   | Spanish  |
> | 4   | Firefox | Linux   | English  |
> | 5   | Safari  | Windows | English  |
> | 6   | Firefox | Windows | Spanish  |
> | 7   | Firefox | macOS   | Japanese |
> | 8   | Safari  | macOS   | Japanese |
> | 9   | Chrome  | macOS   | English  |
> | 10  | Chrome  | Windows | Japanese |

### Example with Constraints

> Generate test cases for:
>
> - Browser: Chrome, Firefox, Safari
> - OS: Windows, macOS, Linux
> - Language: English, Japanese, Spanish
>
> With constraint: Safari only works on macOS

You can describe constraints in plain language — the AI assistant will convert them into PICT constraint syntax automatically.

> | #   | Browser | OS      | Language |
> | --- | ------- | ------- | -------- |
> | 1   | Firefox | Linux   | Spanish  |
> | 2   | Chrome  | Windows | Spanish  |
> | 3   | Firefox | Windows | Japanese |
> | 4   | Chrome  | Linux   | Japanese |
> | 5   | Chrome  | macOS   | English  |
> | 6   | Firefox | Windows | English  |
> | 7   | Chrome  | Linux   | English  |
> | 8   | Safari  | macOS   | Spanish  |
> | 9   | Safari  | macOS   | Japanese |
> | 10  | Firefox | macOS   | Spanish  |
> | 11  | Safari  | macOS   | English  |

## FAQ

### Does this communicate with external servers?

No. All processing runs locally with no external network calls.

### I already use the `pict` CLI. Do I need this?

If your AI agent can execute CLI commands directly, you may not need this tool. However, PictMCP provides:

- A standardized MCP interface for AI assistants
- No need to install PICT separately (WebAssembly-based)
- Structured JSON output instead of TSV

### What is pairwise testing?

Pairwise testing (also known as all-pairs testing) is a combinatorial testing method that generates test cases covering all possible pairs of input parameters. This significantly reduces the number of test cases while maintaining high defect detection rates.

### What constraint syntax is supported?

You don't need to write PICT syntax directly. Simply describe constraints in natural language and your AI assistant will handle the conversion. PictMCP supports the full PICT constraint syntax. See the [PICT documentation](https://github.com/microsoft/pict/blob/main/doc/pict.md) for details.

## License

This project is licensed under the MIT License—see the [LICENSE](./LICENSE) file for details.

## Disclaimer

PictMCP is provided "as is", without warranty of any kind. The authors are not liable for any damages arising from its use.

Generated test cases do _not guarantee complete coverage_ or _the absence of defects_. Please supplement pairwise testing with other strategies as appropriate.

PictMCP is an independent project and is not affiliated with Microsoft Corporation.

---

If you find PictMCP useful, please consider starring the repository.
