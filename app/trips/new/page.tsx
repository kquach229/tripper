'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createTrip } from '@/lib/actions/createTrip';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState();
  return (
    <div className='max-w-lg mx-auto mt-10'>
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            action={(formData) => {
              startTransition(() => {
                if (imageUrl) {
                  formData.append('imageUrl', imageUrl);
                }
                createTrip(formData);
              });
            }}
            className='space-y-6'>
            <div>
              <Label htmlFor='title' title='Title' className='mt-2 mb-2'>
                Title
              </Label>
              <Input
                required
                type='text'
                name='title'
                placeholder='Enter Trip Name'
              />
              {/* <input
                placeholder='Enter Trip Name'
                type='text'
                name='title'
                className='w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              /> */}
              <Label htmlFor='description' title='Title' className='mt-2 mb-2'>
                Description
              </Label>
              <Textarea
                name='description'
                placeholder='Trip Description'
                required
              />
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label
                    htmlFor='startDate'
                    title='Title'
                    className='mt-2 mb-2'>
                    Start Date
                  </Label>
                  <Input name='startDate' type='date' />
                </div>
                <div>
                  <Label htmlFor='endDate' title='Title' className='mt-2 mb-2'>
                    End Date
                  </Label>
                  <Input name='endDate' type='date' />
                </div>
              </div>
            </div>
            <div>
              <Label>Trip Image</Label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={300}
                  height={100}
                  alt='trip image preview'
                  className='w-full mb-4 rounded-md max-h-48 object-cover'
                />
              )}
              <UploadButton
                endpoint='imageUploader'
                onUploadError={(error: Error) => {
                  console.error('upload error: ', error);
                }}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
              />
            </div>
            <Button disabled={isPending} type='submit' className='w-full'>
              {isPending ? 'Creating...' : 'Create Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
