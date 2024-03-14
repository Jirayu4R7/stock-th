"use client";

import { StockSymbol } from "@/interface/StockSymbol";
import { fetchStockSymbolList } from "@/services/fetchData";
import {
  Autocomplete,
  Card,
  CardContent,
  Skeleton,
  TextField,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InputSymbol() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [symbols, setSymbols] = useState<StockSymbol[]>([]);
  const [, setSymbol] = useState<string | null>(searchParams?.get("symbol"));

  useEffect(() => {
    fetchStockSymbolList().then((data: any) => {
      setSymbols(data);
    });
  }, []);

  useEffect(() => {
    setSymbol(searchParams?.get("symbol"));
  }, [pathname, searchParams]);

  const updateSymbolParam = (newSymbol?: string | undefined) => {
    const params = new URLSearchParams(searchParams || undefined);
    if (newSymbol) {
      params.set("symbol", newSymbol.toString());
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}`);
    }
  };

  return (
    <>
      {symbols.length > 0 ? (
        <Card>
          <CardContent>
            <Autocomplete
              disablePortal
              id="symbols-box"
              onChange={(_event, newValue) => {
                updateSymbolParam(newValue?.symbol ?? undefined);
              }}
              options={symbols}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.symbol}>
                    {`${option.symbol} ${option.nameTH}`}
                  </li>
                );
              }}
              getOptionLabel={(option) => {
                return `${option.symbol} ${option.nameTH}`;
              }}
              renderInput={(params) => (
                <TextField {...params} label="" placeholder="ค้นหาหุ้น" />
              )}
            />
          </CardContent>
        </Card>
      ) : (
        <Skeleton variant="rounded" width={"full"} height={48} />
      )}
    </>
  );
}
