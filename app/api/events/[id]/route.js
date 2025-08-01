import connectDB from '@/utils/db';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectDB();
  const event = await Event.findById(params.id);
  return NextResponse.json(event);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Event.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Event.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Event deleted successfully' });
}
