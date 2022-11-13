import '../styles/globals.css';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProvider } from '../context/AppContext';
//import Layout from '../components/Layout';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AppProvider>
        <Header />
        <Component {...pageProps} />
      </AppProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
