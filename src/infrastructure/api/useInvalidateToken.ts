import {useEffect, useRef} from 'react';
import {instance} from './instance';

export const useInvalidateToken = (invalidate: () => void) => {
  const invalidateFnRef = useRef(invalidate);
  useEffect(() => {
    invalidateFnRef.current = invalidate;
  });

  useEffect(() => {
    const httpUnauthorizedInterceptor = instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          invalidateFnRef.current();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.response.eject(httpUnauthorizedInterceptor);
    };
  }, []);
};
