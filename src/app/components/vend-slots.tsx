import { itemIcons } from "./inventory";

interface Props {
  item: string | null;
}

const VendSlot = ({ item }: Props) => {
  if (!item)
    return (
      <div className="h-[46px] mt-[10px] mr-[112px] ml-[12px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center" />
    );

  const itemKey = Object.keys(itemIcons).find(
    (key) => key.toLowerCase() === item.toLowerCase()
  ) as keyof typeof itemIcons | undefined;

  const { icon: Icon, color } = itemKey ? itemIcons[itemKey] : itemIcons.water;

  return (
    <div className="h-[46px] mt-[10px] mr-[112px] ml-[12px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center">
      <Icon size={32} className={color} />
    </div>
  );
};

export default VendSlot;
