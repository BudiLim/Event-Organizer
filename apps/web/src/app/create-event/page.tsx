'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '@/lib/server';
import { DecodedToken } from '@/type/user';


const CreateEvent = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    description: '',
    isPaidEvent: '',
    availableSeats: '',
    eventDate: '',
    eventTime: '',
    sellEndDate: '',
    sellEndTime: '',
    discountCode: '',
    amount: '',
    quotaAvailable: '',
    validUntil: '',
    image: null as File | null, // Pastikan tipe image adalah File atau null
    organizerId: '',
    category: ''
  });

  const [hasExperience, setHasExperience] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const token = await getToken(); // Await the Promise
      if (token) {
        const decodedToken:DecodedToken = jwtDecode(token);
        if (decodedToken.userType !== 'Organizer') {
          router.push('/unauthorized')
        }
      }
    };

    checkUser();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as keyof typeof formData]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // Looping over formData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        // Handle image separately as it is a File
        formDataToSend.append(key, value instanceof File ? value : value as string);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/api/create-event', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success('Event created successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/event')
      } else {
        const error = await response.json();
        alert(`Error: ${error.msg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the event');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 text-white ">
      <div className='shadow-white shadow-sm p-6 rounded-lg '>

      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          >
            <option value="SINGLEBAND">Single Band</option>
            <option value="GROUPBAND">Group Band</option>
            <option value="DISC_JORKEY">Disc Jorkey</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Is this a Paid Event?</label>
          <select
            name="isPaidEvent"
            value={formData.isPaidEvent}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {formData.isPaidEvent === 'Paid' && (
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block mb-2">Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Event Time</label>
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Sell End Date</label>
          <input
            type="date"
            name="sellEndDate"
            value={formData.sellEndDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Sell End Time</label>
          <input
            type="time"
            name="sellEndTime"
            value={formData.sellEndTime}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Upload Event Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        {formData.image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Event Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        <div>
          <label className="block mb-2">Organizer ID</label>
          <input
            type="text"
            name="organizerId"
            value={formData.organizerId}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        {formData.isPaidEvent === 'Paid' && (
        <>
          <div className="mt-4">
            <label className="block mb-2">Discount Code</label>
            <input
              type="text"
              name="discountCode"
              value={formData.discountCode}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Discount Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Quota Available</label>
            <input
              type="number"
              name="quotaAvailable"
              value={formData.quotaAvailable}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Valid Until</label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
        </>
      )}

        <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded">
          Create Event
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateEvent;
