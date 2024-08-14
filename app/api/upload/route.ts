import { NextRequest, NextResponse } from "next/server";

const IAMGE_API_KEY = "6d207e02198a847aa98d0a2a901485a5";

export async function GET() {
  return NextResponse.json({ message: "API is working!" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  console.log("Upload API hit");

  try {
    const formData = await request.formData();

    const imageFile = formData.get("source") as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    const uploadFormData = new FormData();
    uploadFormData.append("source", imageFile);
    uploadFormData.append("key", IAMGE_API_KEY);
    uploadFormData.append("action", "upload");
    uploadFormData.append("format", "json");

    const response = await fetch(`https://freeimage.host/api/1/upload`, {
      method: "POST",
      body: uploadFormData,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
