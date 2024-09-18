// components/FeedbackForm.tsx

'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Message is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Feedback submitted successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while submitting feedback');
    }
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-8">
      <h1 className="text-2xl font-semibold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 mb-4 resize-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your feedback here..."
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className='flex justify-center '>
        <button
          type="submit"
          className="flex justify-center w-1/5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
