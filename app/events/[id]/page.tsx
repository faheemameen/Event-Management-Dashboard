"use client";
import { useEffect, useState } from "react";
import { Event } from "../../../types/EventTypes";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const EventDetailsPage = ({ params }: any) => {
  const router = useRouter();
  const { id } = params;
  console.log(id);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/event/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error: any) {
        console.error("Error fetching event:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(`/api/event/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      router.push("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="font-bold text-3xl p-4 text-center bg-gray-100 border-b border-gray-200">
          {event.name}
        </div>

        <Image
          className="w-full h-72 object-cover"
          src={event.headerImage}
          alt={event.name}
          width={800}
          height={400}
          priority
        />

        <div className="p-4">
          <div className="flex justify-between text-gray-600 text-lg mb-4">
            <div className="flex-1">
              <p className="font-semibold">Start:</p>
              <p>{new Date(event.startDateTime).toLocaleString()}</p>
            </div>
            <div className="flex-1 text-right">
              <p className="font-semibold">End:</p>
              <p>{new Date(event.endDateTime).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-xl font-semibold">Venue:</p>
            <p>{event.venue}</p>
          </div>

          <div className="text-gray-600">
            <p className="text-xl font-semibold">Description:</p>
            <p>{event.description}</p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleDelete(event._uuid)}
            className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
          >
            <RiDeleteBin6Line className="h-6 w-6 mr-2" />
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
