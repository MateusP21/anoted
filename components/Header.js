/* eslint-disable @next/next/no-img-element */
import { Plus } from 'phosphor-react';
import { createRef, useRef } from 'react';
import MyDialog from './Dialog';
const Header = () => {
  const modalRef = useRef();
  const handleModal = () => {
    modalRef.current.openModal();
  };
  return (
    <>
      <header className="flex items-center bg-green-100 border-2 border-black justify-between p-2 m-4 ">
        <div className="flex gap-4">
          <img
            className="w-10 h-10 object-cover border-2 border-black"
            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
          <div>
            <p className="text-sm">Hello 👋</p>
            <h2 className="text-lg font-bold">Mateus!</h2>
          </div>
        </div>
        <div>
          <button
            title="Add Note"
            className="bg-yellow-400 p-1 border-2 border-black flex items-center"
          >
            <Plus
              size={16}
              onClick={handleModal}
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
