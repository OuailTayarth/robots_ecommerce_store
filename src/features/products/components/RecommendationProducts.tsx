"use client";
import { gql } from "@/gql";
import { useQuery } from "@urql/next";
import React from "react";
import Header from "@/components/layouts/Header";
import { ProductCard } from "@/features/products";
import { useAnonUserId } from "@/features/carts/hooks/useAnonUserId";
import { useEffect, useState } from "react";
import useWishlistStore from "../../../features/wishlists/useWishlistStore";

import ProductCardSkeleton from "./RecommendationProductsSkeleton";

export type RecommendationProductsProps =
  React.HTMLAttributes<HTMLDivElement> & {};

const WishlistProductsQuery = gql(/*GraphQl*/ `
    query WishlistProductsQuery ($ids: [String!]){
    products: productsCollection(filter: {id: { in: $ids} }) { # return any product that appear "in" these $ids
          edges {
            node {
              id
              ...ProductCardFragment
            }
          }
      }
    }
`);
const RecommendationProductsQuery = gql(/* GraphQL */ `
  query RecommendationProductsQuery($first: Int!) {
    recommendations: productsCollection(first: $first) {
      edges {
        node {
          id
          ...ProductCardFragment
        }
      }
    }
  }
`);

const WishlistEmptyQuery = gql(/* GraphQL */ `
  query WishlistEmptyQuery($userId: UUID!) {
    wishlist: wishlistCollection(
      filter: { user_id: { eq: $userId } } # filter and only query the row where user_id from the table = userID I passed in in UseQuery
      first: 1 # first: 1 caps that array at length = 1, so you get one edge → one node.
    ) {
      edges {
        node {
          product_id
        }
      }
    }
  }
`);

function RecommendationProducts({}: RecommendationProductsProps) {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const whishListIds = Object.keys(wishlist);
  const [mounted, setMounted] = useState<boolean>(false);

  const anonUserId = useAnonUserId();

  // fetch recommendation products
  const [{ data: recData, fetching: recFetching, error }] = useQuery({
    query: RecommendationProductsQuery,
    variables: {
      first: 4,
    },
  });

  // fetch wishlist products
  const [{ data: wishData, fetching: wishLoading }] = useQuery({
    query: WishlistProductsQuery,
    variables: { ids: whishListIds },
    pause: whishListIds.length === 0, // skip request if the wishlist array empty
    requestPolicy: "network-only",
  });

  const [{ data: wish }, refetchWish] = useQuery({
    query: WishlistEmptyQuery,
    variables: { userId: anonUserId },
    pause: !anonUserId,
    requestPolicy: "network-only",
  });
  console.log("mounted value before ", mounted);

  // refetch whenever the local list in zustand changes
  useEffect(() => {
    setMounted(true);
    if (whishListIds.length) refetchWish();
  }, [wishlist, refetchWish]);

  const wishEdges = wishData?.products?.edges ?? [];
  const recommendationsEdges = recData?.recommendations?.edges ?? [];
  // only check for wishEdges&wishListsIds. length when wishLoading if the query finished aka false
  const isWishListEmpty =
    mounted && // we wait until we are on the client
    !wishLoading && // wait until the query finished
    (wishEdges.length === 0 || whishListIds.length === 0); // then evaluate

  if (recFetching)
    return (
      <Header heading={`Popular Picks This Week`}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 w-full">
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </Header>
    );

  if (!recData || error) return <></>;

  return (
    <>
      {isWishListEmpty ? (
        <p className="mb-6 text-center text-muted-foreground">
          Your wishlist is empty—add favorites by tapping the heart Icon on any
          product.
        </p>
      ) : (
        <Header heading={`Products You Love`}>
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 w-full">
            {wishEdges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </div>
        </Header>
      )}
      <Header heading={`Popular Picks This Week!`}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 w-full mt-9">
          {recommendationsEdges.map(({ node }) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      </Header>
    </>
  );
}

export default RecommendationProducts;
