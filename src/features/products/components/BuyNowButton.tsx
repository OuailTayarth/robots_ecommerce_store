"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BuyNowButtonProps = {
  productId: string;
};

function BuyNowButton({ productId }: BuyNowButtonProps) {
  // to fix later
  return (
    <Link href={"/cart"}>
      <Button type="submit">Buy Now</Button>
    </Link>
  );
}

export default BuyNowButton;
