import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { Icons } from "./icons";
import Branding from "./Branding";
import MobileNavbar from "./MobileNavbar";
import SearchInput from "./SearchInput";
import { SideMenu } from "./SideMenu";

async function MainNavbar() {
  return (
    <nav className="bg-background/95 fixed z-50 w-full">
      <div className="container">
        <div className="hidden md:flex gap-x-8 justify-between items-center">
          {/* Menu & branding */}
          <div className="flex gap-x-3 items-center">
            <SideMenu />
            <Branding />
          </div>

          <Suspense>
            <SearchInput />
          </Suspense>

          {/* Nav Action */}
          <div className="flex gap-x-5 relative items-center">
            <Link href={"/wish-list"}>
              <Icons.heart className="w-4 h-4" aria-label="wishlist" />
            </Link>

            <Suspense fallback={<CartLink productCount={0} />}>
              <CartNav />
            </Suspense>
          </div>
        </div>

        <MobileNavbar />
      </div>
    </nav>
  );
}

export default MainNavbar;
