"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bet } from "@/lib/types";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Percent } from "lucide-react";

export function BetStats({ bets }: { bets: Bet[] }) {
  const totalBets = bets.length;
  const completedBets = bets.filter((bet) => bet.settled).length;
  
  const totalWagered = bets.reduce((sum, bet) => sum + bet.stake, 0);
  
  const winnings = bets
    .filter((bet) => bet.settled && bet.result === "won")
    .reduce((sum, bet) => sum + (bet.stake * (bet.odds - 1)), 0);
  
  const losses = bets
    .filter((bet) => bet.settled && bet.result === "lost")
    .reduce((sum, bet) => sum + bet.stake, 0);
  
  const profit = winnings - losses;
  const roi = totalWagered > 0 ? (profit / totalWagered) * 100 : 0;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {profit >= 0 ? (
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-500" />
            )}
            <div className="text-2xl font-bold">
              ${Math.abs(profit).toFixed(2)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            From {completedBets} completed bets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {roi >= 0 ? (
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-500" />
            )}
            <div className="text-2xl font-bold">{roi.toFixed(2)}%</div>
          </div>
          <p className="text-xs text-muted-foreground">
            Total wagered: ${totalWagered.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </>
  );
}