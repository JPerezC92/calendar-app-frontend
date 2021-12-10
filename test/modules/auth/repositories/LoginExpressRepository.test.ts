/**
 * @jest-environment jsdom
 */

import 'isomorphic-fetch';
import { LoginExpressRepository } from 'src/modules/auth/repositories';
import * as fetcher from 'src/modules/shared/utils/fetcher';

describe('Testing LoginExpressRepository', () => {
  test('should dsadasdas', (done) => {
    const result = {
      success: true,
      payload: {
        token: '************',
        user: { uid: '1555554', firstname: '', lastname: '' },
      },
    };

    jest
      .mock('src/modules/shared/utils/fetcher')
      .spyOn(fetcher, 'fetcher')
      .mockResolvedValue(new Response(JSON.stringify(result)));

    LoginExpressRepository({
      email: '123@gmail.com',
      password: '123456789',
    })
      .then((res) => {
        expect(fetcher.fetcher).toHaveBeenCalledTimes(1);
        expect(res).toMatchObject(result);
        expect(fetcher.fetcher).toHaveBeenCalledWith({
          input: 'https://my-api-url.com/api/auth/login',
          init: {
            body: '{"email":"123@gmail.com","password":"123456789"}',
            method: 'POST',
          },
        });

        done();
      })
      .catch(done);
  });
});
