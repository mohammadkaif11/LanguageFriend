import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  console.log('text to speech api callings');
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json({ message: "Please provide filename" });
  }
  
  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
