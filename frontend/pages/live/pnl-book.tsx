// frontend/pages/live/pnl-book.tsx

import useSWR from "swr";
import Layout from "../../components/Layout";
import CardMetric from "../../components/CardMetric";
import HeatmapCalendar from "../../components/HeatmapCalendar";

type PnlMetrics = {
  grossRoi: number;         // total ROI in currency
  volume: number;           // total trading volume
  trades: number;           // number of trades
};

type PnlRow = {
  id: string;
  mode: string;
  strategy: string;
  entryTime: string;
  exitTime: string;
  pnlPct: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PnlBookPage() {
  const { data, error } = useSWR<{
    metrics: PnlMetrics;
    heatmap: Record<string, number>;
    rows: PnlRow[];
  }>("/api/live/pnl", fetcher);

  if (error) {
    return (
      <Layout>
        <p className="text-red-400">Failed to load P&L data.</p>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <p>Loading P&L book…</p>
      </Layout>
    );
  }

  const { metrics, heatmap, rows } = data;

  return (
    <Layout>
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <CardMetric label="Gross ROI" value={`₹${metrics.grossRoi.toLocaleString()}`} />
        <CardMetric label="Trading Volume" value={`₹${metrics.volume.toLocaleString()}`} />
        <CardMetric label="Total Trades" value={metrics.trades} />
      </div>

      {/* Heatmap Calendar */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">P&L Heatmap</h2>
        <HeatmapCalendar data={heatmap} />
      </div>

      {/* P&L Table */}
      <div className="overflow-x-auto bg-gray-800 rounded">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Strategy</th>
              <th className="px-4 py-2 text-left">Entry Time</th>
              <th className="px-4 py-2 text-left">Exit Time</th>
              <th className="px-4 py-2 text-left">P&L (%)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{r.mode}</td>
                <td className="px-4 py-2">{r.strategy}</td>
                <td className="px-4 py-2">{r.entryTime}</td>
                <td className="px-4 py-2">{r.exitTime}</td>
                <td
                  className={`px-4 py-2 ${
                    r.pnlPct >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {r.pnlPct.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

