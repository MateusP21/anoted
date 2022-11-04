/* eslint-disable @next/next/no-img-element */
import { Plus } from 'phosphor-react';
import { useRef } from 'react';
import MyDialog from './Dialog';
const Header = () => {
  const modalRef = useRef();
  const handleModal = () => {
    modalRef.current.openModal();
  };
  return (
    <>
      <header className="flex items-center  justify-between p-2 m-4 ">
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
            <h2 className="text-lg font-bold">Mateus!</h2>
          </div>
        </div>
        <div>
          <button
            title="Add Note"
            className="bg-[#F9B803] p-1  border-2 border-black shadow-[2px_2px] flex items-center"
          >
            <Plus
              size={20}
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
