import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpResponse, RequestData } from './HttpClient';

class AxiosHttpClient implements HttpClient {
  async request(data: RequestData): Promise<HttpResponse> {
    try {
      const axiosResponse: AxiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        timeout: 8000,
      });

      return {
        statusCode: axiosResponse.status,
        response: axiosResponse.data,
      };
    } catch (error: any) {
      const errorResponse = error.response;

      if (!!errorResponse && !!errorResponse.data) {
        return {
          statusCode: errorResponse.status,
          error: errorResponse.data.message,
        };
      }

      return {
        statusCode: 0,
        error: error.toString(),
      };
    }
  }
}

export default new AxiosHttpClient();
