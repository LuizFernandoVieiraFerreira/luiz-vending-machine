import { getIcon } from "./itemIcons";

interface Props {
  item: string | null;
}

const DispenseSlot = ({ item }: Props) => {
  if (!item)
    return (
      <div className="h-[46px] mt-[10px] mr-[24px] ml-[24px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center" />
    );

  return (
    <div className="h-[46px] mt-[10px] mr-[24px] ml-[24px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center">
      {getIcon(item)}
    </div>
  );
};

export default DispenseSlot;
