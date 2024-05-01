import Email from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_HpuGggZb_72qPcApNgE5wrTY5nu9oB4XQ");

export async function POST(req) {
  const response = await req.json();
  try {
    await resend.emails.send({
      from: "food-cart@resend.dev",
      to: "mondalsuman97322@gmail.com",
      subject: "FoodD cart Order Confirmation",
      react: Email(response),
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({error});
  }
}
