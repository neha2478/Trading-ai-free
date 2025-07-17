export default function FilterBar({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (v: string) => void;
}) {
  return (
    <div className="flex mb-4">
      <input
        className="flex-1 p-2 rounded-l bg-gray-700"
        placeholder="Search…"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <button className="bg-yellow-500 px-4 rounded-r">Filter</button>
    </div>
  );
}

