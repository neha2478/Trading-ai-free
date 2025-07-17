export default function OdysseyCard({ title, desc, minCapital }: { title: string; desc: string; minCapital: string }) {
  return (
    <div className="bg-gray-700 p-4 rounded shadow space-y-2">
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm">{desc}</p>
      <p className="text-green-400">₹{minCapital}</p>
      <button className="w-full bg-yellow-500 py-2 rounded">Add to My Portfolio</button>
    </div>
  );
}

