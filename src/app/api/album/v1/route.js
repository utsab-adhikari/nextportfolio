import connectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import Image from "@/models/imageModel";
import { NextResponse } from "next/server";
import Album from "@/models/albumModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const albumName = searchParams.get("albumName");

    const album = await Album.findOne({ albumName: albumName });
    if (!album) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Album not found",
      });
    }

    const images = await Image.find({ albumId: album._id });

    if (!images || images.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No images found",
        album,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Images loaded successfully",
      album,
      images,
    });
  } catch (error) {
    console.error("Error loading albums:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
