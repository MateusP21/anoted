import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== 'SIGNED_OUT') {
      router.push('/');
    }
  });
  return (
    <div className="h-screen flex items-center bg-orange-400 justify-center">
      <section className="p-4 md:mt-4 w-full h-full md:h-max md:w-[24rem] mx-auto bg-slate-100 border-2 border-black">
        <h1 className="text-2xl font-bold uppercase text-center">
          Anoted Login
        </h1>
        <Auth
          showLinks={true}
          magicLink={true}
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              input: {
                borderRadius: '0',
                border: 'solid 2px black',
                background: 'transparent',
                color: 'black',
                fontWeight: 'bold',
              },
              button: {
                backgroundColor: '#4ADE80',
                color: 'black',
                fontWeight: 'bold',
                border: 'solid 2px black',
                borderRadius: '0',
              },
            },
          }}
        />
      </section>
    </div>
  );
}
