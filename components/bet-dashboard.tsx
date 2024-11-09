"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetList } from "@/components/bet-list";
import { BetStats } from "@/components/bet-stats";
import { NewBetForm } from "@/components/new-bet-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Bet } from "@/lib/types";

export function BetDashboard() {
  const [bets, setBets] = useState<Bet[]>([]);
  const { toast } = useToast();

  const addBet = (bet: Bet) => {
    setBets([...bets, { ...bet, id: Date.now().toString() }]);
    toast({
      title: "Bet added successfully",
      description: "Your bet has been added to your tracker.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Bet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bet</DialogTitle>
            </DialogHeader>
            <NewBetForm onSubmit={addBet} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <BetStats bets={bets} />
      </div>

      <Card>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="active">Active Bets</TabsTrigger>
            <TabsTrigger value="completed">Completed Bets</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <BetList
              bets={bets.filter((bet) => !bet.settled)}
              onUpdate={(updatedBet) => {
                setBets(
                  bets.map((bet) =>
                    bet.id === updatedBet.id ? updatedBet : bet
                  )
                );
              }}
            />
          </TabsContent>
          <TabsContent value="completed">
            <BetList
              bets={bets.filter((bet) => bet.settled)}
              onUpdate={(updatedBet) => {
                setBets(
                  bets.map((bet) =>
                    bet.id === updatedBet.id ? updatedBet : bet
                  )
                );
              }}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}