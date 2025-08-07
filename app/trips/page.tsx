import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const TripsPage = async () => {
  const currentUser = await auth();
  if (!currentUser.userId) return <div>Please Sign In</div>;
  return (
    <div className='space-y-6 container mx-auto px-4 py-8'>
      <h1>Dashboard</h1>
      <Button asChild>
        <Link href='/trips/new'>Trips</Link>
      </Button>
    </div>
  );
};

export default TripsPage;
