export type RequestData = {
  url: string;
  method: HttpMethod;
  body?: any;
};

export interface HttpClient<R = any> {
  request: (data: RequestData) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpStatusCode {
  unknown = 0,
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  response?: T;
  error?: string;
};
