import { useMemo, useCallback } from 'react';
import { useSearchParams as _useSearchParams } from 'react-router-dom';

import { useRouter } from './use-router';
import { usePathname } from './use-pathname';

// ----------------------------------------------------------------------

export function useSearchParams() {
  const [searchParams] = _useSearchParams();

  return useMemo(() => searchParams, [searchParams]);
}

export function useSearchParamsWithSetter() {
  const [searchParams] = _useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const setSearchParams = useCallback(
    (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(window.location.search);
      if (value === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
      router.push(`${pathName}?${newSearchParams.toString()}`);
    },
    [pathName, router]
  );

  return useMemo(
    () => ({
      searchParams,
      setSearchParams,
    }),
    [searchParams, setSearchParams]
  );
}
