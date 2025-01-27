"use client";

import React from "react";
import { Product } from "../../../../types";
import { useCart } from "@/components/cart-context-api/CartContext";
import { urlFor } from "../../../sanity/lib/image";
import { toast } from "react-toastify";

interface AddToCartBtnProps {
  data: Product & { quantity: number };
}

const AddToCartBtn = ({ data }: AddToCartBtnProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: data._id,
      name: data.name,
      price: data.price,
      quantity: data.quantity, // Use the quantity from props
      imageUrl: urlFor(data.srcUrl).url(),
      inStock: data.inStock,
      stock: data.stock
    };

    addToCart(cartItem);

    toast.success(`${data.name} (${data.quantity}) added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
    );
};

export default AddToCartBtn;