'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface FeedbackFormProps {
  eventId: number | string; // Adjust type based on your needs
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ eventId }) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!message) {
      setError('Message is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/feedback', {
        message,
        eventId,
      });
      setSuccess('Feedback submitted successfully');
      setMessage('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">Leave Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded mb-2 resize-none"
          placeholder="Your feedback..."
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
