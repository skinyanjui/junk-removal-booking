export type Quote = {
  id: string;
  provider: string;
  total: number;
  window: string;
  rating: number;
  completedJobs: number;
  verified: boolean;
  included: string[];
  label?: "Best overall" | "Lowest price" | "Soonest pickup";
};

export const quotes: Quote[] = [
  {
    id: "river-city",
    provider: "River City Junk Removal",
    total: 225,
    window: "Today, 4–6 PM",
    rating: 4.9,
    completedJobs: 248,
    verified: true,
    included: ["Labor", "Loading", "Hauling", "Disposal", "Basic cleanup"],
    label: "Best overall",
  },
  {
    id: "green-haul",
    provider: "Green Haul Co.",
    total: 198,
    window: "Tomorrow, 8–10 AM",
    rating: 4.7,
    completedJobs: 181,
    verified: true,
    included: ["Labor", "Loading", "Hauling", "Disposal"],
    label: "Lowest price",
  },
  {
    id: "same-day",
    provider: "Same Day Cleanup",
    total: 249,
    window: "Today, 2–4 PM",
    rating: 4.8,
    completedJobs: 312,
    verified: true,
    included: ["Labor", "Loading", "Hauling", "Disposal", "Sweep-up"],
    label: "Soonest pickup",
  },
];

export const opportunities = [
  { id: "JR-1042", zip: "47715", distance: "4.2 mi", timing: "Today", type: "Furniture + mattress", value: "$180–$260", photos: 5 },
  { id: "JR-1041", zip: "47630", distance: "8.8 mi", timing: "Tomorrow", type: "Garage cleanout", value: "$320–$480", photos: 7 },
  { id: "JR-1039", zip: "42420", distance: "12.1 mi", timing: "Flexible", type: "Appliances", value: "$140–$220", photos: 3 },
];
