import { useState, useEffect } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react';

export default function Account({ user }) {
  const session = useSession();

  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
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

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="p-4 flex items-center justify-center">
        <div className="bg-blue-100 w-full max-w-4xl p-4 flex flex-col gap-8 border-2 border-black">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs uppercase font-bold tracking-wide"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className="border-2 border-black p-2 transition-all outline-none focus:shadow-[2px_2px] "
              value={user.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-xs uppercase font-bold tracking-wide"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="border-2 border-black p-2 transition-all outline-none focus:shadow-[2px_2px]"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="website"
              className="text-xs uppercase font-bold tracking-wide"
            >
              Website
            </label>
            <input
              id="website"
              type="website"
              className="border-2 border-black p-2 transition-all outline-none focus:shadow-[2px_2px]"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2  gap-2">
            <button
              className="bg-[#F9B803] text-center p-1 border-2 border-black hover:shadow-none transition-all hover:font-semibold shadow-[2px_2px] "
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>

            <button
              className="bg-red-400 text-center w-full hover:font-semibold p-1 border-2 border-black hover:shadow-none transition-all shadow-[2px_2px] "
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
