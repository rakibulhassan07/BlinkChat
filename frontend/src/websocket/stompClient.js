import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function createBlinkChatStompClient({ token, onMessage, onPresenceChange, onTyping }) {
  const socketUrl = import.meta.env.VITE_WS_URL ?? "http://localhost:8080/ws";

  return new Client({
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    debug: import.meta.env.DEV ? (message) => console.debug(message) : undefined,
    reconnectDelay: 4000,
    webSocketFactory: () => new SockJS(socketUrl),
    onConnect: (frame) => {
      onPresenceChange?.({ status: "connected", frame });
      onMessage?.({ type: "system", text: "Connected to BlinkChat WebSocket." });
    },
    onDisconnect: () => {
      onPresenceChange?.({ status: "disconnected" });
    },
    onStompError: (frame) => {
      onMessage?.({ type: "error", text: frame.headers.message ?? "WebSocket error" });
    },
    onUnhandledMessage: (message) => {
      onMessage?.(JSON.parse(message.body));
    },
    onUnhandledReceipt: (receipt) => {
      onTyping?.({ receiptId: receipt.headers["receipt-id"] });
    },
  });
}
