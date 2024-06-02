import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-transparent">
      <ul className="flex">
        <li>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>
        </li>
      </ul>
      <ul className="flex">
        <li className="ml-4">
          <Link href="/about">
            <div className="link  text-white">About</div>
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/convert_now">
            <div className="link text-white">Convert Now</div>
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/contact_us">
            <div className="link text-white">Contact</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
