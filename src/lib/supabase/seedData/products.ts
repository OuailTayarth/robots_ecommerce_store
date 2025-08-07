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
      "Meet NEO — your 162 cm home helper. This intelligent robot walks and runs with natural movement while carrying up to 20 kg. Its advanced AI enables natural conversation and helps automate daily household chores with ease.",
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
      "A lightweight 6-axis robotic arm designed for precision and ease of use. Perfect for researchers and hobbyists who need a programmable solution for laboratory experiments or home automation projects.",
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
      "Competition-ready G1 bundle featuring quick-swap gripper technology and high-torque servos. Specifically designed for RoboCup events and advanced robotics projects requiring maximum performance.",
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
      "Go2 is a nimble robot dog with extended battery life and smart side-follow AI capabilities. It can sprint at speeds up to 17 km/h and is perfect for educational purposes or impressive demonstrations.",
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
      "An affordable 12 kg quadruped robot that reaches speeds of 3.7 m/s while automatically avoiding obstacles. Excellent entry point for learning about artificial intelligence and simultaneous localization and mapping technology.",
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
      "Research-grade agile dog robot with powerful joints and comprehensive open SDK. Trusted by universities worldwide for advanced locomotion studies and reinforcement learning experiments.",
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
