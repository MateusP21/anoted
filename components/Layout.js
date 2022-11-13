import Header from './Header';
import { useSession } from '@supabase/auth-helpers-react';
export default function Layout({ children }) {
  const session = useSession();
  return (
    <>
      {session && <Header />}
      {children}
    </>
  );
}
