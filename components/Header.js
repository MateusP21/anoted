/* eslint-disable @next/next/no-img-element */

import { Plus, SignOut, UserCircle } from 'phosphor-react';
import { useRef } from 'react';
import { AppProvider } from '../context/AppContext';
import MyDialog from './Dialog';

const Header = ({ username }) => {
  const modalRef = useRef();

  const handleModal = () => {
    modalRef.current.openModal();
  };

  return (
    <>
      <header className="flex items-center justify-between p-2 m-4 bg-white border-2 border-black ">
        <div className="flex gap-4">
          <div className="flex items-center border-4 border-black w-12 h-12">
            <img
              className="w-full h-full"
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt=""
            />
          </div>

          <div>
            <p className="text-sm">Hello 👋</p>
            <h2 className="text-lg font-bold">{username}!</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            title="Add Note"
            className="bg-yellow-500 p-1 border-2 border-black shadow-[2px_2px] flex items-center"
          >
            <Plus
              size={20}
              onClick={handleModal}
              color="#0f0000"
              weight="bold"
            />
          </button>
          <button
            title="User Profile"
            className="bg-red-500 p-1  border-2 border-black shadow-[2px_2px] flex items-center"
          >
            <UserCircle
              size={20}
              onClick={() => signOut()}
              color="#0f0000"
              weight="bold"
            />
          </button>
          <button
            title="Sign Out"
            className="bg-blue-500 p-1  border-2 border-black shadow-[2px_2px] flex items-center"
          >
            <SignOut
              size={20}
              onClick={() => supabase.auth.signOut()}
              color="#0f0000"
              weight="bold"
            />
          </button>
        </div>
      </header>
      <MyDialog ref={modalRef} />
    </>
  );
};
export default Header;

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session.user.id);

  const [{ username }] = data;

  return {
    props: {
      user: session.user,
      username: username || '',
    },
  };
};
