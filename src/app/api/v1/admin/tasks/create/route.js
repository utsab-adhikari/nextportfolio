import Context from "@/app/models/Context.model";
import connectDB from "@/db/ConnectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const {context, description} = await request.json();

        if(!context || !description) {
            return NextResponse.json({
            status: 400,
            success: false,
            message: ["ALl fields are required"]
        })
        }

        const existingContext = await Context.findOne({context: context});

         if(existingContext) {
            return NextResponse.json({
            status: 400,
            success: false,
            message: "Context already exists"
        })
        }

        const newContext = new Context({
            context,
            description,
        });

        const contexid = await newContext._id;

        await newContext.save();

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Context created successfully",
            contextid
        })
        
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: ["Server Error", error.message]
        })
    }
}