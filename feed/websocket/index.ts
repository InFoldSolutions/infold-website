import ReconnectingWebSocket from 'reconnecting-websocket';

const socketMap: Map<string, ReconnectingWebSocket> = new Map();

export function getWebsocket(url: string): ReconnectingWebSocket {
  const existingSocket = socketMap.get(url);

  if (existingSocket) return existingSocket;

  const newWebSocket = new ReconnectingWebSocket(url);

  socketMap.set(url, newWebSocket);

  return newWebSocket;
}

export function closeWebsocket(url: string) {
  const socketForUrl: ReconnectingWebSocket | undefined = socketMap.get(url);

  if (socketForUrl) {
    socketForUrl.close();
    socketMap.delete(url);
  }
}

export function closeAllWebSockets() {
  socketMap.forEach((socket: ReconnectingWebSocket) => {
    socket.close();
  });

  socketMap.clear();
}