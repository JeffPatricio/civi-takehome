import { Message } from '../entities/Message';

export interface FetchMessagesList {
  exec: () => Promise<Message[]>;
}
