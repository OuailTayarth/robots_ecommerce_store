"use client";
import { getAnonUserId } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "urql";
import { FetchCartQuery } from "../components/UserCartSection";
import { createCartMutation, updateCartsMutation } from "../query";
import useCartStore from "../useCartStore";

function useCartActions(productId: string) {
  const { toast } = useToast();
  const anonUserId = getAnonUserId();
  const [, addToCart] = useMutation(createCartMutation);
  const [, updateCart] = useMutation(updateCartsMutation);
  const addProductStorage = useCartStore((s) => s.addProductToCart);

  const [{ data }, refetch] = useQuery({
    query: FetchCartQuery,
    variables: {
      userId: anonUserId,
      first: 100,
    },
    requestPolicy: "network-only",
  });

  const addOrUpdateProduct = async (quantity: number) => {
    const existedProduct = data?.cartsCollection.edges.find(
      ({ node }) => node.product_id === productId
    );
    try {
      let res;
      if (!existedProduct) {
        res = await addToCart({
          productId,
          userId: anonUserId,
          quantity,
        });
        refetch({ requestPolicy: "network-only" });
      } else {
        res = await updateCart({
          productId,
          userId: anonUserId,
          newQuantity: existedProduct.node.quantity + quantity,
        });
        refetch({ requestPolicy: "network-only" });
      }
      if (res) toast({ title: "Success, Added a Product to the Cart." });
    } catch (err) {
      toast({ title: "Error, Unexpected Error occurred." });
    }
  };

  const guestAddProduct = (quantity: number) => {
    addProductStorage(productId, quantity);
    toast({ title: "Success, Added a Product to the Cart." });
  };

  const addProductToCart = (quantity: number) =>
    !anonUserId ? guestAddProduct(quantity) : addOrUpdateProduct(quantity);

  return { addProductToCart };
}

export default useCartActions;
