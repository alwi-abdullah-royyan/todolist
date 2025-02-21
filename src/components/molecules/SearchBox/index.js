import Button from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";

const SearchBox = ({ onSubmit, search, setSearch, category = true }) => {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex flex-wrap items-center gap-2">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow min-w-[200px] p-2 border border-gray-300 rounded-md text-black"
      />

      <Button
        text="Search"
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      />
      {category && (
        <Link href="/todolist/category">
          <Button
            text="Filter category"
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          />
        </Link>
      )}
    </form>
  );
};

export default SearchBox;
