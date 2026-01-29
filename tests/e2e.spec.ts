import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import packageJson from "../package.json" with { type: "json" };
import serverJson from "../server.json" with { type: "json" };
import { createPictMcpServer } from "../src/server.js";

describe("PictMcpServer", () => {
  let server: McpServer;
  let client: Client;

  beforeEach(async () => {
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    server = createPictMcpServer();
    client = new Client({ name: "test-client", version: "1.0.0" });

    await server.connect(serverTransport);
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
    await server.close();
  });

  it("should return version matching package configuration", async () => {
    const serverVersion = client.getServerVersion();

    expect(serverVersion?.version).toBe(packageJson.version);
    expect(serverVersion?.version).toBe(serverJson.version);
    expect(serverVersion?.version).toBe(serverJson.packages[0].version);
  });

  it("should list registered tools", async () => {
    const tools = (await client.listTools()).tools;

    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("generate-test-cases");
    expect(tools[0].title).toBe("Generate test cases");
    expect(tools[0].description).toBe(
      "Executes PICT with the given parameters and options to generate test cases.",
    );
  });

  it("should generate test cases using PICT", async () => {
    const response = await client.callTool({
      name: "generate-test-cases",
      arguments: {
        parameters: [
          { name: "OS", values: "Windows, macOS" },
          { name: "Browser", values: "Chrome, Firefox, Edge" },
          { name: "Resolution", values: "1920x1080, 1280x720" },
        ],
      },
    });

    expect(response.structuredContent).toEqual({
      result: {
        header: ["OS", "Browser", "Resolution"],
        body: [
          ["macOS", "Edge", "1920x1080"],
          ["Windows", "Edge", "1280x720"],
          ["Windows", "Firefox", "1920x1080"],
          ["Windows", "Chrome", "1920x1080"],
          ["macOS", "Chrome", "1280x720"],
          ["macOS", "Firefox", "1280x720"],
        ],
      },
      modelFile: `OS: Windows, macOS
Browser: Chrome, Firefox, Edge
Resolution: 1920x1080, 1280x720`,
      message: "",
    });
    const textContent = (response.content as Array<unknown>)[0] as TextContent;
    expect(textContent.type).toEqual("text");
    expect(JSON.parse(textContent.text)).toEqual(response.structuredContent);
  });

  it("should handle constraints in test case generation", async () => {
    const response = await client.callTool({
      name: "generate-test-cases",
      arguments: {
        parameters: [
          { name: "OS", values: "Windows, macOS" },
          { name: "Browser", values: "Chrome, Firefox, Edge" },
          { name: "Resolution", values: "1920x1080, 1280x720" },
        ],
        constraintsText: 'IF [OS] = "macOS" THEN [Browser] <> "Edge";',
      },
    });

    expect(response.structuredContent).toEqual({
      result: {
        header: ["OS", "Browser", "Resolution"],
        body: [
          ["Windows", "Edge", "1280x720"],
          ["macOS", "Chrome", "1280x720"],
          ["Windows", "Edge", "1920x1080"],
          ["macOS", "Firefox", "1280x720"],
          ["Windows", "Firefox", "1920x1080"],
          ["Windows", "Chrome", "1920x1080"],
          ["macOS", "Chrome", "1920x1080"],
        ],
      },
      modelFile: `OS: Windows, macOS
Browser: Chrome, Firefox, Edge
Resolution: 1920x1080, 1280x720

IF [OS] = "macOS" THEN [Browser] <> "Edge";`,
      message: "",
    });

    const textContent = (response.content as Array<unknown>)[0] as TextContent;
    expect(textContent.type).toEqual("text");
    expect(JSON.parse(textContent.text)).toEqual(response.structuredContent);
  });
});
