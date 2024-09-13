'use client';
import { useState } from 'react';
import { FiX } from "react-icons/fi";

enum IsPaidEvent {
  Free = 'Free',
  Paid = 'Paid'
}

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    date: '',
    time: '',
    location: '',
    description: '',
    image: null as File | null,
    availableSeats: 0,
    isPaidEvent: '',
    discountCode: '',
    amount: 0,
    quotaAvailable: 0,
    validUntil: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleIsPaidEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isPaid = e.target.value === IsPaidEvent.Paid;
    setFormData({
      ...formData,
      isPaidEvent: isPaid ? IsPaidEvent.Paid : IsPaidEvent.Free,
      price: isPaid ? formData.price : 0,
    });
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mx-[50px] md:mx-[100px] lg:mx-[150px] h-full ">
      <div className='pb-8'>
        <h1 className='text-center text-3xl text-white font-bold py-6'>Create Event</h1>
        <div className='flex flex-col lg:flex-row lg:justify-between '>

          <div className='flex flex-col w-full lg:w-1/2 space-y-4'>
            <div>
              <label className="block text-slate-300">Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300">Available Seats</label>
              <input
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
                />
                <div>
                <div>
                    <label className="block text-slate-300">Discount Code</label>
                    <input
                        type="text"
                        name="discountCode"
                        value={formData.discountCode}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
                        placeholder="Enter discount code"
                        required
                    />
                </div>

                <div>
                    <label className="block text-slate-300">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white"
                        required
                    />
                </div>

                <div className="flex justify-center py-8">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Create Discount
                    </button>
                </div>
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
                  <span>upload image</span>
                </div>
              )}
            </div>

            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              accept="image/*"
            />
            <label htmlFor="image-upload" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer hover:bg-blue-600 transition">Choose Image</label>

            {imagePreview && (
              <div className='pt-2 text-red-500'>
              <FiX onClick={() => setImagePreview(null)} size={25}/>
              </div> 
            )}
          </div>
        </div>



        <div className='flex justify-center pt-8'>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
