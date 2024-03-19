"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import watchlistSymbolsDefault from "@/db/watchlistSymbols.json";
import Cookies from "js-cookie";
import { KEY_SYMBOL_LIST } from "@/constants";

interface FavButtonProps {
  symbol: string | undefined;
}

export interface WatchSymbol {
  symbol: string;
  order?: number;
}

export default function FavButton({ symbol }: FavButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [watchlistSymbols, setWatchlistSymbols] = useState<WatchSymbol[]>([]);

  // Load watchlist symbols from localStorage or default
  useEffect(() => {
    const storedItems = localStorage.getItem(KEY_SYMBOL_LIST);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems) as WatchSymbol[];
      setWatchlistSymbols(parsedItems);
    } else {
      const defaultSymbols = watchlistSymbolsDefault.map((value, index) => ({
        symbol: value,
        order: index,
      }));
      localStorage.setItem(KEY_SYMBOL_LIST, JSON.stringify(defaultSymbols));
      setWatchlistSymbols(defaultSymbols);
    }
  }, []);

  // Update favorite state based on symbol presence
  useEffect(() => {
    if (symbol) {
      setIsFav(findSymbolInList(symbol, watchlistSymbols));
    } else {
      setIsFav(false);
    }
  }, [symbol, watchlistSymbols]);

  const findSymbolInList = (symbol: string, list: WatchSymbol[]) => {
    return list.some((item) => item.symbol === symbol);
  };

  // Toggle favorite state and handle adding/removing symbol
  const toggleFavorite = () => {
    setIsFav(!isFav);
    if (isFav) {
      handleRemoveItem(symbol || "X"); // Enforce symbol existence when removing
    } else {
      handleAddItem({ symbol: symbol || "X", order: watchlistSymbols.length });
    }
  };

  // Remove symbol from watchlist
  const handleRemoveItem = (itemToRemove: string) => {
    setWatchlistSymbols(
      watchlistSymbols.filter((item) => item.symbol !== itemToRemove)
    );
    updateCookie(
      JSON.stringify(
        watchlistSymbols.filter((item) => item.symbol !== itemToRemove)
      )
    );
    localStorage.setItem(
      KEY_SYMBOL_LIST,
      JSON.stringify(
        watchlistSymbols.filter((item) => item.symbol !== itemToRemove)
      )
    );
  };

  const updateCookie = (value?: string) => {
    if (value) {
      Cookies.set(KEY_SYMBOL_LIST, value, { expires: 30 });
    } else {
      // console.log(Cookies);
    }
  };

  // Add symbol to watchlist
  const handleAddItem = (item: WatchSymbol) => {
    if (!findSymbolInList(item.symbol, watchlistSymbols)) {
      setWatchlistSymbols([...watchlistSymbols, item]);
      localStorage.setItem(
        KEY_SYMBOL_LIST,
        JSON.stringify([...watchlistSymbols, item])
      );
      updateCookie(JSON.stringify([...watchlistSymbols, item]));
    }
  };

  return (
    <IconButton onClick={toggleFavorite}>
      {isFav ? <StarIcon color="primary" /> : <StarOutlineIcon />}
    </IconButton>
  );
}
