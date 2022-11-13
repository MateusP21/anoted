import { useState, useEffect, useContext } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function Account({ user }) {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const {
    username,
    loading,
    setLoading,
    setUsername,
    website,
    setWebsite,
    avatar_url,
    setAvatarUrl,
    getProfile,
  } = useContext(AppContext);
  const supabase = useSupabaseClient();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function updateProfile({ username, website, avatar_url }) {
    try {
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
      getProfile();
    }
  }

  return (
    <>
      <section className="p-4 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(updateProfile)}
          className="bg-blue-100 w-full max-w-4xl p-4 flex flex-col gap-8 border-2 border-black"
        >
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
              defaultValue={username}
              {...register('username')}
              className="border-2 border-black p-2 transition-all outline-none focus:shadow-[2px_2px]"
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
              type="website"
              {...register('website')}
              className="border-2 border-black p-2 transition-all outline-none focus:shadow-[2px_2px]"
            />
          </div>

          <div className="grid grid-cols-2  gap-2">
            <button
              type="submit"
              className="bg-[#F9B803] text-center p-1 border-2 border-black hover:shadow-none transition-all hover:font-semibold shadow-[2px_2px] "
            >
              Update
            </button>

            <button
              type="button"
              className="bg-red-400 text-center w-full hover:font-semibold p-1 border-2 border-black hover:shadow-none transition-all shadow-[2px_2px] "
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
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
