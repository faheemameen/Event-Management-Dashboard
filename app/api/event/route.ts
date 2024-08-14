import { NextResponse, NextRequest } from "next/server";

const api = "tw_NjQf3ujLhr-AXlNy_9rynJgo6iqsS_66g_XP5FIn0fkIqiQ";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`https://crudapi.co.uk/api/v1/events`, {
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST,  DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch events" },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    const response = await fetch("https://crudapi.co.uk/api/v1/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST,  DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify([eventData]),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to add event" },
        { status: 400 }
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add event" }, { status: 400 });
  }
}
