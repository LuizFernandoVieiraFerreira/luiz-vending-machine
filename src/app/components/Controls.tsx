import { CupSoda, GlassWater, Coffee, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemType, PaymentMethod } from "../types";

interface Props {
  paymentMethod: PaymentMethod | null;
  balance: number;
  purchaseItem: (item: ItemType) => void;
  receiveChange: () => void;
}

const Controls = ({
  paymentMethod,
  balance,
  purchaseItem,
  receiveChange,
}: Props) => {
  return (
    <div className="h-[326px]">
      <div className="h-[52px] mx-[6px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center mt-6">
        {!paymentMethod || paymentMethod === PaymentMethod.Money
          ? `${balance}₩`
          : `카드`}
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <Button onClick={() => purchaseItem("cola")}>
          <CupSoda /> 1100₩
        </Button>
        <Button onClick={() => purchaseItem("water")}>
          <GlassWater /> 600₩
        </Button>
        <Button onClick={() => purchaseItem("coffee")}>
          <Coffee /> 700₩
        </Button>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Button
          variant="outline"
          className="w-10 h-10 p-0 flex items-center justify-center rounded-full"
          onClick={receiveChange}
        >
          <Coins size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Controls;
