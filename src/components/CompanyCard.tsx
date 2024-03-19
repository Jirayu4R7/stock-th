import * as React from "react";

import clsxm from "@/lib/clsxm";
import { CompanyProfile } from "@/interface/CompanyProfile";
import { fetchStockInfo } from "@/services/fetchData";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

type CompanyCardProps = {
  symbol: string;
  // profile: CompanyProfile | null;
} & React.ComponentPropsWithoutRef<"div">;

export default async function CompanyCard({
  className,
  // profile,
  symbol,
  ...rest
}: CompanyCardProps) {
  const profile: CompanyProfile = await fetchStockInfo(symbol, "company");
  return (
    <div className={clsxm(["", className])} {...rest}>
      <Card>
        <CardContent>
          <Grid container direction={"row"}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Avatar
                variant="rounded"
                alt={profile?.name}
                src={profile?.logoUrl}
                sx={{ width: 140, height: 140 }}
              />
              <Typography mb={0.5} fontSize={18}>
                {profile?.name}
              </Typography>
            </Grid>
            <Typography mb={0.5} fontSize={18}>
              ข้อมูลทั่วไป
            </Typography>
          </Grid>
          <Typography>{profile?.businessType}</Typography>
          <Box mb={2}></Box>

          {[
            { label: "ตลาดหลักทรัพย์", value: profile?.market },
            { label: "กลุ่มอุตสาหกรรม", value: profile?.sectorName },
            { label: "อุตสาหกรรม", value: profile?.industryName },
          ].map(({ label, value }) => (
            <GridSection key={label} label={label} value={value ?? ""} />
          ))}

          {/* <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography>ตลาดหลักทรัพย์</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{profile.market}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography>กลุ่มอุตสาหกรรม</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{profile.sectorName}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography>อุตสาหกรรม</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{profile.industryName}</Typography>
        </Grid>
      </Grid> */}
          {/* <Divider /> */}
          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <Typography>เว็บไซต์</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <Link href={profile?.url} color="inherit" align="right">
                  {profile?.url}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

function GridSection({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{value}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
    </>
  );
}
