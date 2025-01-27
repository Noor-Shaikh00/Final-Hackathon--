import { shipengine } from "@/lib/shipengine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ labelId: string }>;
  }
) {
  const labelId = (await params).labelId;
  if (!labelId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    const label = await shipengine.trackUsingLabelId(labelId);
    console.log(label);

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
