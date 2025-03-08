import { CupSoda, GlassWater, Coffee } from "lucide-react";
import { ItemType, Item } from "../types";

export const itemIcons: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  water: { icon: GlassWater, color: "#ccc" }, // text-blue-500
  cola: { icon: CupSoda, color: "#ccc" }, // text-red-500
  coffee: { icon: Coffee, color: "#ccc" }, // text-stone-500
};

interface Props {
  inventory: Record<ItemType, Item>;
}

const Inventory = ({ inventory }: Props) => {
  return (
    <div className="h-[350px] bg-[#f3f3fa] rounded-[6px] flex justify-around py-4 px-2">
      {Object.entries(inventory).map(([key, item]) => {
        const { icon: Icon, color } =
          itemIcons[item.name.toLowerCase()] || itemIcons.water;

        return (
          <div
            key={key}
            className={`m-[10px] ${key} flex flex-col-reverse gap-8 min-w-[32px]`}
          >
            {Array.from({ length: item.stock }).map((_, index) => (
              <Icon key={index} size={32} className={`${color}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Inventory;
