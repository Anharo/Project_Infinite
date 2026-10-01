// src/lib/tools.ts
export interface Tool {
  id: string;
  name: string;
  description: string;
  badge: string;
}

const badges = [
  "from-indigo-500 to-violet-500",
  "from-sky-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-fuchsia-500 to-purple-500",
  "from-lime-500 to-green-500",
  "from-blue-500 to-indigo-500",
];

export const tools: Tool[] = Array.from({ length: 16 }, (_, i) => {
  const letter = String.fromCharCode(65 + i);
  return {
    id: `tool-${letter.toLowerCase()}`,
    name: `Tool ${letter}`,
    description: `Drop a file to process it with Tool ${letter}.`,
    badge: badges[i % badges.length],
  };
});

export const getTool = (id?: string) => tools.find((t) => t.id === id);