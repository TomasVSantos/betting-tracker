"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bet } from "@/lib/types";
import { CheckCircle, XCircle } from "lucide-react";

export function BetList({ bets, onUpdate }: { bets: Bet[]; onUpdate: (bet: Bet) => void }) {
  const handleSetResult = (bet: Bet, result: "won" | "lost") => {
    onUpdate({
      ...bet,
      settled: true,
      result,
    });
  };

  if (bets.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No bets to display</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Sport</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Bet Type</TableHead>
          <TableHead>Stake</TableHead>
          <TableHead>Odds</TableHead>
          <TableHead>Potential Win</TableHead>
          <TableHead>Status</TableHead>
          {!bets[0]?.settled && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bets.map((bet) => (
          <TableRow key={bet.id}>
            <TableCell>{new Date(bet.date).toLocaleDateString()}</TableCell>
            <TableCell>{bet.sport}</TableCell>
            <TableCell>{bet.event}</TableCell>
            <TableCell>{bet.betType}</TableCell>
            <TableCell>${bet.stake.toFixed(2)}</TableCell>
            <TableCell>{bet.odds}</TableCell>
            <TableCell>${(bet.stake * (bet.odds - 1)).toFixed(2)}</TableCell>
            <TableCell>
              {bet.settled ? (
                <Badge variant={bet.result === "won" ? "default" : "destructive"}>
                  {bet.result?.toUpperCase() || "PENDING"}
                </Badge>
              ) : (
                <Badge variant="secondary">PENDING</Badge>
              )}
            </TableCell>
            {!bet.settled && (
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleSetResult(bet, "won")}>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleSetResult(bet, "lost")}>
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
