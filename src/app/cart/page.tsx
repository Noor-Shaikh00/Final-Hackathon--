"use client";

import React from "react";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/components/cart-context-api/CartContext";
import Image from "next/image";
import Link from "next/link";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    try {
      for (const item of cartItems) {
        const stockUpdateResponse = await fetch("/api/stock-update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
        });

        if (!stockUpdateResponse.ok) {
          const { message } = await stockUpdateResponse.json();
          alert(`Failed to update stock for ${item.name}: ${message}`);
          return;
        }
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      } else {
        console.error("No session ID returned.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  return (
    <div>
      <div className="wrapper">
        <div className="bg-[#FAFAFA] min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/cart"
              className={cn([
                integralCF.className,
                "text-2xl lg:text-[32px] mr-3 lg:mr-10 flex justify-start mb-8",
              ])}
            >
              Your Cart
            </Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-[#F3F4F6] text-sm text-[#252B42]">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-4 flex items-center space-x-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 relative">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        {/* Product Name */}
                        <span className="text-sm font-medium text-[#252B42] pt-[10px]">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 justify-center">
                          <button
                            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <button
                          className="text-red-600 hover:text-red-800 transition-all"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/3">
                <h2 className="text-xl font-bold text-[#252B42] mb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-[#252B42]">
                    Total
                  </span>
                  <span className="text-lg font-bold text-[#252B42]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out flex justify-center gap-4"
                  onClick={handleCheckout}
                >
                  Go to Checkout <FiArrowRight className="mt-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
