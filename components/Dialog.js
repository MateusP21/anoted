import { Dialog, Transition } from '@headlessui/react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { forwardRef, Fragment, useState, useImperativeHandle } from 'react';
import { db } from '../services/firebase';

const MyModal = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useImperativeHandle(ref, () => ({
    openModal: openModal,
  }));

  const saveNote = async () => {
    console.log('hello');
    const note = {
      title,
      body,
    };

    try {
      await addDoc(collection(db, 'note'), note);
      console.log('dados salvos');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white border-2 border-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    O que você está pensando agora?
                  </Dialog.Title>
                  <div className="mt-4">
                    <form className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titulo"
                        className="border-2 border-black p-2 w-full"
                      />
                      <textarea
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Me conta um pouco sobre isso..."
                        className="border-2 border-black p-2 resize-none w-full h-96"
                      />
                    </form>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center  transition-colors px-4 py-2 text-sm font-medium border-2 border-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={saveNote}
                    >
                      Guardar Nota
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center  transition-colors px-4 py-2 text-sm font-medium border-2 border-black hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

MyModal.displayName = 'Note Modal';
export default MyModal;
