import { getToken } from 'src/modules/auth/utils';
import { baseHeaders, unexpectedError } from '.';

interface FetcherOptions {
  input: RequestInfo;
  init?: RequestInit;
  withToken?: boolean;
}

export const fetcher: (fetcherOptions: FetcherOptions) => Promise<Response> =
  async ({ input, init, withToken }) => {
    const headers = withToken
      ? { ...baseHeaders, 'x-access-token': getToken() ?? '' }
      : baseHeaders;

    try {
      return await fetch(input, {
        ...init,
        headers: { ...headers, ...init?.headers },
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

      return new Response(JSON.stringify(unexpectedError), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: baseHeaders,
      });
    }
  };
