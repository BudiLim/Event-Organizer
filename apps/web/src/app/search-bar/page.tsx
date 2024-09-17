"use client";
import { getEvent } from "@/lib/event";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState<string>('');
  const [value] = useDebounce(search, 1000);
  const [data, setData] = useState([])


  const handleChange = () => {
    if (searchRef.current) {
      setSearch(searchRef.current.value);
    }
  };

  const getData = async () => {
    try {
      const { event } = await getEvent(value)
      setData(event)
      console.log(event)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [value])

  return (
    <div>
      <div className="relative md:block w-[180px] h-[35px] font-light text-sm">
        <input
          type="search"
          onChange={handleChange}
          ref={searchRef}
          placeholder="Search Events . . ."
          className="text-white bg-zinc-900 input input-bordered border-zinc-400 w-full h-full rounded-xl pl-8 pr-4"
        />
        <FiSearch
          className="text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
          size={16}
        />
        <div>
          {value}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
