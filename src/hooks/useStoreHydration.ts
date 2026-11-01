import { useEffect, useState } from 'react';
import { useStore } from '../stores/useStore';

export function useStoreHydration() {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  return hydrated;
}