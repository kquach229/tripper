import TripDetailsClient from '@/components/TripDetailsClient';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const TripDetails = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const session = await auth();
  if (!session.userId) return <div>Please Sign In</div>;
  const { tripId } = await params;
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
      userId: session.userId,
    },
  });

  if (!trip) return <div>Trip Not Found</div>;

  return <TripDetailsClient trip={trip} />;
};

export default TripDetails;
