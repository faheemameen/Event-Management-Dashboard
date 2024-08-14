"use client";

import { useState, useEffect } from "react";
import EventCard from "./components/EventCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import { Event } from "@/types/EventTypes";
import Pagination from "./components/PAgination";

const Home: React.FC = () => {
  const ITEMS_PER_PAGE = 6;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/event`);
        const data = await response.json();
        setEvents(data.items);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event: Event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">
        Events Management Dashboard
      </h1>
      <SearchBar
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 ">
        {loading ? (
          <Loader />
        ) : currentItems.length > 0 ? (
          currentItems.map((event) => (
            <EventCard key={event._uuid} {...event} />
          ))
        ) : (
          <p className=" text-2xl">No events found</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default Home;
