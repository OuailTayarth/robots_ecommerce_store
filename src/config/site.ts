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
      title: "Our Mission",
      href: "#",
      description: "Our Story.",
      items: [],
    },
    {
      title: "Humanoid",
      href: "#",
      description: "Read our latest blog posts.",
      items: [],
    },
    {
      title: "Dogs ",
      href: "#",
      description: "Read our latest blog posts.",
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
      href: "https://github.com",
      description: "Read our latest blog posts.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
