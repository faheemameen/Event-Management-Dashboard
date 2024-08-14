import { NextRequest, NextResponse } from "next/server";

const api = "APi_Key";

export async function GET(request: NextRequest) {
  const id = new URL(request.url).pathname.split("/").pop();

  try {
    const response = await fetch(`https://crudapi.co.uk/api/v1/events/${id}`, {
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
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
