"use client";
import { gql } from "@/gql";
import { useQuery } from "@urql/next";
import React from "react";
import Header from "@/components/layouts/Header";
import { ProductCard } from "@/features/products";
import { useAuth } from "@/providers/AuthProvider";

import ProductCardSkeleton from "./RecommendationProductsSkeleton";

export type RecommendationProductsProps =
  React.HTMLAttributes<HTMLDivElement> & {};

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
      filter: { user_id: { eq: $userId } }
      first: 1
    ) {                     
      edges {               
        node { product_id }
      }
    }
  }
`);

function RecommendationProducts({}: RecommendationProductsProps) {
  const {user} = useAuth();
  const userId = user?.id
  const [{ data, fetching, error }, refetch] = useQuery({
    query: RecommendationProductsQuery,
    variables: {
      first: 4,
    },
  });

  const [{ data: wish }] = useQuery({
    query: WishlistEmptyQuery,
    variables: { userId },
    pause: !userId,
  });

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
    isWishList

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
