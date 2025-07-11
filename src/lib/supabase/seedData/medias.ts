import db from "../db";
import * as schema from "../schema";

const medias = [
  { id:"1",
    key: "RobotDance.jpg",
    alt: "robot-dance",
  },
  {
    id:"2",
    key: "RobotJump.jpg",
    alt: "robot-jump",
  },
  {
    id:"3",
    key: "RobotStand.jpg",
    alt: "robotStand",
  },
  {
    id:"4",
    key: "RobotSit.jpg",
    alt: "RobotSit",
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
