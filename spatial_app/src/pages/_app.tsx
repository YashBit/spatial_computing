import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import '~/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';

  return (
    <main className={`font-sans ${inter.variable}`}>
      <div className={`relative min-h-screen ${isIndexPage ? 'bg-regular' : 'bg-blur'}`}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
