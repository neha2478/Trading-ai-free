// frontend/pages/live/trade-book.tsx

import useSWR from "swr";
import Layout from "../../components/Layout";
import CardMetric from "../../components/CardMetric";
import HeatmapCalendar from "../../components/HeatmapCalendar";

type TradeMetrics = {
  volume: number;   // total trading volume
  orders: number;   // total number of orders
};

type TradeRow = {
  id: string;
  mode: string;
  strategy: string;
  broker: string;
  brokerOrderId: string;
  bullsaiOrderId: string;
  transaction: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TradeBookPage() {
  const { data, error } = useSWR<{
    metrics: TradeMetrics;
    heatmap: Record<string, number>;
    rows: TradeRow[];
  }>("/api/live/tradebook", fetcher);

  if (error) {
    return (
      <Layout>
        <p className="text-red-400">Failed to load trade book.</p>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <p>Loading trade history…</p>
      </Layout>
    );
  }

  const { metrics, heatmap, rows } = data;

  return (
    <Layout>
      {/* Top Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <CardMetric label="Trading Volume" value={`₹${metrics.volume.toLocaleString()}`} />
        <CardMetric label="Total Orders" value={metrics.orders} />
      </div>

      {/* Heatmap Calendar */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Heatmap</h2>
        <HeatmapCalendar data={heatmap} />
      </div>

      {/* Trade History Table */}
      <div className="overflow-x-auto bg-gray-800 rounded">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Strategy</th>
              <th className="px-4 py-2 text-left">Broker</th>
              <th className="px-4 py-2 text-left">Broker Order ID</th>
              <th className="px-4 py-2 text-left">BullsAI Order ID</th>
              <th className="px-4 py-2 text-left">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{r.mode}</td>
                <td className="px-4 py-2">{r.strategy}</td>
                <td className="px-4 py-2">{r.broker}</td>
                <td className="px-4 py-2">{r.brokerOrderId}</td>
                <td className="px-4 py-2">{r.bullsaiOrderId}</td>
                <td className="px-4 py-2">{r.transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

