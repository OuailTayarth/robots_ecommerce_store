import { Shell } from "@/components/layouts/Shell";
import {
  RecommendationProducts,
  RecommendationProductsSkeleton,
} from "@/features/products";
import Link from "next/link";
import React, { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/layouts/icons";

type Props = {};

function WishListPage({}: Props) {
  return (
    <Shell>
      <section className="flex flex-col sm:flex-row justify-between items-center sm:items-center pt-6 pb-2 gap-4 mt-8">
        <h1 className="text-4xl">Your Wishlist</h1>
        <div className="hidden md:flex space-x-4 mt-0 md:mt-5 max-w-screen">
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
            <Icons.chevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </section>

      <Suspense fallback={<RecommendationProductsSkeleton />}>
        <RecommendationProducts />
      </Suspense>
    </Shell>
  );
}

export default WishListPage;
