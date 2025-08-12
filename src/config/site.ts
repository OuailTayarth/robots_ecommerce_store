import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RobotForge",
  description: "Ecommerce Application built with NextJS 14",
  url: "https://github.com/OuailTayarth",
  address: "Kungsgatan 12 111 35, Stockholm, Sweden",
  phone: "+46 8 123 456 78",
  email: "hello@NextBot.com",
  mainNav: [
    {
      title: "Home",
      href: "/",
      description: "Home",
      items: [],
    },
    {
      title: "Our Mission",
      href: "/our-mission",
      description: "Our mission",
      items: [],
    },
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
      title: "Robot Dogs ",
      href: "/collections/dog-robots",
      description: "Explore quadruped robots.",
      items: [],
    },
    {
      title: "Contact",
      href: "#",
      description: "Contact Us",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
