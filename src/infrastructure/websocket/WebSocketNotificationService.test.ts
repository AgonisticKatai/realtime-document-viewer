import { beforeEach, describe, expect, it, vi } from 'vitest';

import { WebSocketNotificationService } from './WebSocketNotificationService';

describe('WebSocketNotificationService', () => {
  let service: WebSocketNotificationService;
  let mockWebSocket: {
    addEventListener: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
    readyState: number;
  };

  beforeEach(() => {
    mockWebSocket = {
      addEventListener: vi.fn(),
      close: vi.fn(),
      readyState: WebSocket.OPEN
    };

    globalThis.WebSocket = vi.fn(() => mockWebSocket) as unknown as typeof WebSocket;

    service = new WebSocketNotificationService({ url: 'ws://localhost:8080/notifications' });
  });

  it('should create WebSocket connection on connect', () => {
    service.connect();

    expect(globalThis.WebSocket).toHaveBeenCalledWith('ws://localhost:8080/notifications');
  });

  it('should parse and emit notification when message received', () => {
    const callback = vi.fn();
    service.onNotification(callback);
    service.connect();

    const messageHandler = mockWebSocket.addEventListener.mock.calls.find(
      call => call[0] === 'message'
    )?.[1];

    const mockMessage = {
      data: JSON.stringify({
        DocumentID: 'd1',
        DocumentTitle: 'Test Doc',
        Timestamp: '2024-01-15T10:00:00Z',
        UserID: 'u1',
        UserName: 'John Doe'
      })
    };

    if (messageHandler) {
      messageHandler(mockMessage);
    }

    expect(callback).toHaveBeenCalledWith({
      documentId: 'd1',
      documentTitle: 'Test Doc',
      timestamp: expect.any(Date),
      userId: 'u1',
      userName: 'John Doe'
    });
  });

  it('should close connection on disconnect', () => {
    service.connect();
    service.disconnect();

    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
