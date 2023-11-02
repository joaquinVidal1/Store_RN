import {useEffect, useRef} from 'react';
import {instance} from './instance';

export const useBearerToken = (token: string | undefined) => {
  const tokenRef = useRef<string | undefined>(token);
  useEffect(() => {
    tokenRef.current = token;
  });

  useEffect(() => {
    const tokenInterceptor = instance.interceptors.request.use(config => {
      console.log('adding token');
      console.log(`token value: ${token}`);
      const tokenValue = tokenRef.current;
      if (tokenValue !== undefined) {
        config.headers.Authorization = `Bearer ${tokenValue}`;
      }
      return config;
    });

    return () => {
      instance.interceptors.request.eject(tokenInterceptor);
    };
  }, []);
};
