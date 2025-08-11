import SectionHeading from "@/components/layouts/SectionHeading";
import { Shell } from "@/components/layouts/Shell";
import { Skeleton } from "@/components/ui/skeleton";
import { CollectionBanner } from "@/features/collections";
import { SearchProductsGridSkeleton } from "@/features/products";
import {
  FilterSelections,
  SearchProductsInfiniteScroll,
} from "@/features/search";
import { gql } from "@/gql";
import { getClient } from "@/lib/urql";
import { toTitleCase, unslugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface CategoryPageProps {
  params: {
    collectionSlug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: CategoryPageProps) {
  return {
    title: `NextBot | ${toTitleCase(unslugify(params.collectionSlug))}`,
    description: `NextBot | Buy ${params.collectionSlug}.`,
  };
}

const CollectionRouteQuery = gql(/* GraphQL */ `
  query CollectionRouteQuery($collectionSlug: String) {
    collectionsCollection(
      filter: { slug: { eq: $collectionSlug } }
      orderBy: [{ order: DescNullsLast }]
      first: 1
    ) {
      edges {
        node {
          title
          label
          description
          ...CollectionBannerFragment
          productsCollection(orderBy: [{ created_at: DescNullsLast }]) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                id
                ...ProductCardFragment
              }
            }
          }
        }
      }
    }
  }
`);

async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { collectionSlug } = params;

  const { data } = await getClient().query(CollectionRouteQuery, {
    collectionSlug,
  });

  const collection = data?.collectionsCollection?.edges?.[0]?.node;
  if (!collection) return notFound();

  const productsList = collection.productsCollection;

  if (!productsList) return notFound();

  return (
    <Shell>
      <CollectionBanner
        collectionBannerData={data.collectionsCollection.edges[0].node}
      />
      <SectionHeading
        heading={collection.title}
        description={collection.description}
        className="pt-0 pb-0"
      />

      <Suspense
        fallback={
          <div>
            <Skeleton className="max-w-xl h-8 mb-3" />
            <Skeleton className="max-w-2xl h-8" />
          </div>
        }></Suspense>

      <Suspense fallback={<SearchProductsGridSkeleton />}>
        <SearchProductsInfiniteScroll
          collectionId={data.collectionsCollection.edges[0].node.id}
        />
      </Suspense>
    </Shell>
  );
}

export default CategoryPage;
