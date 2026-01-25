import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
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
});
