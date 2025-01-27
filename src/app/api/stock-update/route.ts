import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 }
      );
    }

    let product = await client.fetch(
      `*[_type == "product" && _id == $productId][0]`,
      { productId }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Calculate the new stock quantity
    const newStock = product.stock - quantity;

    // Check if stock is sufficient
    if (newStock < 0) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Log the update
    console.log(`Updating stock for product ${productId}: ${product.stock} -> ${newStock}`);

    // Update the stock in Sanity
    await client
      .patch(productId)
      .set({ stock: newStock })
      .ifRevisionId(product._rev) // Ensure atomic update
      .commit();

    return NextResponse.json({ success: true, newStock });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}