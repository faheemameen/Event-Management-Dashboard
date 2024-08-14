"use client";
import { useState } from "react";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { Event } from "../../../types/EventTypes";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Event>({
    _uuid: "",
    name: "",
    startDateTime: "",
    endDateTime: "",
    venue: "",
    description: "",
    headerImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.startDateTime ||
      !formData.endDateTime ||
      !formData.venue ||
      !formData.description ||
      !formData.headerImage
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const imageForm = new FormData();
    if (formData.headerImage) {
      imageForm.append("source", formData.headerImage);
    }
    console.log(imageForm);

    try {
      const imageUploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageForm,
      });
      const imageUploadData = await imageUploadResponse.json();
      console.log("image upload Data:", imageUploadData);
      console.log(imageUploadData.image.url);
      const imageUrl = imageUploadData.image.url;

      const eventData = {
        ...formData,
        headerImage: imageUrl,
      };

      const data = await createEvent(eventData);
      if (data.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const createEvent = async (eventData: any) => {
    return await fetch("http://localhost:3000/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
  };
  return (
    <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
        Create New Event
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label
            className="block text-gray-700 text-lg font-semibold mb-1"
            htmlFor="name"
          >
            Event Name
          </label>
          <input
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-lg font-semibold mb-1"
            htmlFor="startDateTime"
          >
            Start Date & Time
          </label>
          <input
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="startDateTime"
            type="datetime-local"
            value={formData.startDateTime}
            onChange={(e) =>
              setFormData({ ...formData, startDateTime: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-lg font-semibold mb-1"
            htmlFor="endDateTime"
          >
            End Date & Time
          </label>
          <input
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="endDateTime"
            type="datetime-local"
            value={formData.endDateTime}
            onChange={(e) =>
              setFormData({ ...formData, endDateTime: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-lg font-semibold mb-1"
            htmlFor="venue"
          >
            Venue
          </label>
          <input
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="venue"
            type="text"
            value={formData.venue}
            onChange={(e) =>
              setFormData({ ...formData, venue: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-1">
          <label
            className="block text-gray-700 text-lg font-semibold mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            placeholder="Event description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-lg font-semibold mb-1">
            Header Image
          </label>
          <input
            type="file"
            className="w-full py-2 px-3 border rounded-lg"
            onChange={(e) => {
              if (e.target.files) {
                setFormData({
                  ...formData,
                  headerImage: e.target.files[0],
                });
              }
            }}
            required
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
