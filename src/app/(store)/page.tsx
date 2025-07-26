import { getCurrentUser } from "@/features/users/actions";
import { Icons } from "@/components/layouts/icons";
import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  CollectionCardFragment,
  CollectionsCard,
  CollectionsCardSkeleton,
} from "@/features/collections";
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
  const currentUser = await getCurrentUser();

  const { data } = await getClient().query(LandingRouteQuery, {
    user_id: currentUser?.id,
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
          alt="Furniture"
          src="https://robots-store.s3.eu-north-1.amazonaws.com/collections/Neo_Bot/standing_neo.avif"
          width={1920}
          height={1200}
          priority={true}
          className="h-full w-full object-cover "
        />
      </div>

      <div className="container absolute py-8 h-screen md:h-[800px] w-full">
        <div className="flex flex-col justify-center z-30 h-full">
          <p className="text-sm md:text-md uppercase tracking-widest text-black ">
            RoboForge
          </p>
          <h1 className="text-5xl md:text-7xl md:leading-[1.2] font-bold text-black my-4">
            The Future,
            <br />
            Delivered Today
          </h1>

          <div className="flex space-x-4 mt-5 max-w-screen">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-white text-zinc-600 bg-white rounded px-8 py-3", // default state
                "md:px-16 md:py-6",
                "hover:bg-transparent hover:text-black" // hover state
              )}>
              Shop Now!
            </Link>

            <Link
              href=""
              target="_blank"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "border-2 border-primary text-white rounded px-8 py-3 ",
                "md:px-16 md:py-6"
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

// function ProductSubCollectionsCircles({ collections }: CollectionsCardsProps) {
//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
//       {collections.map(({ node }) => (
//         <Link
//           href={`/collections/${node.slug}`}
//           key={`collection_card_${node.id}`}
//           className="group relative block w-full h-[420px] md:h-[480px] overflow-hidden rounded-lg">
//           <Image
//             src={keytoUrl(node.featuredImage?.key)}
//             alt={node.featuredImage?.alt ?? "Collection Image"}
//             fill
//             sizes="(max-width: 768px) 100vw, 50vw"
//             className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
//           />

//           <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors" />

//           <p className="absolute bottom-5 left-5 text-xl md:text-2xl font-semibold text-white drop-shadow">
//             {node.label}
//           </p>
//         </Link>
//       ))}
//     </section>
//   );
// }

function ProductSubCollectionsCircles({ collections }: CollectionsCardsProps) {
  return (
    <>
      <section className="text-center mt-9 mb-3">
        <h1 className="text-5xl font-semibold text-zinc-800 pb-1">
          Designed for Work, Play, and Beyond
        </h1>
        <p className="text-lg font-light text-zinc-600 mt-2">
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
      <section className="text-center mt-9">
        <h1 className="text-5xl font-semibold text-zinc-800 pb-1">
          Featured Products
        </h1>
        <p className="text-lg font-light text-zinc-600 mt-1">
          Explore humanoid, AI, and dog robots designed to elevate daily living.
        </p>
      </section>
      <section className="container ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 py-5 overflow-auto">
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
      <section className="text-center mt-9 mb-3">
        <h1 className="text-5xl font-semibold text-zinc-800 pb-1">
          Smart Living Starts Here
        </h1>
        <p className="text-lg font-light text-zinc-600 mt-2">
          Discover AI-powered robotics that fit your lifestyle.
        </p>
      </section>
      <section className="relative lg:space-x-5 space-y-5 lg:space-y-0 grid grid-cols-1 lg:grid-cols-3 max-h-[840px] hover:cursor-pointer ">
        <div className="relative col-span-2 w-full h-[840px] ">
          <Image
            src={keytoUrl("collections/Neo_Bot/neo_library.jpg")}
            width={1080}
            height={1080}
            className="object-cover w-full h-full"
            alt="1"
          />
        </div>

        <div className="flex flex-col w-full space-y-5 h-[840px]">
          <div className="relative w-full h-[340px]">
            <Image
              src={keytoUrl("collections/Neo_Bot/_neo_bots.png")}
              width={800}
              height={900}
              className="object-cover w-full h-full"
              alt="1"
            />
          </div>

          <div className="relative overflow-hidden">
            <Image
              src={keytoUrl("collections/Neo_Bot/bot_women.avif")}
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

function CollectionRectCard({ collections }: CollectionsCardsProps) {
  return (
    <ScrollArea className="whitespace-nowrap relative container">
      <div className="flex w-max space-x-10 py-5 overflow-auto">
        <Suspense
          fallback={[...Array(6)].map((_, index) => (
            <CollectionsCardSkeleton key={`Collections-sekelton-${index}`} />
          ))}>
          {collections.map(({ node }) => (
            <CollectionsCard collection={node} key={node.id} />
          ))}
        </Suspense>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function OurMission() {
  return (
    <>
      <section className="text-center mt-9 mb-3">
        <h1 className="text-5xl font-semibold text-zinc-800 pb-1">
          Our Mission
        </h1>
        <p className="text-lg font-light text-zinc-600 mt-2">
          Building intelligent machines that empower people—at home, in work,
          and beyond.
        </p>
      </section>
      <section className="max-w-[1920px] mx-auto h-auto md:h-[580px] bg-[#F2ECEC] grid grid-cols-1 md:grid-cols-12">
        <div className="relative w-full h-[340px] md:h-[580px] order-2 md:order-1 col-span-12 md:col-span-8 overflow-hidden">
          <Image
            src="https://robots-store.s3.eu-north-1.amazonaws.com/collections/Neo_Bot/forest_bots.avif"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex flex-col justify-center items-start px-6 py-10 md:px-16 md:py-0">
          <p className="text-[15px] md:text-[19px] leading-relaxed mb-6 text-zinc-700">
            At RoboForge, we believe robotics should be accessible, ethical, and
            inspiring. From humanoid helpers to agile quadrupeds, our mission is
            to bring cutting-edge AI into everyday life—designed for learning,
            exploration, and real-world impact.
          </p>

          <Link
            href=""
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "border-2 border-primary text-white rounded px-3 py-3 md:px-9 md:py-6"
            )}>
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
