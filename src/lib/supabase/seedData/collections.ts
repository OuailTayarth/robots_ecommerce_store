import db from "../db";
import * as schema from "../schema";

const collections = [
  // Humanoid Robots
  {
    id: "1",
    label: "Humanoid Robots",
    title: "Bring Home a Personal Humanoid",
    slug: "humanoid-robots",
    description:
      "Step into the future with our advanced humanoid robots – engineered to assist with daily tasks while learning alongside you. These intelligent companions blend natural movement with conversational AI, making them perfect for tech enthusiasts, educational institutions, and households seeking innovative solutions. Experience the seamless integration of cutting-edge robotics into your everyday life.",
    featuredImageId: "23",
    order: 1,
  },

  // Dog Robots
  {
    id: "2",
    label: "Dog Robots",
    title: "Robotic Dogs That Work and Play",
    slug: "dog-robots",
    description:
      "Meet your new robotic companion – where precision engineering meets playful agility. Our quadruped robots excel in real-world applications from industrial inspections to search-and-rescue operations, while their approachable design makes them ideal learning tools. With obstacle-navigating intelligence and customizable capabilities, they're transforming how we interact with technology both professionally and personally.",
    featuredImageId: "5",
    order: 10,
  },
];

const seedCollections = async () => {
  try {
    await db.delete(schema.collections);

    const insertedCollections = await db
      .insert(schema.collections)
      .values(collections)
      .onConflictDoNothing()
      .returning();
    if (insertedCollections != null)
      console.log(`collections are added to the DB.`);
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};

export default seedCollections;
