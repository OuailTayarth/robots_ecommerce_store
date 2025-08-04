"use client";
import { gql } from "@/gql";
import { useQuery } from "@urql/next";
import React from "react";
import Header from "@/components/layouts/Header";
import { ProductCard } from "@/features/products";
import { getAnonUserId } from "@/lib/utils";
import { useEffect } from "react";
import useWishlistStore from "../../../features/wishlists/useWishlistStore";

import ProductCardSkeleton from "./RecommendationProductsSkeleton";

export type RecommendationProductsProps =
  React.HTMLAttributes<HTMLDivElement> & {};

const WishlistProductsQuery = gql(/*GraphQl*/ `
    query WishlistProductsQuery ($ids:[String!]){
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
          id
          product_id
        }
      }
    }
  }
`);

function RecommendationProducts({}: RecommendationProductsProps) {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const whishListIds = Object.keys(wishlist);

  const anonUserId = getAnonUserId();

  // fetch recommendation products
  const [{ data: recData, fetching: recFetching, error}] = useQuery({
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
    requestPolicy: "network-only",
  });

  // refetch whenever the local list in zustand changes
  useEffect(() => {
    if(whishListIds.length) refetchWish();
  }, [wishlist, refetchWish]);
  
  const wishEdges = wishData?.products?.edges ?? [];
  const recommendationsEdges = recData?.recommendations?.edges ?? [];
  // only check for wishEdges&wishListsIds. length when wishLoading if finished aka false
  const isWishListEmpty =  !wishLoading  && (wishEdges.length === 0 || whishListIds.length === 0);

  if (recFetching)
    return (
      <Header heading={`Popular Picks This Week!`}>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8 ">
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
        <Header heading={`Your WishList!`}>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8">
          {wishEdges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
        </div>
      </Header>
      )
      }
      <Header heading={`Popular Picks This Week!`}>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8 ">
          {recommendationsEdges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
        </div>
      </Header>
    </>
  );
}

export default RecommendationProducts;
