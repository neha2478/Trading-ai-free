// frontend/pages/broking-details.tsx

import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";

type Broker = {
  id: string;
  name: string;
  type: string;
  isPrimary: boolean;
  sessionExpired: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BrokingDetails() {
  const { data, error, mutate } = useSWR<{ brokers: Broker[] }>(
    "/api/brokers",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);

  if (error)
    return (
      <Layout>
        <p className="text-red-500">Failed to load broker details.</p>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <p>Loading brokers…</p>
      </Layout>
    );

  async function handleAddBroker(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newBroker = {
      name: formData.get("name"),
      type: formData.get("type"),
    };
    await fetch("/api/brokers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBroker),
    });
    mutate(); // re-fetch list
    setShowForm(false);
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Broking Details</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 text-black px-4 py-2 rounded"
        >
          + Add Broker
        </button>
      </div>

      <div className="space-y-4">
        {data.brokers.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h2 className="font-semibold">{b.name}</h2>
              <p className="text-sm">{b.type}</p>
            </div>
            <div className="flex items-center space-x-4">
              {b.sessionExpired && (
                <button
                  onClick={() => {
                    /* trigger re-login flow */
                  }}
                  className="text-red-500 underline"
                >
                  Re-Login
                </button>
              )}
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={b.isPrimary}
                  onChange={async () => {
                    await fetch(`/api/brokers/${b.id}/primary`, {
                      method: "PUT",
                    });
                    mutate();
                  }}
                />
                <span>Primary</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Add New Broker</h2>
            <form onSubmit={handleAddBroker}>
              <div className="mb-4">
                <label className="block mb-1">Broker Name</label>
                <input
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Broker Type</label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="FYERS">FYERS</option>
                  <option value="KITE">KITE Connect</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-400 px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

