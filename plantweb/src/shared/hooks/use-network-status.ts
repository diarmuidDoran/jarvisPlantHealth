import { useCallback, useState } from 'react';
import { NetworkStatus as NS } from 'shared/types';

export const NetworkStatus: Record<'NONE' | 'INFLIGHT' | 'SUCCESS' | 'ERROR', NS> = {
  NONE: 'none',
  INFLIGHT: 'in-flight',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const useNetworkStatus = () => {
  const [status, setStatus] = useState(NetworkStatus.NONE);

  const setNone = useCallback(() => {
    setStatus(NetworkStatus.NONE);
  }, []);

  const setInFlight = useCallback(() => {
    setStatus(NetworkStatus.INFLIGHT);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus(NetworkStatus.SUCCESS);
  }, []);

  const setError = useCallback(() => {
    setStatus(NetworkStatus.ERROR);
  }, []);

  return {
    status,
    setNone,
    setInFlight,
    setSuccess,
    setError,
  };
};
