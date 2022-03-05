type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

class RequestBuilder {
  private request: RequestInit;

  constructor() {
    this.request = {};
  }

  makeMethod(method: RequestMethod) {
    this.request.method = method;
    return this;
  }

  makeHeaders(headers: HeadersInit) {
    this.request.headers = headers;
    return this;
  }

  makeBody(body: BodyInit | null) {
    this.request.body = body;
    return this;
  }

  makeCredentials(credentials: RequestCredentials) {
    this.request.credentials = credentials;
    return this;
  }

  getRequest() {
    return this.request;
  }
}

export { RequestBuilder };
