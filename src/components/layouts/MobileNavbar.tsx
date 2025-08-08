import { Suspense } from "react";
import CartNav from "../../features/carts/components/CartNav";
import Branding from "./Branding";
import MobileSearchInput from "./MobileSearchInput";
import { SideMenu } from "./SideMenu";
import CartLink from "../../features/carts/components/CartLink";
import Link from "next/link";
import { Icons } from "./icons";

function MobileNavbar() {
  return (
    <div className="md:hidden relative flex gap-x-8 justify-between items-center h-[64px]">
      <div className="flex gap-x-3 items-center">
        <SideMenu />
        <MobileSearchInput />
      </div>

      <Branding />
      <div className="flex gap-x-3 items-center">
        <Link href={"/wish-list"}>
          <Icons.heart className="w-4 h-4" aria-label="wishlist" />
        </Link>
        <Suspense fallback={<CartLink productCount={0} />}>
          <CartNav />
        </Suspense>
      </div>
    </div>
  );
}

export default MobileNavbar;
