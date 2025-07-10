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
      "NEO is 1X’s 162‑cm, 30‑kg home‑assistant humanoid that walks at 4 km/h, sprints up to 12 km/h, and carries 20 kg payloads. It features 20 DoF tendon‑driven joints for safe, fluid motion, a 4‑mic beam‑forming array, and a 3‑speaker sound system for natural AI voice interaction — all designed for everyday chores and research in human environments.", // :contentReference[oaicite:0]{index=0}
    featured: true,
    badge: "featured",
    rating: "4.7",
    tags: ["humanoid", "home-assistant"],
    featuredImageId: "10",
    collectionId: "1",
    stock: 6,
    price: "19.999",
  },
  {
    id: "302",
    name: "Unitree G1 Dexterous Arm",
    slug: "unitree-g1",
    description:
      "A 6‑DoF lightweight robotic arm (4 kg) offering ±170° joint ranges, 1 kg payload, 0.03 mm repeatability, and ROS 2 / C++ / Python SDKs for rapid manipulation research.",
    featured: true,
    badge: "featured",
    rating: "4.4",
    tags: ["robot-arm", "research"],
    featuredImageId: "13",
    collectionId: "1",
    stock: 10,
    price: "16.000",
  },
  {
    id: "303",
    name: "Unitree G1‑Comp",
    slug: "unitree-g1-comp",
    description:
      "Competition‑tuned G1 arm bundle with quick‑swap gripper, high‑torque servos, and calibration kit — certified for RoboCup@Home and similar manipulation contests.",
    featured: false,
    badge: "best_sale",
    rating: "4.2",
    tags: ["robot-arm", "competition"],
    featuredImageId: "14",
    collectionId: "1",
    stock: 4,
    price: "10.250",
  },

  // ─────── DOG ROBOTS  (collectionId: "2") ───────
  {
    id: "401",
    name: "Unitree Go2",
    slug: "unitree-go2",
    description:
      "Next‑gen consumer quadruped with proprietary 4D LiDAR, 30% longer battery life, side‑follow AI, and a sprint speed up to 17 km/h — perfect for education and hobby R&D.",
    featured: true,
    badge: "featured",
    rating: "4.8",
    tags: ["quadruped", "lidar"],
    featuredImageId: "5",
    collectionId: "2",
    stock: 18,
    price: "5.250",
  },
  {
    id: "402",
    name: "Unitree Go1",
    slug: "unitree-go1",
    description:
      "Affordable 12‑kg robot dog capable of 3.7 m/s, 14‑bit joint encoders, and depth‑camera obstacle avoidance — ideal entry‑level platform for AI and SLAM projects.",
    featured: false,
    badge: "best_sale",
    rating: "4.5",
    tags: ["quadruped", "education"],
    featuredImageId: "16",
    collectionId: "2",
    stock: 25,
    price: "9.650",
  },
  {
    id: "403",
    name: "Unitree A1",
    slug: "unitree-a1",
    description:
      "Research‑grade agile quadruped with 33 N·m joint torque, 3.3 m/s dash speed, and open SDK support; widely used in universities for locomotion and RL experiments.",
    featured: false,
    badge: "new_product",
    rating: "4.3",
    tags: ["quadruped", "research"],
    featuredImageId: "21",
    collectionId: "2",
    stock: 12,
    price: "11.650",
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
