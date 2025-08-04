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
    query WishlistProductsQuery ($ids:[string!]){
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
  const wishlist = useWishlistStore((s)=> s.wishlist);
  const whishListIds = Object.keys(wishlist);


  const anonUserId = getAnonUserId();

  // fetch recommendation products
  const [{ data, fetching, error }] = useQuery({
    query: RecommendationProductsQuery,
    variables: {
      first: 4,
    },
  });

  // fetch wishlist products
  const [{data: wishData, fetching: wishLoading}, refetchWish] = useQuery({
    query: WishlistEmptyQuery,
    variables: {ids : whishListIds},
    pause: whishListIds.length === 0, // skip request if the wishlist array empty
    requestPolicy: "network-only"
  });

  const [{ data: wish }, refetchWish] = useQuery({
    query: WishlistEmptyQuery,
    variables: { userId:anonUserId },
    requestPolicy: "network-only"
  });

  useEffect(()=> {
    refetchWish();
  },[wishlist, refetchWish]);

  const isWishListEmpty = !wish || wish?.wishlist?.edges.length === 0;
  
  if (fetching)
    return (
      <Header heading={`Popular Picks This Week!`}>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8 ">
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </Header>
    );

  if (!data || error) return <></>;

  return (
    <>
      {isWishListEmpty && (
        <p className="mb-6 text-center text-muted-foreground">
          Your wishlist is empty—add favorites by tapping the heart Icon on any
          product.
        </p>
      )}
      <Header heading={`Popular Picks This Week!`}>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8 ">
          {data.recommendations &&
            data.recommendations.edges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
        </div>
      </Header>
    </>
  );
}

export default RecommendationProducts;
