import Link from 'next/link';

/*
  REMOVE THE HOME BUTTON 
  IT SHOULD BE REPLACED WITH THE ICON ON THE LEFT 


*/




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
              <Link href="/pricing">
                <div className="link">Pricing</div>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/convert_now">
                <div className="link">Convert Now</div>
              </Link>
            </li>
           
          </ul>
        </nav>
      );
}
