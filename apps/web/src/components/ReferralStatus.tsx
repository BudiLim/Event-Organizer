// components/ReferralStatus.tsx
import React, { useEffect, useState } from 'react';
import { Referral } from '@/type/user';

const ReferralStatus: React.FC = () => {
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await fetch('/api/referral'); // Adjust this URL based on your API route
        if (!response.ok) {
          throw new Error('Failed to fetch referral data');
        }
        const data: Referral = await response.json();
        setReferral(data);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!referral) return <p>No referral data available</p>;

  const isExpired = referral.expired || new Date() > new Date(referral.expiresAt);

  return (
    <div>
      <h3>Referral Status</h3>
      {isExpired ? (
        <p style={{ color: 'red' }}>This referral has expired.</p>
      ) : (
        <p>Referral is active. Expires on: {new Date(referral.expiresAt).toLocaleString()}</p>
      )}
    </div>
  );
};

export default ReferralStatus;
