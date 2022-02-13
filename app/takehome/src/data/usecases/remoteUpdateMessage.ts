import { API_URL } from '../../config/variables';
import { Message } from '../../domain/entities/Message';
import {
  UpdateMessage,
  UpdateMessageBody,
} from '../../domain/usecases/updateMessage';
import { HttpClient } from '../../infra/HttpClient';
import { HttpError } from '../errors/HttpError';
import { UnknownError } from '../errors/UnknownError';

interface ResponseApi {
  message: Message;
}

export class RemoteUpdateMessage implements UpdateMessage {
  constructor(private readonly httpClient: HttpClient<ResponseApi>) {}

  async exec(messageId: number, body: UpdateMessageBody): Promise<Message> {
    const httpResponse = await this.httpClient.request({
      url: `${API_URL}/messages/${messageId}`,
      method: 'PATCH',
      body,
    });

    if (!!httpResponse.error) {
      throw new HttpError(httpResponse.error, httpResponse.statusCode);
    }

    if (!httpResponse.response) {
      throw new UnknownError('Something went wrong when updating a message');
    }

    return httpResponse.response.message;
  }
}
