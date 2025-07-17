import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-4">BullsAI Clone</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/"><a>Home</a></Link>
          <Link href="/odyssey"><a>Odyssey</a></Link>
          <Link href="/broking-details"><a>Broking Details</a></Link>
          <Link href="/live/pnl-book"><a>P&L Book</a></Link>
          <Link href="/live/trade-book"><a>Trade Book</a></Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-800 text-white p-6">
        {children}
      </main>
    </div>
  );
}

