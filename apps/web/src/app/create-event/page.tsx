'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FiX } from "react-icons/fi";

enum IsPaidEvent {
  Free = 'Free',
  Paid = 'Paid'
}

const EventForm: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    availableSeats: '',
    isPaidEvent: IsPaidEvent.Free,
    price: '',
    discountCode: '',
    amount: '',
    quotaAvailable: '',
    validUntil: ''
  });
  
  // State for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle input changes for form data
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle isPaidEvent radio button changes
  const handleIsPaidEventChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isPaidEvent: e.target.value as IsPaidEvent,
    });
  };

  // Handle image change and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Add submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mx-[50px] md:mx-[100px] lg:mx-[150px] h-full">
      <div className='pb-8'>
        <h1 className='text-center text-3xl text-white font-bold py-6'>Create Event</h1>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          
          <div className='flex flex-col w-full lg:w-1/2 space-y-4'>
            <div>
              <label className="block text-slate-300">Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Available Seats</label>
              <input
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-slate-300">Event Type</label>
              <div className="mt-1 flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isPaidEvent"
                    value={IsPaidEvent.Free}
                    checked={formData.isPaidEvent === IsPaidEvent.Free}
                    onChange={handleIsPaidEventChange}
                    className="mr-2"
                  />
                  Free
                </label>
                <label>
                  <input
                    type="radio"
                    name="isPaidEvent"
                    value={IsPaidEvent.Paid}
                    checked={formData.isPaidEvent === IsPaidEvent.Paid}
                    onChange={handleIsPaidEventChange}
                    className="mr-2"
                  />
                  Paid
                </label>
              </div>
            </div>

            {formData.isPaidEvent === IsPaidEvent.Paid && (
              <div>
                <label className="block text-slate-300">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                />
                <div>
                  <label className="block text-slate-300">Discount Code</label>
                  <input
                    type="text"
                    name="discountCode"
                    value={formData.discountCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                    placeholder="Enter discount code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300">Amount (Percentage %)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                    placeholder="Enter discount amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300">Quota Available</label>
                  <input
                    type="number"
                    name="quotaAvailable"
                    value={formData.quotaAvailable}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                    placeholder="Enter available quota"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300">Valid Until</label>
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col items-center w-full lg:w-1/2 pt-7'>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[80%] h-[80%] flex flex-col items-center justify-center hover:border-blue-500 transition duration-300">
              {imagePreview ? (
                <img src={imagePreview} alt="Uploaded Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <svg
                    className="w-12 h-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V8m4 4l4-4m0 8l-4-4m-4-2a4 4 0 118-0 4 4 0 01-8 0z" />
                  </svg>
                  <span>Upload Image</span>
                </div>
              )}
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              className="mt-4"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full lg:w-1/4 mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
