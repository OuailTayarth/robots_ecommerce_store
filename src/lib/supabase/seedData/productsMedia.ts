import db from "../db";
import * as schema from "../schema";

const medias = [
  { id: "1", key: "RobotDance.jpg", alt: "robot-dance" },
  {
    id: "2",
    key: "RobotJump.jpg",
    alt: "robot-jump",
  },
  {
    id: "3",
    key: "RobotStand.jpg",
    alt: "robotStand",
  },
  {
    id: "4",
    key: "RobotSit.jpg",
    alt: "RobotSit",
  },
  {
    id: "5",
    key: "robotDog1.jpg",
    alt: "robotDog",
  },
  {
    id: "6",
    key: "collections/humain_collection_bot.png",
    alt: "humain_collection_bot",
  },
  {
    id: "7",
    key: "collections/dog_collection_bot.png",
    alt: "dog_collection_bot",
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
