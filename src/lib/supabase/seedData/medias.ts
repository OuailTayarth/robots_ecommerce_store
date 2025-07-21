import db from "../db";
import * as schema from "../schema";

const medias = [
  { id: "1", key: "RobotDance.jpg", alt: "robot-dance" },
  { id: "2", key: "RobotJump.jpg", alt: "robot-jump" },
  { id: "3", key: "RobotStand.jpg", alt: "robot-stand" },
  { id: "4", key: "RobotSit.jpg", alt: "robot-sit" },
  { id: "5", key: "robotDog1.jpg", alt: "robot-dog" },

  // collection banners
  {
    id: "6",
    key: "collections/humain_collection_bot.png",
    alt: "humanoid banner",
  },
  { id: "7", key: "collections/dog_collection_bot.png", alt: "dog banner" },

  // extra NEO images (ids taken from your table screenshot)
  { id: "8", key: "collections/Neo_Bot/bot_women.avif", alt: "NEO with women" },
  { id: "9", key: "collections/Neo_Bot/profil.avif", alt: "NEO profile" },
  { id: "10", key: "collections/Neo_Bot/_neo_bots.png", alt: "NEO bots row" },
  {
    id: "11",
    key: "collections/Neo_Bot/library_bot.png",
    alt: "NEO in library",
  },

  {
    id: "12",
    key: "products/g1_2.png",
    alt: "Unitree G1 Dexterous Arm",
  },

  {
    id: "13",
    key: "products/g1_1.png",
    alt: "Unitree G1 Dexterous Arm",
  },

  {
    id: "14",
    key: "products/G1-Comp_2.png",
    alt: "Unitree G1‑Comp",
  },

  {
    id: "15",
    key: "products/G1-Comp_1.png",
    alt: "Unitree G1‑Comp",
  },
  {
    id: "16",
    key: "products/GO1_1.jpg",
    alt: "Unitree Go1",
  },
  {
    id: "17",
    key: "products/Unitree_A1.png",
    alt: "Unitree_A1",
  },
  {
    id: "18",
    key: "products/Unitree_A1_2.png",
    alt: "Unitree_A1",
  },
  {
    id: "19",
    key: "products/Unitree_A1_3.png",
    alt: "Unitree_A1",
  },
  {
    id: "20",
    key: "products/GO1_33.jpg",
    alt: "Unitree_A1",
  },
  {
    id: "21",
    key: "products/GO1_44.jpg",
    alt: "Unitree_A1",
  },
  {
    id: "22",
    key: "collections/Neo_Bot/cleaning_bot.png",
    alt: "Cleaning bot neo",
  },
  {
    id: "23",
    key: "collections/Neo_Bot/robot_face_In.png",
    alt: "Neo's face",
  },
  {
    id: "303",
    key: "collections/Neo_Bot/forest_bots.avif",
    alt: "Neo bots in the forest",
  },
];

const seedMedias = async () => {
  try {
    await db
      .insert(schema.medias)
      .values(medias)
      .onConflictDoNothing()
      .returning();
    console.log("Medias are added to the DB.");
  } catch (err) {
    console.log("Error happen while inserting Media", err);
  }
};
export default seedMedias;
