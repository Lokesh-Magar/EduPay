"use client";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FailurePage: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (itemId && status) {
      // Optionally, update invoice status via an API call
      fetch(`/api/update-invoice?itemId=${itemId}&status=${status}`)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage('Error updating invoice status.'));
    }
  }, [itemId, status]);

  return (
    <div>
      <h1>Payment Failed!</h1>
      <p>Invoice ID: {itemId}</p>
      <p>Status: {status}</p>
      <p>{message}</p>
      <p>Press here to go back to the home page:</p>
      <Button onClick={() => router.push('/portal')}></Button>
    </div>
  );
};

export default FailurePage;
