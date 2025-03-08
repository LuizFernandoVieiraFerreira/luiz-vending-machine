import { CupSoda, GlassWater, Coffee } from "lucide-react";

export const itemIcons: Record<string, React.ElementType> = {
  water: GlassWater,
  cola: CupSoda,
  coffee: Coffee,
};

export const getIcon = (itemName: string) => {
  const Icon = itemIcons[itemName.toLowerCase()] || itemIcons.water;
  return <Icon size={32} className="gray-300" />;
};
