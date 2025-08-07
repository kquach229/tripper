'use client';
import { useEffect } from 'react';

const UserInit = () => {
  useEffect(() => {
    fetch('/api/create-user', { method: 'POST' });
  }, []);
  return null;
};

export default UserInit;
