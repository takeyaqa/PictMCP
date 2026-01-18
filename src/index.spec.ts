import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import packageJson from "../package.json" with { type: "json" };
import serverJson from "../server.json" with { type: "json" };
import { server } from "./index.js";

describe("PictMCP Server", () => {
  it("should define correct version", async () => {
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    const client = new Client({ name: "test-client", version: "1.0.0" });

    await server.connect(serverTransport);
    await client.connect(clientTransport);

    const serverVersion = client.getServerVersion();

    expect(serverVersion?.version).toBe(packageJson.version);
    expect(serverVersion?.version).toBe(serverJson.version);
    expect(serverVersion?.version).toBe(serverJson.packages[0].version);
  });
});
