import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  if (email === "admin@event.com" && password === "admin123") {
    return Response.json({ role: "admin" });
  }

  const user = await User.findOne({ email });
  if (!user) return Response.json({ msg: "Invalid email" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return Response.json({ msg: "Wrong password" }, { status: 401 });

  return Response.json({ role: "user", user });
}
