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
      <section className="flex flex-col sm:flex-row justify-between items-center sm:items-center pt-6 pb-2 gap-4 mt-8">
        <h1 className="text-4xl ">Your Cart</h1>
        <div className="hidden lg:flex space-x-4 mt-0 md:mt-5 max-w-screen">
          <Link
            href="/shop"
            target=""
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "border-2 border-primary text-white rounded px-4 py-2 font-normal",
              "md:px-6 md:py-3 md:text-base",
              ""
            )}>
            Back to Store
            <Icons.chevronRight className="ml-2 w-5" />
          </Link>
        </div>
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
