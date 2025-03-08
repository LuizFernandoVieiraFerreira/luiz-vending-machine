import { Item } from "../types";

interface Props {
  item: Item | null;
}

const DispenseSlot = ({ item }: Props) => {
  return (
    <div className="h-[46px] mt-[18px] mr-[24px] ml-[24px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center">
      {item ? item.icon : null}
    </div>
  );
};

export default DispenseSlot;
