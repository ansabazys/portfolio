"use client";

import { useEffect } from "react";
import { init } from "@traqory/sdk";

export function TraqoryProvider() {
  useEffect(() => {
    init({
      apiKey: process.env.NEXT_PUBLIC_TRAQORY_API_KEY!,
      endpoint: process.env.NEXT_PUBLIC_TRAQORY_ENDPOINT!,
      debug: false,
    });
  }, []);

  return null;
}