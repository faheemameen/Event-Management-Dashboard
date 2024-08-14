import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold hover:text-gray-300 transition-colors"
        >
          Home
        </Link>

        <Link
          href="/events/create"
          className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
        >
          Create Event
        </Link>
      </div>
    </nav>
  );
}
