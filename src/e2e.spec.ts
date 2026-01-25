import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import packageJson from "../package.json" with { type: "json" };
import serverJson from "../server.json" with { type: "json" };
import { PictMCPServer } from "./server.js";

describe("PictMCP Server", () => {
  let server: PictMCPServer;
  let client: Client;

  beforeEach(async () => {
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    server = new PictMCPServer();
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

    const content = response.content as TextContent[];
    expect(content).toHaveLength(1);
    expect(content[0].type).toBe("text");
    expect(content[0].text).toContain("Header: OS, Browser, Resolution");
    expect(content[0].text).toContain("Body:");
    expect(content[0].text).toContain("Windows, Chrome, 1920x1080");
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
        constraints: 'IF [OS] = "macOS" THEN [Browser] <> "Edge";',
      },
    });

    const content = response.content as TextContent[];
    console.error(content);
    expect(content).toHaveLength(1);
    expect(content[0].type).toBe("text");
    expect(content[0].text).toContain("Header: OS, Browser, Resolution");
    expect(content[0].text).toContain("Body:");
    expect(content[0].text).toContain("Windows, Chrome, 1920x1080");
    expect(content[0].text).toContain("macOS, Chrome, 1920x1080");
    expect(content[0].text).not.toContain("macOS, Edge");
  });
});
