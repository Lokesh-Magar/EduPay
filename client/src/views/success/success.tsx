'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const { itemId,status} = router.query;
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (itemId && status) {
      // Optionally update the invoice status via an API call
      fetch(`/update-invoice?_id=${itemId}&status=${status}`)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage('Error updating invoice status.'));
    }
  }, [itemId, status]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Invoice ID: {itemId}</p>
      <p>Status: {status}</p>
      <p>{message}</p>
      <p>Press here to go back to the home page:</p>
      <Button onClick={() => router.push('/portal')}></Button>
    </div>
  );
};

export default SuccessPage;
