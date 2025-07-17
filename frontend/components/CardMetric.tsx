export default function CardMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-700 p-4 rounded shadow">
      <p className="text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

