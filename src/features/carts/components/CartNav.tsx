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
  const [{ data, fetching, error }, refetch] = useQuery({
    query: FetchCartQuery,
    variables: {
      userId: userId,
    },
    pause: !userId,
  });

  const carts = data?.cartsCollection;

  const productCount = useMemo(
    () => (carts?.edges || []).reduce((acc, cur) => acc + cur.node.quantity, 0),
    [carts.edges]
  );

  return (
    <div>
      {error && <CartLink productCount={0} />}

      {fetching && <CartLink productCount={0} />}

      {carts && <CartLink productCount={productCount} />}
    </div>
  );
};
export default CartNav;
