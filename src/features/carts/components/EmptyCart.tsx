import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/layouts/icons";
import { cn } from "@/lib/utils";

function EmptyCart() {
  return (
    <section className="w-full border border-foreground min-h-[450px] flex flex-col gap-5 justify-center items-center">
      <p className="text-muted-foreground text-sm">Your Cart is empty.</p>
      <Link
        href="/shop"
        target=""
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "border-2 border-primary text-white rounded px-4 py-2 font-normal",
          "md:px-6 md:py-3 md:text-base",
          ""
        )}>
        Continue Shopping
        <Icons.chevronRight className="ml-2 w-5" />
      </Link>
    </section>
  );
}

export default EmptyCart;
