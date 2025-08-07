'use client';
import { SignInButton } from '@clerk/nextjs';
import React from 'react';
import { Button } from './ui/button';

const LoginButton = () => {
  return (
    <Button asChild>
      <SignInButton>Sign In</SignInButton>
    </Button>
  );
};

export default LoginButton;
