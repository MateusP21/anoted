import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useEffect } from 'react';
const AppContext = createContext();

export function AppProvider(props) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_OUT':
          router.push('/auth/login');
          break;
        case 'SIGNED_IN':
          router.push('/');
          break;
        case 'USER_UPDATED':
          router.push('/');
          break;
        default:
          break;
      }
    });
  }, [router, supabase.auth]);

  return (
    <AppContext.Provider value={{ userInfo }}>
      {props.children}
    </AppContext.Provider>
  );
}
