import Link from 'next/link';

export default function Navbar(){
    return (
        <nav className = "bg-gradient-to-l from-[#9B2929] to-[#383E78]">
          <ul>
            <li>
              <Link href="/">
              <div className="link">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/about">
              <div className="link">About</div>
              </Link>
            </li>
            <li>
              <Link href="/convert_now">
              <div className="link">Convert Now</div>
              </Link>
            </li>
            <li>
              <Link href="/help">
              <div className="link">Help</div>
              </Link>
            </li>
          </ul>
        </nav>
      );
}


