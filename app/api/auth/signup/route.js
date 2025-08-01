import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) return Response.json({ msg: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return Response.json({ msg: "Signup successful", user });
}
