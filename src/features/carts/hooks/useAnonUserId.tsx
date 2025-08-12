"use client";
import { useEffect, useState } from "react";
import { getAnonUserId } from "@/lib/utils";

export const useAnonUserId = () => {
  const [anonId, setAnonId] = useState<string | null>(null);
  useEffect(() => {
    setAnonId(getAnonUserId() ?? null);
  }, []);
  return anonId; // null on first render then return a valid UUID on mount
};
