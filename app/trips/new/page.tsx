import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const NewTrip = () => {
  return (
    <div className='max-w-lg mx-auto mt-10'>
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form action='' className='space-y-6'>
            <div>
              <Label htmlFor='title' title='Title' className='mt-2 mb-2'>
                Title
              </Label>
              <Input type='text' name='title' placeholder='Enter Trip Name' />
              {/* <input
                placeholder='Enter Trip Name'
                type='text'
                name='title'
                className='w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              /> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
