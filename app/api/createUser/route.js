import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export async function POST(req, res) {
  if (req.method === "POST") {
    const parsedReq = await req.json();
    const { email, username, image } = parsedReq;

    try {
      await connectToDB();
      const userExists = await User.findOne({ email });

      if (!userExists) {
        await User.create({
          email,
          username,
          image,
        });
        return NextResponse.json({
          message: "User created successfully",
        });
      }

      return NextResponse.json({
        message: "User exists",
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Something went wrong" });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}
