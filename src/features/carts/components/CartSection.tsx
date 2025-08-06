"use client";
import { getAnonUserId } from "@/lib/utils";
import UserCartSection from "./UserCartSection";

import GuestCartSection from "./GuestCartSection";

function CartSection() {
  const anonUserId = getAnonUserId();
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
