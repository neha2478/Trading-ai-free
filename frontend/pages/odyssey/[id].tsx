// frontend/pages/odyssey/[id].tsx

import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";

type StrategyDetail = {
  id: string;
  name: string;
  description: string;
  minCapital: number;
  instruments: string[];
  parameters: Record<string, string | number>;
  mode: "INTRADAY" | "DELIVERY" | "SWING";
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OdysseyDetail() {
  const { query, isFallback } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const { data, error } = useSWR<StrategyDetail>(
    id ? `/api/odyssey/${id}` : null,
    fetcher
  );

  if (isFallback || !data) {
    return (
      <Layout>
        <p>Loading strategy...</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <p className="text-red-400">Error loading strategy.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <p className="mb-6">{data.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instruments</h2>
        <ul className="list-disc list-inside">
          {data.instruments.map((ins) => (
            <li key={ins}>{ins}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mode &amp; Capital</h2>
        <p>
          <strong>Mode:</strong> {data.mode}
        </p>
        <p>
          <strong>Min. Capital:</strong> ₹{data.minCapital.toLocaleString()}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Parameters</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-1 text-left">Name</th>
              <th className="border px-3 py-1 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.parameters).map(([key, val]) => (
              <tr key={key}>
                <td className="border px-3 py-1">{key}</td>
                <td className="border px-3 py-1">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
// frontend/pages/odyssey/[id].tsx

import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";

type StrategyDetail = {
  id: string;
  name: string;
  description: string;
  minCapital: number;
  instruments: string[];
  parameters: Record<string, string | number>;
  mode: "INTRADAY" | "DELIVERY" | "SWING";
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OdysseyDetail() {
  const { query, isFallback } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const { data, error } = useSWR<StrategyDetail>(
    id ? `/api/odyssey/${id}` : null,
    fetcher
  );

  if (isFallback || !data) {
    return (
      <Layout>
        <p>Loading strategy...</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <p className="text-red-400">Error loading strategy.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <p className="mb-6">{data.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instruments</h2>
        <ul className="list-disc list-inside">
          {data.instruments.map((ins) => (
            <li key={ins}>{ins}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mode &amp; Capital</h2>
        <p>
          <strong>Mode:</strong> {data.mode}
        </p>
        <p>
          <strong>Min. Capital:</strong> ₹{data.minCapital.toLocaleString()}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Parameters</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-1 text-left">Name</th>
              <th className="border px-3 py-1 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.parameters).map(([key, val]) => (
              <tr key={key}>
                <td className="border px-3 py-1">{key}</td>
                <td className="border px-3 py-1">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}

