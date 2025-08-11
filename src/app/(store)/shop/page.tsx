import Header from "@/components/layouts/Header";
import { Shell } from "@/components/layouts/Shell";
import { SearchProductsGridSkeleton } from "@/features/products";
import { SearchProductsInfiniteScroll } from "@/features/search";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function ProductsPage({}: ProductsPageProps) {
  return (
    <Shell>
      <Header heading="Browse All Products" className="mt-[50px]" />

      <Suspense fallback={<SearchProductsGridSkeleton />}>
        <SearchProductsInfiniteScroll />
      </Suspense>
    </Shell>
  );
}

export default ProductsPage;
