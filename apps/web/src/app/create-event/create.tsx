// 'use client'
// import { useState } from "react";

// const EventForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     date: '',
//     time: '',
//     location: '',
//     description: '',
//     availableSeats: '',
//     isPaidEvent: 'Free',
//     price: '',
//     sellEndDate: '',
//     sellEndTime: '',
//     discountCode: '',
//     amount: '',
//     quotaAvailable: '',
//     validUntil: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('http://localhost:8000/api/create-event', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert('Event created successfully!');
//     } else {
//       console.log('Error:', data);
//       alert(`Error: ${data.message}`);
//     }
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     alert('An error occurred while creating the event');
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Event Name */}
//       <div>
//         <label className="block text-slate-300">Event Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Event Date */}
//       <div>
//         <label className="block text-slate-300">Event Date</label>
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Event Time */}
//       <div>
//         <label className="block text-slate-300">Event Time</label>
//         <input
//           type="time"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block text-slate-300">Location</label>
//         <input
//           type="text"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-slate-300">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         ></textarea>
//       </div>

//       {/* Available Seats */}
//       <div>
//         <label className="block text-slate-300">Available Seats</label>
//         <input
//           type="number"
//           name="availableSeats"
//           value={formData.availableSeats}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Is Paid Event */}
//       <div>
//         <label className="block text-slate-300">Is this a paid event?</label>
//         <select
//           name="isPaidEvent"
//           value={formData.isPaidEvent}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         >
//           <option value="Free">Free</option>
//           <option value="Paid">Paid</option>
//         </select>
//       </div>

//       {/* Price (only if Paid) */}
//       {formData.isPaidEvent === "Paid" && (
//         <div>
//           <label className="block text-slate-300">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//           />
//         </div>
//       )}

//       {/* Sell End Date */}
//       <div>
//         <label className="block text-slate-300">Sell End Date</label>
//         <input
//           type="date"
//           name="sellEndDate"
//           value={formData.sellEndDate}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Sell End Time */}
//       <div>
//         <label className="block text-slate-300">Sell End Time</label>
//         <input
//           type="time"
//           name="sellEndTime"
//           value={formData.sellEndTime}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Discount Code */}
//       <div>
//         <label className="block text-slate-300">Discount Code</label>
//         <input
//           type="text"
//           name="discountCode"
//           value={formData.discountCode}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Discount Amount */}
//       <div>
//         <label className="block text-slate-300">Discount Amount</label>
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Quota Available */}
//       <div>
//         <label className="block text-slate-300">Quota Available</label>
//         <input
//           type="number"
//           name="quotaAvailable"
//           value={formData.quotaAvailable}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Valid Until (for discounts) */}
//       <div>
//         <label className="block text-slate-300">Discount Valid Until</label>
//         <input
//           type="date"
//           name="validUntil"
//           value={formData.validUntil}
//           onChange={handleChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
//         />
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//           Create Event
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EventForm;
