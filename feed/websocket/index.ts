import ReconnectingWebSocket from 'reconnecting-websocket';

let socketMap: Map<string, ReconnectingWebSocket> = new Map();

export function getWebsocket(url: string) {
  if (socketMap.get(url))
    return socketMap.get(url);

  socketMap.set(url, new ReconnectingWebSocket(url));

  return socketMap.get(url);
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