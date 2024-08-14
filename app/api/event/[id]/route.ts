import { NextRequest, NextResponse } from "next/server";

const api = "tw_NjQf3ujLhr-AXlNy_9rynJgo6iqsS_66g_XP5FIn0fkIqiQ";
let allowedOrigin: "https://event-management-dashboard-ar2j01a8p-faheemameens-projects.vercel.app/";

export async function GET(request: NextRequest) {
  const id = new URL(request.url).pathname.split("/").pop();

  try {
    const response = await fetch(`https://crudapi.co.uk/api/v1/events/${id}`, {
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST,  DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "failed to fetch events" },
        { status: response.status }
      );
    }
    const event = await response.json();
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch event" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = new URL(request.url).pathname.split("/").pop();
  console.log(id);

  try {
    const response = await fetch(`https://crudapi.co.uk/api/v1/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST,  DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    if (!response.ok) {
      return NextResponse.json({ message: "Failed to delete event" });
    }
    return NextResponse.json(
      { message: "Event deleted Successfully" },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
