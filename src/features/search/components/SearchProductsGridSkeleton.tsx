import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { ProductCardSkeleton } from "../../products/components/ProductCardSkeleton";

function SearchProductsGridSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 w-full">
        {[...Array(24)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    </div>
  );
}

export default SearchProductsGridSkeleton;
