export const dynamic = "force-dynamic"; 
export const revalidate = 0;            

import connectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Image from "@/models/imageModel";
import { NextResponse } from "next/server";
import Album from "@/models/albumModel";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const { nameofalbum } = params;

    const album = await Album.findOne({ albumName:nameofalbum });
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
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Images loaded successfully",
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
