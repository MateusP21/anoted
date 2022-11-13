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
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar_url, setAvatarUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
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
  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppContext.Provider value={{ username, setUsername, getProfile }}>
      {props.children}
    </AppContext.Provider>
  );
}
