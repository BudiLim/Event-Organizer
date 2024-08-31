
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-[10px] md:gap-[20px] lg:gap-[30px]">
      <div className="relative w-[180px] h-[35px] font-light text-sm">
        <input
          type="text"
          placeholder="Search Events . . ."
          className="text-white bg-zinc-900 border border-zinc-200 w-full h-full rounded-xl pl-8 pr-4"
        />
        <FiSearch
          className="text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
          size={16}
        />
      </div>
    </div>
  )
}

export default SearchInput;