"use client";

import { gql } from "@/gql";
import { SearchQuery, SearchQueryVariables } from "@/gql/graphql";
import { useQuery } from "@urql/next";
import { ProductCard } from "@/features/products";
import SearchProductsGridSkeleton from "./SearchProductsGridSkeleton";

const ProductSearch = gql(/* GraphQL */ `
  query Search(
    $search: String
    $lower: BigFloat
    $upper: BigFloat
    $collections: [String!]
    $first: Int!
    $after: Cursor
    $orderBy: [productsOrderBy!]
  ) {
    productsCollection(
      filter: {
        and: [
          { name: { ilike: $search } }
          { price: { gt: $lower, lt: $upper } }
          { collection_id: { in: $collections } }
        ]
      }
      first: $first
      after: $after
      orderBy: $orderBy
    ) {
      edges {
        node {
          id

          ...ProductCardFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

const SearchResultPage = ({
  variables,
}: {
  variables: SearchQueryVariables;
}) => {
  // Fetching products based on the search query variables(search, price range, collections, etc.)
  const [result] = useQuery<SearchQuery, SearchQueryVariables>({
    query: ProductSearch,
    variables,
  });

  const { data, fetching, error } = result;

  const products = data?.productsCollection;

  return (
    <div>
      {error && <p>Oh no... {error.message}</p>}

      {fetching && <SearchProductsGridSkeleton />}

      {products && (
        <>
          {products.edges.length === 0 && (
            <p>
              {`There is no Products with name `}
              <span className="font-bold">
                {(variables.search || []).slice(1, -2)}
              </span>
              {"."}
            </p>
          )}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 w-full">
            {products.edges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default SearchResultPage;
