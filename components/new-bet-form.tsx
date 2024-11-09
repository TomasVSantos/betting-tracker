"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bet } from "@/lib/types";

const formSchema = z.object({
  date: z.string(),
  sport: z.string().min(1, "Sport is required"),
  event: z.string().min(1, "Event is required"),
  betType: z.string().min(1, "Bet type is required"),
  stake: z.number().min(1, "Stake is required"),
  odds: z.number().min(1, "Odds are required"),
});

export function NewBetForm({ onSubmit, bets = [] }: { onSubmit: (bet: Bet) => void; bets?: Bet[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      sport: "",
      event: "",
      betType: "",
      stake: 0,
      odds: 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newBet = {
      id: "",
      ...values,
      settled: false,
    } as Bet;

    onSubmit(newBet);
    localStorage.setItem("bets", JSON.stringify([...bets, newBet]));
    form.reset();
  };

  const handleStakeChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value === "" ? "0" : e.target.value;
    field.onChange(Number(value));
  };

  const handleOddsChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value === "" ? "0" : e.target.value;
    field.onChange(Number(value));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="baseball">Baseball</SelectItem>
                  <SelectItem value="hockey">Hockey</SelectItem>
                  <SelectItem value="soccer">American Football</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Lakers vs Warriors" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="betType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="moneyline">Moneyline</SelectItem>
                  <SelectItem value="spread">Spread</SelectItem>
                  <SelectItem value="totals">Totals (Over/Under)</SelectItem>
                  <SelectItem value="parlay">Parlay</SelectItem>
                  <SelectItem value="prop">Prop Bet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stake</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.value}
                  onChange={(e) => handleStakeChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="odds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Odds</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  value={field.value}
                  onChange={(e) => handleOddsChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Bet
        </Button>
      </form>
    </Form>
  );
}
