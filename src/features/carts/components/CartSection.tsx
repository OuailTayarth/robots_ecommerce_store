"use client";
import { useAnonUserId } from "../hooks/useAnonUserId";
import UserCartSection from "./UserCartSection";

import GuestCartSection from "./GuestCartSection";

function CartSection() {
  const anonUserId = useAnonUserId();
  return (
    <>
      {anonUserId ? (
        <UserCartSection userId={anonUserId} />
      ) : (
        <GuestCartSection />
      )}
    </>
  );
}

export default CartSection;
