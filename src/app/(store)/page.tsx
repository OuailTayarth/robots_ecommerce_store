import { getCurrentUser } from "@/features/users/actions";
import { useAnonUserId } from "../../features/carts/hooks/useAnonUserId";
import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import { CollectionCardFragment } from "@/features/collections";
import {
  ProductCard,
  ProductCardFragment,
  ProductCardSkeleton,
} from "@/features/products";
import { DocumentType, gql } from "@/gql";
import { getClient } from "@/lib/urql";
import { cn, keytoUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const LandingRouteQuery = gql(/* GraphQL */ `
  query LandingRouteQuery($user_id: UUID) {
    products: productsCollection(
      filter: { featured: { eq: true } }
      first: 4
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...ProductCardFragment
        }
      }
    }

    wishlistCollection(filter: { user_id: { eq: $user_id } }) {
      edges {
        node {
          product_id
        }
      }
    }

    cartsCollection(filter: { user_id: { eq: $user_id } }) {
      edges {
        node {
          product_id
          quantity
        }
      }
    }

    collectionScrollCards: collectionsCollection(
      first: 6
      orderBy: [{ order: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...CollectionCardFragment
        }
      }
    }
  }
`);

export default async function Home() {
  const { data } = await getClient().query(LandingRouteQuery, {
    user_id: null,
  });

  if (data === null) return notFound();

  return (
    <main>
      <HeroSection />
      <Shell>
        <OurMission />
        {data.products && data.products.edges ? (
          <ProductSubCollectionsCircles
            collections={data.collectionScrollCards.edges}
          />
        ) : null}
        {data.products && data.products.edges ? (
          <FeaturedProductsCards products={data.products.edges} />
        ) : null}
        <CollectionGrid />
      </Shell>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full h-screen md:h-[800px] mx-auto flex justify-center">
      <div className="relative w-full h-full md:h-[800px]">
        <Image
          alt="standing neo"
          src="https://robots-store.s3.eu-north-1.amazonaws.com/collections/Neo_Bot/standing_neo.avif"
          width={1920}
          height={1200}
          priority={true}
          className="h-full w-full object-cover "
        />
      </div>

      <div className="container absolute py-8 h-screen md:h-[800px] w-full">
        <div className="flex flex-col justify-center z-30 h-full">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest text-black">
            NextBot
          </p>
          <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl md:leading-[1.2] font-bold text-black my-4">
            AI Robotics,
            <br />
            Delivered Today
          </h1>

          <div className="flex space-x-4 mt-5 max-w-screen">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-white text-zinc-600 bg-white rounded px-8 py-3", // default state
                "md:px-7 md:py-5",
                "hover:bg-transparent hover:text-black"
              )}>
              Shop Now!
            </Link>

            <Link
              href="/our-mission"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "border-2 border-primary text-white rounded px-8 py-3 font-normal",
                "md:px-7 md:py-5"
              )}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeaturedProductsCards {
  products: { node: DocumentType<typeof ProductCardFragment> }[];
}

interface CollectionsCardsProps {
  collections: { node: DocumentType<typeof CollectionCardFragment> }[];
}

function ProductSubCollectionsCircles({ collections }: CollectionsCardsProps) {
  return (
    <>
      <section className="text-center mt-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-800 pb-1">
          Designed for Work, Play, and Beyond
        </h1>
        <p className=" text-base sm:text-lg md:text-xl font-light text-zinc-600 mt-0 md:mt-2">
          Meet robots that walk, think, and assist—at home or in the field.
        </p>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map(({ node }) => (
            <Link
              href={`/collections/${node.slug}`}
              key={`collection_card_${node.id}`}
              className="group relative block w-full h-[420px] md:h-[480px] overflow-hidden rounded-lg">
              <Image
                src={keytoUrl(node.featuredImage?.key)}
                alt={node.featuredImage?.alt ?? "Collection Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors" />
              <p className="absolute bottom-5 left-5 text-xl md:text-2xl font-semibold text-white drop-shadow">
                {node.label}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

interface FeaturedProductsCardsProps {
  products: { node: DocumentType<typeof ProductCardFragment> }[];
}

function FeaturedProductsCards({ products }: FeaturedProductsCardsProps) {
  return (
    <>
      <section className="text-center mt-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-800 pb-1">
          Featured Products
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light text-zinc-600 mt-0 md:mt-2">
          Explore humanoid, AI, and dog robots designed to elevate daily living.
        </p>
      </section>
      <section className="container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-y-8 py-5 overflow-auto">
          <Suspense
            fallback={[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
            ))}>
            {products.map(({ node }) => (
              <ProductCard key={`product-card-${node.id}`} product={node} />
            ))}
          </Suspense>
        </div>
      </section>
    </>
  );
}

function CollectionGrid() {
  return (
    <>
      <section className="text-center mt-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-800 pb-1">
          Smart Living Starts Here
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light text-zinc-600 mt-0 md:mt-2">
          Discover AI-powered robotics that fit your lifestyle.
        </p>
      </section>
      <section className="relative lg:space-x-5 space-y-5 lg:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hover:cursor-pointer ">
        <div className="relative col-span-1 md:col-span-2 w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[840px] ">
          <Image
            src={keytoUrl("collections/Neo_Bot/forest_bots.avif")}
            width={1080}
            height={1080}
            className="object-cover w-full h-full"
            alt="1"
          />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col w-full space-y-5 h-auto md:h-[520px] lg:h-[840px]">
          <div className="relative overflow-hidden w-full h-[260px] sm:h-[320px] md:h-[250px] lg:h-[480px]">
            <Image
              src={keytoUrl("collections/Neo_Bot/cleaning_bot.png")}
              width={800}
              height={900}
              className="object-cover w-full h-full"
              alt="1"
            />
          </div>

          <div className="relative overflow-hidden w-full h-[260px] sm:h-[320px] md:h-[250px] lg:h-[480px]">
            <Image
              src={keytoUrl("collections/Neo_Bot/neo_library.jpg")}
              width={800}
              height={900}
              className="object-cover w-full h-full"
              alt="1"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function OurMission() {
  return (
    <>
      <section className="text-center mt-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-800 pb-1">
          Our Mission
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light text-zinc-600 mt-0 md:mt-2">
          Building intelligent machines that empower people—at home, in work,
          and beyond.
        </p>
      </section>
      <section className="max-w-[1920px] mx-auto h-auto lg:h-[580px] bg-[#F2ECEC] grid grid-cols-1 lg:grid-cols-12">
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[580px] order-1 lg:order-1 col-span-12 lg:col-span-8 overflow-hidden">
          <Image
            src="https://robots-store.s3.eu-north-1.amazonaws.com/collections/Neo_Bot/forest_bots.avif"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="col-span-12 lg:col-span-4 order-2 lg:order-2 flex flex-col justify-center items-start px-6 py-8 sm:py-10 md:px-6 lg:px-16 md:py-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 text-zinc-700">
            At NextBot, we believe robotics should be accessible, ethical, and
            inspiring. From humanoid helpers to agile quadrupeds, our mission is
            to bring cutting-edge AI into everyday life designed for learning,
            exploration, and real-world impact.
          </p>

          <Link
            href="/our-mission"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "border-2 border-primary text-white rounded px-3 py-3 md:px-6 md:py-6 font-normal"
            )}>
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
