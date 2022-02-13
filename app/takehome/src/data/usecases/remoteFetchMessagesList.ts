import { API_URL } from '../../config/variables';
import { Message } from '../../domain/entities/Message';
import { FetchMessagesList } from '../../domain/usecases/fetchMesagesList';
import { HttpClient } from '../../infra/HttpClient';
import { HttpError } from '../errors/HttpError';
import { UnknownError } from '../errors/UnknownError';

interface MessagesListApi {
  messages: Message[];
}

export class RemoteFetchMessagesList implements FetchMessagesList {
  constructor(private readonly httpClient: HttpClient<MessagesListApi>) {}

  async exec(): Promise<Message[]> {
    const httpResponse = await this.httpClient.request({
      url: `${API_URL}/messages`,
      method: 'GET',
    });

    if (!!httpResponse.error) {
      throw new HttpError(httpResponse.error, httpResponse.statusCode);
    }

    if (!httpResponse.response) {
      throw new UnknownError(
        'Something went wrong when fetching a message list'
      );
    }

    return httpResponse.response.messages;
  }
}
