import ReconnectingWebSocket from 'reconnecting-websocket';

let websocket: ReconnectingWebSocket | null = null;

export function getWebsocket(url: string) {
  if (websocket)
    closeWebsocket()

  websocket = new ReconnectingWebSocket(url);

  return websocket;
}

export function closeWebsocket() {
  if (websocket) {
    websocket.close();
    websocket = null;
  }
}