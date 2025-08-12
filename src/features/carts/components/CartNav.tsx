"use client";
import { useMemo } from "react";
import { useQuery } from "@urql/next";
import CartLink from "./CartLink";
import { FetchCartQuery } from "./UserCartSection";
import useCartStore, { calcProductCountStorage } from "../useCartStore";
import { useAnonUserId } from "../hooks/useAnonUserId";

function CartNav() {
  // added GuestCart to use local storage for future implementation when adding Auth for user.
  const anonUserId = useAnonUserId();
  return (
    <>{!anonUserId ? <GuestCart /> : <UserCartNav userId={anonUserId} />}</>
  );
}

const GuestCart = () => {
  const cart = useCartStore((s) => s.cart);

  const productCountStorage = useMemo(
    () => calcProductCountStorage(cart),
    [cart]
  );
  return <CartLink productCount={productCountStorage} />;
};

const UserCartNav = ({ userId }: { userId: string }) => {
  const [{ data, fetching, error }] = useQuery({
    query: FetchCartQuery,
    variables: {
      userId: userId,
      first: 100,
    },
    pause: !userId,
    requestPolicy: "cache-and-network",
  });

  const carts = data?.cartsCollection;

  const serverCount = useMemo(
    () => (carts?.edges || []).reduce((acc, cur) => acc + cur.node.quantity, 0),
    [carts.edges]
  );

  // local fallback count
  const localCart = useCartStore((s) => s.cart);
  const localCount = useMemo(
    () => calcProductCountStorage(localCart),
    [localCart]
  );
  console.log("Local Count", localCount);
  console.log("Server Count", serverCount);

  // reflect on server when it available otherwise show local product basket cart number
  const productCount = serverCount || localCount;
  console.log("productCount", productCount);

  return (
    <div>
      {error && <CartLink productCount={0} />}

      {fetching && <CartLink productCount={0} />}

      {carts && <CartLink productCount={productCount} />}
    </div>
  );
};
export default CartNav;
