import {useBearerToken} from './useBearerToken';
import {useInvalidateToken} from './useInvalidateToken';

interface APIConfiguration {
  token: string | undefined;
  invalidateToken: () => void;
}

/**
 * Call this hook once at a top-level node in your hierarchy
 *
 * @param config the desired configuration of the API layer
 */
export const useAPIConfig = (config: APIConfiguration) => {
  useBearerToken(config.token);
  useInvalidateToken(config.invalidateToken);
};
