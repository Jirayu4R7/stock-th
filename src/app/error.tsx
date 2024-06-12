"use client";

import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex h-screen flex-col items-center justify-center pt-2">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button
        onClick={() => reset()}
        variant="contained"
        startIcon={<Refresh />}
      >
        Try again
      </Button>
    </div>
  );
}
