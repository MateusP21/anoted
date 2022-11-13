import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { useEffect } from 'react';
export const AppContext = createContext();

export function AppProvider(props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      switch (event) {
        case 'SIGNED_OUT':
          router.push('/auth/login');
          break;
        default:
          break;
      }
    });
  }, [supabase.auth]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserInfo = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', session.user.id);

    const [{ username }] = data;
    setUsername(username);
  };
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, username]);

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {props.children}
    </AppContext.Provider>
  );
}
