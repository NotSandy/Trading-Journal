import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface EditTradeModalProps {
  id: string;
}

const EditTradeModal: NextPage<EditTradeModalProps> = ({ id }) => {
  let [editTradeIsOpen, setEditTradeIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [ticker, setTicker] = useState("");
  const [expiry, setExpiry] = useState<Date | null>(new Date());
  const [strike, setStrike] = useState("");
  const [strategy, setStrategy] = useState("Call");
  const [quantity, setQuantity] = useState("");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [notes, setNotes] = useState("");

  function closeEditTradeModal() {
    setEditTradeIsOpen(false);
  }

  function openEditTradeModal() {
    setEditTradeIsOpen(true);
    getTrade(id);
  }

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const getTrade = async (id: string) => {
    try {
      const res = await fetch(`/api/trade/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const trade = await res.json();
      setDate(trade.date ? new Date(trade.date) : new Date());
      setTime(trade.time ? new Date(trade.time) : new Date());
      setTicker(trade.ticker ? trade.ticker : "");
      setExpiry(trade.expiry ? new Date(trade.expiry) : new Date());
      setStrike(trade.strike ? trade.strike : "");
      setStrategy(trade.strategy ? trade.strategy : "");
      setQuantity(trade.quantity ? trade.quantity : "");
      setEntry(trade.entry ? trade.entry : "");
      setExit(trade.exit ? trade.exit : "");
      setNotes(trade.notes ? trade.notes : "");
    } catch (error) {
      console.error(error);
    }
  };

  const editTrade = async (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    try {
      const body = {
        id: id,
        date,
        ticker,
        expiry,
        time,
        strike,
        strategy,
        quantity,
        entry,
        exit,
        notes,
      };
      const res = await fetch("/api/trade", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status < 300) {
        refreshData();
      }
      await closeEditTradeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Button type="button" onClick={openEditTradeModal}>
        Edit
      </Button>

      <Transition appear show={editTradeIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEditTradeModal}
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
                  Editing Trade
                </Dialog.Title>
                <form onSubmit={(e) => editTrade(e, id)}>
                  <div className="flex flex-col p-4 space-y-2">
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Date<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="date"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        onChange={(e) => setDate(e.target.valueAsDate)}
                        value={date?.toISOString().substring(0, 10)}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Time<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="time"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        onChange={(e) => setTime(e.target.valueAsDate)}
                        value={time?.toTimeString().substring(0, 5)}
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Ticker<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="text"
                        className="block w-full px-4 uppercase transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Ticker"
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        value={ticker}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Expiry<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="date"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        onChange={(e) => setExpiry(e.target.valueAsDate)}
                        value={expiry?.toISOString().substring(0, 10)}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Strike<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="number"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Strike"
                        onChange={(e) => setStrike(e.target.value)}
                        value={strike}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Strategy<span className="text-danger-500"> *</span>
                      </span>
                      <select
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm form-select focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        onChange={(e) => {
                          setStrategy(e.target.value);
                        }}
                        value={strategy}
                        required
                      >
                        <option>Call</option>
                        <option>Put</option>
                      </select>
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Quantity<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="number"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">
                        Entry<span className="text-danger-500"> *</span>
                      </span>
                      <input
                        type="number"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Entry"
                        onChange={(e) => setEntry(e.target.value)}
                        value={entry}
                        required
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">Exit</span>
                      <input
                        type="number"
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Exit"
                        onChange={(e) => setExit(e.target.value)}
                        value={exit}
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span className="text-neutral-100">Notes</span>
                      <textarea
                        className="block w-full px-4 transition duration-500 border-0 rounded-md shadow-sm form-textarea focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                        placeholder="Notes"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                      />
                    </label>
                  </div>
                  <div className="flex justify-between p-4">
                    <Button
                      type="button"
                      className="!text-danger-500"
                      onClick={closeEditTradeModal}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Edit Trade</Button>
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

export default EditTradeModal;