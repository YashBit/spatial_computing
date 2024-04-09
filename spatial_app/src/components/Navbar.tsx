import Link from 'next/link';

export default function Navbar(){
    return (
        <nav>
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
              <Link href="/get_started">
              <div className="link">Get Started</div>
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


