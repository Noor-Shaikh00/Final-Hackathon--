"use client";

import { useCart } from "@/components/cart-context-api/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative mr-[14px] p-1">
      <Image
        priority
        src="/icons/cart.svg"
        height={100}
        width={100}
        alt="cart"
        className="max-w-[22px] max-h-[22px]"
      />
      {totalItems > 0 && (
        <motion.span
          className="absolute -top-1 -right-2 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {totalItems}
        </motion.span>
      )}
    </Link>
  );
};

export default CartBtn;