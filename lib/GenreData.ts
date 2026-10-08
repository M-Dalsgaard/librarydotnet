export function createName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const genreColors: Record<string, string> = {
  fantasy: "bg-[#F2E766]",
  crime: "bg-[#B3B3B3]",
  thriller: "bg-[#FC8D62]",
  romance: "bg-[#E5C494]",
  "science-fiction": "bg-[#8DA0CB]",
  "non-fiction": "bg-[#66C2A5]",
};

export const transparentColors: Record<string, string> = {
  fantasy: "bg-[#F2E766]/25",
  crime: "bg-[#B3B3B3]/25",
  thriller: "bg-[#FC8D62]/25",
  romance: "bg-[#E5C494]/25",
  "science-fiction": "bg-[#8DA0CB]/25",
  "non-fiction": "bg-[#66C2A5]/25",
};


export const genreOrder: Record<string, string> = {
  fantasy: "order-1",
  crime: "order-2",
  thriller: "order-3",
  romance: "order-4",
  "science-fiction": "order-5",
  "non-fiction": "order-6",
};