/* eslint-disable @next/next/no-img-element */

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Plus, SignOut, UserCircle } from 'phosphor-react';
import { useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import MyDialog from './Dialog';

const Header = () => {
  const supabase = useSupabaseClient();
  const data = useContext(AppContext);
  const router = useRouter();
  const modalRef = useRef();

  const handleModal = () => {
    modalRef.current.openModal();
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-2 m-4 bg-white border-4 border-black ">
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
            <h2 className="text-lg font-bold">{data.username}!</h2>
          </div>
        </div>
        <div>
          <h1 className="text-2xl tracking-widest font-bold border-4 px-2 border-black hover:bg-black hover:text-white transition-all cursor-pointer">
            <Link href={'/'}> ANOTED</Link>
          </h1>
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
          <Link href={'/account'}>
            <button
              title="User Profile"
              className="bg-red-500 p-1  border-2 border-black shadow-[2px_2px] flex items-center"
            >
              <UserCircle size={20} color="#0f0000" weight="bold" />
            </button>
          </Link>
          <button
            title="Sign Out"
            className="bg-blue-500 p-1  border-2 border-black shadow-[2px_2px] flex items-center"
          >
            <SignOut
              size={20}
              onClick={() => handleSignOut()}
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
