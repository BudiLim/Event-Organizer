// components/FeedbackList.tsx

'use client';
import { useEffect, useState } from 'react';

interface Feedback {
  id: number;
  message: string;
  createdAt: string;
}

interface FeedbackListProps {
  eventId: number | string; // Adjust type as needed
}

const FeedbackList: React.FC<FeedbackListProps> = ({ eventId }) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/feedback/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data.feedback); // Adjust based on your actual response structure
          setError('');
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.msg}`);
        }
      } catch (error) {
        setError('Error fetching feedback. Please try again.');
      }
    };

    fetchFeedback();
  }, [eventId]); // Add eventId as a dependency

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-4 sm:text-3xl">Feedback List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {feedbackList.length > 0 ? (
        <ul className="space-y-4">
          {feedbackList.map((feedback) => (
            <li key={feedback.id} className="p-4 border border-gray-300 rounded-lg shadow-md">
              <p className="font-semibold text-lg">{feedback.message}</p>
              <p className="text-gray-500 text-sm mt-1">{new Date(feedback.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No feedback yet. Be the first to submit!</p>
      )}
    </div>
  );
};

export default FeedbackList;
