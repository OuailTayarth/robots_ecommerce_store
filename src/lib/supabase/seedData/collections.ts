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
      "Explore cutting-edge humanoid companions designed for assistance, learning, and interactive fun. Perfect for research labs or futuristic households.",
    featuredImageId: "23",
    order: "1",
  },

  // Dog Robots
  {
    id: "2",
    label: "Dog Robots",
    title: "Agile Quadrupeds for Work & Play",
    slug: "dog-robots",
    description:
      "Discover our range of four-legged robots—ideal for search-and-rescue, inspection, or just an advanced robotic pet that never needs a walk.",
    featuredImageId: "16",
    order: "10",
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
