import CartSection from "@/features/carts/components/CartSection";
import CartSectionSkeleton from "@/features/carts/components/CartSectionSkeleton";
import { Shell } from "@/components/layouts/Shell";
import {
  RecommendationProducts,
  RecommendationProductsSkeleton,
} from "@/features/products";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/layouts/icons";

import Link from "next/link";
import { Suspense } from "react";

async function CartPage() {
  return (
    <Shell>
      <section className="flex justify-between items-center py-8">
        <h1 className="text-3xl">Your Cart</h1>
        <Link
          href="/shop"
          target=""
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "border-2 border-primary text-white rounded px-8 py-3 ",
            "md:px-6 md:py-6"
          )}>
          Back to Store
          <Icons.chevronRight className="ml-2 w-5" />
        </Link>
      </section>

      <Suspense fallback={<CartSectionSkeleton />}>
        <CartSection />
      </Suspense>

      <Suspense fallback={<RecommendationProductsSkeleton />}>
        <RecommendationProducts />
      </Suspense>
    </Shell>
  );
}

export default CartPage;
