import { Message } from '../entities/Message';

export interface UpdateMessageBody {
  read: boolean;
}

export interface UpdateMessage {
  exec: (messageId: number, data: UpdateMessageBody) => Promise<Message>;
}
