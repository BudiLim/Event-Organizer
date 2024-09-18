'use client'
import { CardBlog } from "@/components/card";
import { getEvent } from "@/lib/event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Image from 'next/image';
import Link from 'next/link';
import FeedbackForm from "../feedback/page";
import FeedbackList from "../feedback-list/page";

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  sellEndDate: string;
  sellEndTime: string;
  image: string;
  price: number;
  availableSeats: number;
  isPaidEvent: string;
  organizer: {
    id: number;
    name: string;
  };
}

// Define available categories
const categories = [
  { label: "All Categories", value: "" },
  { label: "Single Band", value: "SINGLEBAND" },
  { label: "Group Band", value: "GROUPBAND" },
  { label: "Disc Jockey", value: "DISC_JORKEY" },
];

export default function SearchBlog() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || ""; // Get initial search query from URL
  const queryCategory = searchParams.get("category") || ""; // Get initial category from URL
  const queryLocation = searchParams.get("location") || ""; // Get initial location from URL

  const searchRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState<string>(querySearch); // Initialize with querySearch
  const [category, setCategory] = useState<string>(queryCategory); // Initialize with queryCategory
  const [location, setLocation] = useState<string>(queryLocation); // Initialize with queryLocation
  const [debouncedSearch] = useDebounce(search, 1000); // Debounce the search input to avoid excessive API calls
  const [debouncedLocation] = useDebounce(location, 1000); // Debounce the location input to avoid excessive API calls
  const [feedback, setFeedback] = useState<string>(""); // Feedback input state
  const [feedbackList, setFeedbackList] = useState<string[]>([]); // List of feedbacks
  const router = useRouter();

  const handleSearchChange = () => {
    if (searchRef.current) {
      setSearch(searchRef.current.value); // Update search state when input changes
    }
  };

  const handleLocationChange = () => {
    if (locationRef.current) {
      setLocation(locationRef.current.value); // Update location state when input changes
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value); // Update category state when dropdown changes
  };

  const getData = async () => {
    try {
      // Update URL with the search query, category, and location
      const query = new URLSearchParams();
      if (debouncedSearch) query.set("search", debouncedSearch);
      if (category) query.set("category", category);
      if (debouncedLocation) query.set("location", debouncedLocation);
      router.push(`?${query.toString()}`);

      // Fetch events based on the debounced search value, selected category, and location
      const { event } = await getEvent(debouncedSearch, debouncedLocation, category); // Pass location to the API
      setData(event);
    } catch (err) {
      console.log("Error fetching events:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when debounced search value, category, or location changes
  }, [debouncedSearch, category, debouncedLocation]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      setFeedbackList([...feedbackList, feedback]); // Add new feedback to the list
      setFeedback(""); // Clear the feedback input after submission
    }
  };

  return (
    <div className="pb-8 px-[20px] md:px-[80px] lg:px-[120px]">
      {/* Search Input */}
      <div className="flex flex-col md:flex-row lg:flew-row w-full justify-center gap-4 py-4 ">
        <input
          onChange={handleSearchChange}
          ref={searchRef}
          defaultValue={search} // Set initial input value from search state
          type="search"
          className="border p-2 border-gray-500 h-10 w-full max-w-[500px] rounded-md"
          placeholder="Search Events"
        />

        {/* Location Input */}
        <input
          onChange={handleLocationChange}
          ref={locationRef}
          defaultValue={location} // Set initial input value from location state
          type="text"
          className="border p-2 border-gray-500 h-10 w-full max-w-[500px] rounded-md"
          placeholder="Search Location"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-500 h-10 rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Cards */}
      <div className="my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-8">
          {data.map((items: any) => (
            <CardBlog
              key={items.id}
              name={items.name}
              image={items.image}
              id={items.id}
              location={items.location}
              category={items.category}
            />
          ))}
        </div>
      </div>

      <FeedbackForm/>
      <FeedbackList/>


    </div>

  );
}
