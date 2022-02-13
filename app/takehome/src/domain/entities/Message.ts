export interface Message {
  id: number;
  timestamp: number;
  subject: string;
  detail: string;
  read: boolean;
}
