import db from "../db";
import * as schema from "../schema";
import { InsertProducts } from "../schema";

/**
 * 
product1: https://www.unitree.com/h1
product2: https://www.unitree.com/g1
product3: G1-Comp : https://www.unitree.com/robocup
Dog robots:
product4: https://www.unitree.com/go2
product5: https://www.unitree.com/go1
product6: https://www.unitree.com/a1 
 */

const products: InsertProducts[] = [
  // ─────── HUMANOID / ARM ROBOTS  (collectionId: "1") ───────
  {
    id: "301",
    name: "1X NEO Humanoid",
    slug: "1x-neo",
    description:
      "Meet NEO — your 162 cm home helper. It walks, runs, carries 20 kg, and chats naturally to make daily chores effortless.",
    featured: true,
    badge: "featured",
    rating: "4.7",
    tags: ["humanoid", "home-assistant"],
    featuredImageId: "9",
    collectionId: "1",
    stock: 6,
    price: "19999",
  },
  {
    id: "302",
    name: "Unitree G1 Dexterous Arm",
    slug: "unitree-g1",
    description:
      "A lightweight 6-axis robotic arm that’s easy to program and highly precise — perfect for research or home tinkering.",
    featured: true,
    badge: "featured",
    rating: "4.4",
    tags: ["robot-arm", "research"],
    featuredImageId: "13",
    collectionId: "1",
    stock: 10,
    price: "16000",
  },
  {
    id: "303",
    name: "Unitree G1-Comp",
    slug: "unitree-g1-comp",
    description:
      "Competition-ready G1 bundle with quick-swap gripper and high-torque servos — ideal for RoboCup and advanced projects.",
    featured: false,
    badge: "best_sale",
    rating: "4.2",
    tags: ["robot-arm", "competition"],
    featuredImageId: "14",
    collectionId: "1",
    stock: 4,
    price: "10250",
  },

  // ─────── DOG ROBOTS  (collectionId: "2") ───────
  {
    id: "401",
    name: "Unitree Go2",
    slug: "unitree-go2",
    description:
      "Go2 is a nimble robot dog with longer battery, smart side-follow AI, and 17 km/h sprint — perfect for learning or showing off.",
    featured: true,
    badge: "featured",
    rating: "4.8",
    tags: ["quadruped", "lidar"],
    featuredImageId: "5",
    collectionId: "2",
    stock: 18,
    price: "5250",
  },
  {
    id: "402",
    name: "Unitree Go1",
    slug: "unitree-go1",
    description:
      "An affordable 12 kg quadruped that runs 3.7 m/s and dodges obstacles — a great first step into AI and SLAM.",
    featured: false,
    badge: "best_sale",
    rating: "4.5",
    tags: ["quadruped", "education"],
    featuredImageId: "16",
    collectionId: "2",
    stock: 25,
    price: "9650",
  },
  {
    id: "403",
    name: "Unitree A1",
    slug: "unitree-a1",
    description:
      "Research-grade agile dog robot with powerful joints and open SDK — trusted by universities for locomotion and RL experiments.",
    featured: true,
    badge: "new_product",
    rating: "4.3",
    tags: ["quadruped", "research"],
    featuredImageId: "21",
    collectionId: "2",
    stock: 12,
    price: "11650",
  },
];

const seedProducts = async () => {
  try {
    await db.delete(schema.products);
    await db
      .insert(schema.products)
      .values(products)
      .onConflictDoNothing()
      .returning();
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};

export default seedProducts;
