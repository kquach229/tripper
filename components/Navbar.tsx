import Image from 'next/image';
import Link from 'next/link';
import LoginButton from './LoginButton';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className='bg-white shadow-md py-4 border-b border-gray-200'>
      <div className='container mx-auto flex justify-between items-center px-6 lg:px-8'>
        <Link className='flex items-center' href='/'>
          <Image src={'/logo.svg'} alt='logo' width={80} height={80} />
          <span className='text-2xl font-bold text-gray-800'>Tripper</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <SignedIn>
            <Link className='text-slate-900 hover:text-sky-500' href={'/trips'}>
              My Trips
            </Link>
            <Link className='text-slate-900 hover:text-sky-500' href={'/globe'}>
              Globe
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <LoginButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
