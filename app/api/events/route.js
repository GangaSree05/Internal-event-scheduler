import { connectDB } from "@/lib/connect";
import Event from "@/models/Event";

export async function GET() {
  await connectDB();
  const events = await Event.find();
  return Response.json(events);
}

export async function POST(req) {
  const { title, description, date } = await req.json();
  await connectDB();
  const newEvent = await Event.create({ title, description, date });
  return Response.json(newEvent);
}
