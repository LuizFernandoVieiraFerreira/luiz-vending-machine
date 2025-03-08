import { ItemType, Item } from "../types";

interface Props {
  inventory: Record<ItemType, Item>;
}

const Inventory = ({ inventory }: Props) => {
  return (
    <div className="h-[350px] bg-[#f3f3fa] rounded-[6px] flex justify-around py-4 px-2">
      {Object.entries(inventory).map(([key, item]) => {
        return (
          <div
            key={key}
            className={`m-[10px] ${key} flex flex-col-reverse gap-8 min-w-[32px]`}
          >
            {Array.from({ length: item.stock }).map((_, index) => (
              <div key={index}>{item.icon}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Inventory;
