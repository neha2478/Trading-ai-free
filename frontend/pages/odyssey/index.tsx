// frontend/pages/odyssey/index.tsx

import { useState } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import FilterBar from "../../components/FilterBar";
import OdysseyCard from "../../components/OdysseyCard";

type Strategy = {
  id: string;
  name: string;
  description: string;
  minCapital: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Odyssey() {
  const [search, setSearch] = useState("");
  const { data, error } = useSWR<{ strategies: Strategy[] }>(
    `/api/odyssey?query=${encodeURIComponent(search)}`,
    fetcher
  );

  if (error) {
    return (
      <Layout>
        <p className="text-red-400">Failed to load strategies.</p>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <p>Loading strategies…</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <FilterBar search={search} onSearch={setSearch} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.strategies.map((s) => (
          <OdysseyCard
            key={s.id}
            title={s.name}
            desc={s.description}
            minCapital={s.minCapital.toLocaleString()}
          />
        ))}
      </div>
    </Layout>
  );
}

