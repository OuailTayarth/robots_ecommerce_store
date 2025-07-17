import db from "../db";
import * as schema from "../schema";
import { InsertProductMedias } from "../schema";

/*
  ──  ID reference map  ──────────────────────────
  product 301  → humanoid  (featuredImageId 10)
           302  → G1 arm   (featuredImageId 1)
           303  → G1‑Comp  (featuredImageId 8)
           401  → Go2      (featuredImageId 3)
           402  → Go1      (featuredImageId 4)
           403  → A1       (featuredImageId 1)

  media  51‑56 are the extra angles you uploaded:
    51  neo‑side.jpg
    52  neo-back.jpg
    53  g1-gripper.jpg
    54  go2-top.jpg
    55  go1-side.jpg
    56  a1-jump.jpg
*/

const productMedias: InsertProductMedias[] = [
  { id: "pm1", productId: "301", mediaId: "10", priority: 1 },
  { id: "pm2", productId: "301", mediaId: "8", priority: 2 },

  { id: "pm3", productId: "302", mediaId: "2", priority: 1 },

  { id: "pm4", productId: "401", mediaId: "11", priority: 1 },

  { id: "pm5", productId: "402", mediaId: "5", priority: 1 },

  { id: "pm6", productId: "403", mediaId: "1", priority: 1 },
];

const seedProductMedias = async () => {
  try {
    await db.delete(schema.productMedias);
    await db
      .insert(schema.productMedias)
      .values(productMedias)
      .onConflictDoNothing({ target: schema.productMedias.id })
      .returning();

    console.log("product_medias seeded ✓");
  } catch (err) {
    console.error("seeding product_medias failed", err);
  }
};

export default seedProductMedias;
