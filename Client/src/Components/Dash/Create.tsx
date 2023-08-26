import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "../ui/input";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  modalOpen: boolean;
  changeOpenState: (state: boolean) => void;
};

export default function CreateModal(props: Props) {
  const [open, setOpen] = useState<boolean>(props.modalOpen);
  const [boardName, setBordName] = useState<string>("");
  const cancelButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(props.modalOpen);
  }, [props.modalOpen]);

  const handleBoardCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Send board name and userid for creation and assignment
    const userID = getAuth().currentUser?.uid;
    axios
      .post("http://localhost:3000/api/boards/create", {
        boardName: boardName,
        userID: userID,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(`board/${res.data}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //Upon success navigate to newly created board
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          props.changeOpenState(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-100/90 dark:bg-zinc-900/90  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <header className="flex justify-center items-center  p-4">
                  <h1 className="text-xl font-bold text-zinc-900/80 dark:text-zinc-100/90 ">
                    Create a new board
                  </h1>
                </header>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    handleBoardCreation(e);
                    setOpen(false);
                    props.changeOpenState(false);
                  }}
                >
                  <main className="bg-inherit px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:flex sm:items-start ">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 flex text-zinc-800/80 dark:text-zinc-200/80"
                      >
                        Board Name
                        <p className="text-red-400 ml-1">*</p>
                      </Dialog.Title>
                      <div className="my-4">
                        <Input
                          type="text"
                          name="boardName"
                          className="bg-zinc-200 dark:bg-zinc-800"
                          required
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setBordName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </main>
                  <footer className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md font-semibold bg-zinc-800 hover:bg-zinc-800/90 dark:bg-zinc-200 dark:hover:bg-zinc-400 transition-all text-zinc-100 dark:text-zinc-900 px-3 py-2 text-sm   shadow-sm  sm:ml-3 sm:w-auto"
                    >
                      Create Board
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-zinc-300 hover:bg-zinc-300  dark:border-zinc-700 dark:hover:bg-zinc-700 transition-all px-3 py-2 text-sm font-semibold  shadow-sm sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        props.changeOpenState(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </footer>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
