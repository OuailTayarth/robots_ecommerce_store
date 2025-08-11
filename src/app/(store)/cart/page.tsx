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
      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 pb-2 mt-8">
        <h1 className="text-[1.9rem] md:text-[2rem] font-semibold leading-8 mb-0 text-center sm:text-left">
          Your Cart
        </h1>
        <div className="hidden lg:inline-flex mt-0">
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
