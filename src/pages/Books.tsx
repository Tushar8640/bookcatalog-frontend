import BookCard from "@/components/BookCard";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/globalTypes";

import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type DebouncedFunction<T extends any[]> = (...args: T) => void;

function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export default function Books() {
  const queryParams: Array<string> = [];

  const [url, setUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const handleSearch = debounce((searchTerm: string) => {
    // Perform search logic with the searchTerm
    setSearchText(searchTerm);
    console.log("Searching for:", searchTerm);
    // Add the search term to the query parameters if it exists
  }, 1000);

  const handleInputChange = (event: { target: { value: string } }) => {
    const newSearchTerm = event.target.value;
    handleSearch(newSearchTerm);
  };

  const { data } = useGetBooksQuery(url, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (searchText) {
      queryParams.push(`searchTerm=${encodeURIComponent(searchText)}`);
    }
    // Add the genre to the query parameters if it exists
    if (filterGenre) {
      queryParams.push(`genre=${encodeURIComponent(filterGenre)}`);
    }
    if (filterYear) {
      queryParams.push(`publicationYear=${encodeURIComponent(filterYear)}`);
    }
    if (queryParams.length > 0) {
      setUrl(`?${queryParams.join("&")}`);
    }
    if (!queryParams.length) {
      setUrl("");
    }
  }, [filterGenre, filterYear, queryParams, searchText, url]);
  const genres = [
    {
      value: "wow",
      label: "Wow",
    },
    {
      value: "adventure",
      label: "Adventure",
    },
    {
      value: "mystery",
      label: "Mystery",
    },
    {
      value: "fantasy",
      label: "Fantasy",
    },
    {
      value: "romance",
      label: "Romance",
    },
    {
      value: "sci-fi",
      label: "Sci-Fi",
    },
  ];
  const years = [
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2023",
      label: "2023",
    },
  ];
  const [open, setOpen] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  console.log("url", url);
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <div className="flex items-center space-x-2 mt-3">
            <form>
              <label className="relative block">
                <input
                  className="w-full bg-white placeholder:font-italitc border border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                  placeholder="Search Book"
                  type="text"
                  onChange={handleInputChange}
                />

                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                  </svg>
                </span>
              </label>
            </form>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Filter</h1>
          <div className="max-w-xl">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {filterGenre
                    ? genres.find((genre) => genre.value === filterGenre)?.label
                    : "Select Genre..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Genre..." />
                  <CommandEmpty>No genre found.</CommandEmpty>
                  <CommandGroup>
                    {genres.map((genre) => (
                      <CommandItem
                        key={genre.value}
                        onSelect={(currentValue) => {
                          setFilterGenre(
                            currentValue === filterGenre ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filterGenre === genre.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {genre.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="max-w-xl">
            <Popover open={openYear} onOpenChange={setOpenYear}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox1"
                  aria-expanded={openYear}
                  className="w-[200px] justify-between"
                >
                  {filterYear
                    ? years.find((year) => year.value === filterYear)?.label
                    : "Select Year..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Year..." />
                  <CommandEmpty>No genre found.</CommandEmpty>
                  <CommandGroup>
                    {years.map((year) => (
                      <CommandItem
                        key={year.value}
                        onSelect={(currentValue) => {
                          setFilterYear(
                            currentValue === filterYear ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filterYear === year.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {year.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="my-10">
            <Link to={"/addbook"}>
              <Button size={"sm"} className="w-full">
                Add Book
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-9 my-5">
        <div className=" grid grid-cols-3 gap-10 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
