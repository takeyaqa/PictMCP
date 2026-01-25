import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import type { LoggingMessageNotification } from "@modelcontextprotocol/sdk/types.js";

// Mock the McpServer class
const mockConnect = vi.fn();
const mockClose = vi.fn();
const mockIsConnected = vi.fn();
const mockSendLoggingMessage = vi.fn();
const mockSendResourceListChanged = vi.fn();
const mockSendToolListChanged = vi.fn();
const mockSendPromptListChanged = vi.fn();
const mockRegisterTool = vi.fn();

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => ({
  McpServer: class MockMcpServer {
    connect = mockConnect;
    close = mockClose;
    isConnected = mockIsConnected;
    sendLoggingMessage = mockSendLoggingMessage;
    sendResourceListChanged = mockSendResourceListChanged;
    sendToolListChanged = mockSendToolListChanged;
    sendPromptListChanged = mockSendPromptListChanged;
    registerTool = mockRegisterTool;
  },
}));

// Import after mocking
import { PictMCPServer } from "./server.js";

describe("PictMCPServer delegation", () => {
  let server: PictMCPServer;

  beforeEach(() => {
    vi.clearAllMocks();
    server = new PictMCPServer();
  });

  describe("connect", () => {
    it("should delegate to McpServer.connect with the transport argument", async () => {
      const mockTransport = {} as Transport;
      const expectedResult = Promise.resolve();
      mockConnect.mockReturnValue(expectedResult);

      const result = server.connect(mockTransport);

      expect(mockConnect).toHaveBeenCalledTimes(1);
      expect(mockConnect).toHaveBeenCalledWith(mockTransport);
      expect(result).toBe(expectedResult);
    });
  });

  describe("close", () => {
    it("should delegate to McpServer.close", async () => {
      const expectedResult = Promise.resolve();
      mockClose.mockReturnValue(expectedResult);

      const result = server.close();

      expect(mockClose).toHaveBeenCalledTimes(1);
      expect(result).toBe(expectedResult);
    });
  });

  describe("isConnected", () => {
    it("should delegate to McpServer.isConnected and return true", () => {
      mockIsConnected.mockReturnValue(true);

      const result = server.isConnected();

      expect(mockIsConnected).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("should delegate to McpServer.isConnected and return false", () => {
      mockIsConnected.mockReturnValue(false);

      const result = server.isConnected();

      expect(mockIsConnected).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });
  });

  describe("sendLoggingMessage", () => {
    it("should delegate to McpServer.sendLoggingMessage with params only", async () => {
      const params: LoggingMessageNotification["params"] = {
        level: "info",
        data: "test message",
      };
      const expectedResult = Promise.resolve();
      mockSendLoggingMessage.mockReturnValue(expectedResult);

      const result = server.sendLoggingMessage(params);

      expect(mockSendLoggingMessage).toHaveBeenCalledTimes(1);
      expect(mockSendLoggingMessage).toHaveBeenCalledWith(params, undefined);
      expect(result).toBe(expectedResult);
    });

    it("should delegate to McpServer.sendLoggingMessage with params and sessionId", async () => {
      const params: LoggingMessageNotification["params"] = {
        level: "error",
        data: "error message",
      };
      const sessionId = "test-session-id";
      const expectedResult = Promise.resolve();
      mockSendLoggingMessage.mockReturnValue(expectedResult);

      const result = server.sendLoggingMessage(params, sessionId);

      expect(mockSendLoggingMessage).toHaveBeenCalledTimes(1);
      expect(mockSendLoggingMessage).toHaveBeenCalledWith(params, sessionId);
      expect(result).toBe(expectedResult);
    });
  });

  describe("sendResourceListChanged", () => {
    it("should delegate to McpServer.sendResourceListChanged", () => {
      server.sendResourceListChanged();

      expect(mockSendResourceListChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendToolListChanged", () => {
    it("should delegate to McpServer.sendToolListChanged", () => {
      server.sendToolListChanged();

      expect(mockSendToolListChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe("sendPromptListChanged", () => {
    it("should delegate to McpServer.sendPromptListChanged", () => {
      server.sendPromptListChanged();

      expect(mockSendPromptListChanged).toHaveBeenCalledTimes(1);
    });
  });
});
