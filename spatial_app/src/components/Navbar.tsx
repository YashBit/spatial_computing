import Link from 'next/link';

export default function Navbar(){
    return (
        <nav className="bg-gradient-to-l from-[#9B2929] to-[#383E78]">
          <ul className="flex justify-end pr-6 py-3">
            <li>
              <Link href="/">
                <div className="link">Home</div>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/about">
                <div className="link">About</div>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/convert_now">
                <div className="link">Convert Now</div>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/help">
                <div className="link">Help</div>
              </Link>
            </li>
          </ul>
        </nav>
      );
}
