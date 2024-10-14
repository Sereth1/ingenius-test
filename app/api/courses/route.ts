import { courses } from "@/data/course";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(courses);
}
