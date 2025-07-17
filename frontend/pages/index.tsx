// frontend/pages/index.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Trading AI Free</h1>
      <ul className="space-y-4 text-lg">
        <li>
          <Link href="/odyssey">
            <a className="text-yellow-400 hover:underline">
              Odyssey (Marketplace)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/broking-details">
            <a className="text-yellow-400 hover:underline">
              Broking Details
            </a>
          </Link>
        </li>
        <li>
          <Link href="/live/pnl-book">
            <a className="text-yellow-400 hover:underline">
              P&amp;L Book (Beta)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/live/trade-book">
            <a className="text-yellow-400 hover:underline">
              Trade Book
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

