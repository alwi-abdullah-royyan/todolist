import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useSearch = (initialSearch = "", variable = "title") => {
  const router = useRouter();
  const { title } = router.query;
  const [search, setSearch] = useState(initialSearch || title || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`?${variable}=${encodeURIComponent(search)}`);
    } else {
      router.push("/"); // Reset to main page if search is empty
    }
  };

  useEffect(() => {
    setSearch(title || ""); // Sync search state with router query
  }, [title]);

  return { search, setSearch, handleSearch };
};
