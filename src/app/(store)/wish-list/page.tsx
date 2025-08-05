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
      <section className="flex justify-between items-center pt-2 pb-0">
        <h1 className="text-3xl"></h1>
        <div className="flex space-x-4 mt-5 max-w-screen">
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
        </div>
      </section>

      <Suspense fallback={<RecommendationProductsSkeleton />}>
        <RecommendationProducts />
      </Suspense>
    </Shell>
  );
}

export default WishListPage;
