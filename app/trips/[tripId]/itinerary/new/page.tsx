import NewLocationClient from '@/components/NewLocationClient';

const NewLocationPage = async ({ params }) => {
  const { tripId } = await params;
  return <NewLocationClient tripId={tripId} />;
};

export default NewLocationPage;
