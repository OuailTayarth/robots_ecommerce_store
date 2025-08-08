import type { NavItemWithOptionalChildren } from "@/types";

import { slugify } from "@/lib/utils";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RobotForge",
  description: "Ecommerce Application built with NextJS 14",
  url: "https://github.com",
  address: "Kungsgatan 12 111 35, Stockholm, Sweden",
  phone: "+46 8 123 456 78",
  email: "hello@NextBot.com",
  mainNav: [
    {
      title: "Shop",
      href: "/shop",
      description: "All the products we have to offer.",
      items: [],
    },
    {
      title: "Humanoid",
      href: "/collections/humanoid-robots",
      description: "Explore humanoid robots.",
      items: [],
    },
    {
      title: "Dogs ",
      href: "/collections/dog-robots",
      description: "Explore quadruped robots.",
      items: [],
    },
    {
      title: "Blog",
      href: "https://github.com",
      description: "Read our latest blog posts.",
      items: [],
    },
    {
      title: "Contact",
      href: "#",
      description: "Read our latest blog posts.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
