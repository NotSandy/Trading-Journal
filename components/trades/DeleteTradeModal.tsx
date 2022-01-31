import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface DeleteTradeModalProps {
  id: string;
}

const DeleteTradeModal: NextPage<DeleteTradeModalProps> = ({ id }) => {
  let [deleteTradeIsOpen, setDeleteTradeIsOpen] = useState(false);

  function closeDeleteTradeModal() {
    setDeleteTradeIsOpen(false);
  }

  function openDeleteTradeModal() {
    setDeleteTradeIsOpen(true);
  }

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteTrade = async (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    try {
      const body = {
        id: id,
      };
      const res = await fetch("/api/trade", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status < 300) {
        refreshData();
      }
      await closeDeleteTradeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        type="button"
        onClick={openDeleteTradeModal}
        className="!text-danger-500"
      >
        Delete
      </Button>

      <Transition appear show={deleteTradeIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDeleteTradeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-75 bg-neutral-1000" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-sm mt-24 mb-16 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-xl md:ml-16 sm:max-w-md bg-neutral-800">
                <Dialog.Title
                  as="h3"
                  className="p-4 text-lg font-semibold leading-6 text-neutral-100 font-lg bg-primary-500"
                >
                  Are you sure you want to delete this trade?
                </Dialog.Title>
                <form onSubmit={(e) => deleteTrade(e, id)}>
                  <div className="flex justify-between p-4">
                    <Button type="button" onClick={closeDeleteTradeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" className="!text-danger-500">
                      Delete Trade
                    </Button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default DeleteTradeModal;
