"use client";
import { gql } from "@/gql";
import { cn } from "@/lib/utils";
import { useMutation } from "urql";
import { Icons } from "@/components/layouts/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useWishlistStore from "../useWishlistStore";
import { getAnonUserId } from "@/lib/utils";

type Props = {
  productId: string;
  productName: string;
  onWishlistChange?: () => void;
};

const AddProductToWishList = gql(/* GraphQL */ `
  mutation AddProductToWishList($productId: String, $userId: UUID) {
    insertIntowishlistCollection(
      objects: { user_id: $userId, product_id: $productId }
    ) {
      affectedCount
      records {
        __typename
        user_id
        product_id
      }
    }
  }
`);
const RemoveWishlistItemMutation = gql(/* GraphQL */ `
  mutation RemoveWishlistItemMutation($productId: String, $userId: UUID) {
    deleteFromwishlistCollection(
      filter: {
        and: [{ user_id: { eq: $userId } }, { product_id: { eq: $productId } }]
      }
      atMost: 1
    ) {
      records {
        __typename
      }
    }
  }
`);

function AddToWishListButton({ productId, productName }: Props) {
  const anonUserId = getAnonUserId();
  const { toast } = useToast();
  const wishlist = useWishlistStore((s) => s.wishlist);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishItem);

  const [, addToWishlist] = useMutation(AddProductToWishList);
  const [, removeWishlist] = useMutation(RemoveWishlistItemMutation);

  const onClickHandler = async () => {
    if (wishlist[productId]) {
      await removeWishlist({ productId, userId: anonUserId });
      toast({ title: `${productName} removed from wishList.` });
    } else {
      await addToWishlist({ productId, userId: anonUserId });
      toast({ title: `${productName} added to wishList.` });
    }
    toggleWishlist(productId);
  };

  return (
    <Button
      className="rounded-full p-3"
      variant="ghost"
      onClick={onClickHandler}
    >
      <Icons.heart
        className={cn(
          "w-4 h-4",
          wishlist[productId] ? "fill-red-600" : "fill-none"
        )}
      />
    </Button>
  );
}

export default AddToWishListButton;
