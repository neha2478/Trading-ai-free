export default function Pagination({
  page, total, onPage,
}: { page: number; total: number; onPage: (p: number) => void }) {
  return (
    <div className="flex space-x-2 mt-4">
      <button onClick={() => onPage(page-1)} disabled={page<=1} className="px-3 py-1 bg-gray-700 rounded">Prev</button>
      <span>{page} / {total}</span>
      <button onClick={() => onPage(page+1)} disabled={page>=total} className="px-3 py-1 bg-gray-700 rounded">Next</button>
    </div>
  );
}

