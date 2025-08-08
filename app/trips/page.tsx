import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const TripsPage = async () => {
  const user = await currentUser();
  const trips = await prisma.trip.findMany({
    where: {
      userId: user?.id,
    },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );
  if (!user) return <div>Please Sign In</div>;
  return (
    <div className='space-y-6 container mx-auto px-4 py-8'>
      <div className='flex items-center justify-between tracking-tight'>
        <h1>Dashboard</h1>
        <Button asChild>
          <Link href='/trips/new'>Trips</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>Welcome back, {user.firstName}</CardHeader>
        <CardContent>
          {trips.length === 0
            ? 'Start planning your trip by clicking the button above.'
            : `You have ${trips.length} ${
                trips.length === 1 ? 'trip' : 'trips'
              } planned. ${
                upcomingTrips.length > 0
                  ? `${upcomingTrips.length} upcoming.`
                  : ''
              }`}
        </CardContent>
      </Card>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card className='flex flex-col items-center justify-center py-8'>
            <CardContent>
              <h3 className='text-xl font-medium mb-2'>No trips yet.</h3>
              <p className='text-center mb-4 max-w-md'>
                Start planning your adventures by creating your first trip
              </p>
              <Button asChild>
                <Link href='/trips/new'>Trips</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {sortedTrips.slice(0, 6).map((trip) => (
              <Link key={trip.id} href={`/trips/${trip.id}`}>
                <Card className='h-full hover:shadow-md transition-shadow'>
                  <CardHeader>
                    <CardTitle className='line-clamp-1'>{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm line-clamp-2 mb-2'>
                      {trip.description}
                    </p>
                    <div className='text-sm'>
                      {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
