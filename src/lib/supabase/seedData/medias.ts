import db from "../db";
import * as schema from "../schema";

const medias = [
  {
    key: "public/RobotDance.jpg",
    alt: "robot-dance",
  },
  {
    key: "public/RobotJump.jpg",
    alt: "robot-jump",
  },
  {
    key: "public/RobotStand.jpg",
    alt: "robotStand",
  },
];

const seedMedias = async () => {
  try {
    const insertedMedia = await db
      .insert(schema.medias)
      .values(medias)
      .returning();
    console.log(`Medias are added to the DB.`, insertedMedia);
  } catch (err) {
    console.log("Error happen while inserting Media", err);
  }
};
export default seedMedias;
