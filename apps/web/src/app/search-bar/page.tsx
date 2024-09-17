"use client";

import { CardBlog } from "@/components/card";
import { getEvent } from "@/lib/event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBlog() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || ""; // Get initial search query from URL
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState<string>(querySearch); // Initialize with querySearch
  const [value] = useDebounce(search, 1000); // Debounce the search input to avoid excessive API calls
  const [feedback, setFeedback] = useState<string>(""); // Feedback input state
  const [feedbackList, setFeedbackList] = useState<string[]>([]); // List of feedbacks
  const router = useRouter();

  const handleChange = () => {
    if (searchRef.current) {
      setSearch(searchRef.current.value); // Update search state when input changes
    }
  };

  const getData = async () => {
    try {
      // Update URL with the search query
      if (value) {
        router.push(`?search=${value}`);
      } else {
        router.push("?"); // Reset the URL if the search is cleared
      }

      // Fetch events based on the debounced search value
      const { event } = await getEvent(value);
      setData(event);
    } catch (err) {
      console.log("Error fetching events:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when debounced value changes
  }, [value]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      setFeedbackList([...feedbackList, feedback]); // Add new feedback to the list
      setFeedback(""); // Clear the feedback input after submission
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div className="flex w-full justify-center">
        <input
          onChange={handleChange}
          ref={searchRef}
          defaultValue={search} // Set initial input value from search state
          type="search"
          className="border p-2 border-gray-500 h-10 w-full max-w-[500px] rounded-md"
          placeholder="Search Blog"
        />
      </div>

      {/* Blog Cards */}
      <div className="my-14">
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
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

      {/* Feedback Section */}
      <div className="mt-10 p-5 border border-gray-300 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold mb-4">Submit Your Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border p-2 w-full h-24 rounded-md mb-4"
            placeholder="Write your feedback..."
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit Feedback
          </button>
        </form>

        {/* Display Submitted Feedback */}
        <div className="mt-8">
          <h4 className="text-md font-semibold">Feedbacks:</h4>
          {feedbackList.length > 0 ? (
            <ul className="list-disc list-inside mt-4">
              {feedbackList.map((item, index) => (
                <li key={index} className="my-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No feedback yet. Be the first to submit!</p>
          )}
        </div>
      </div>
    </div>
  );
}
