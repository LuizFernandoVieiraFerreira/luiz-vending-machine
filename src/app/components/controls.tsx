import { Button } from "@/components/ui/button";
import { CupSoda, GlassWater, Coffee } from "lucide-react";

interface Props {
  paymentMethod: string | null;
  balance: number;
  selectItem: (item: "cola" | "water" | "coffee") => void;
}

const Controls = ({ paymentMethod, balance, selectItem }: Props) => {
  return (
    <div className="h-[350px] flex-1">
      <div className="h-[52px] mx-[6px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center mt-6">
        {!paymentMethod || paymentMethod === "money" ? `${balance}₩` : `카드`}
      </div>
      <div className="items mt-10 flex flex-col gap-2">
        <Button onClick={() => selectItem("cola")}>
          <CupSoda /> 1100₩
        </Button>
        <Button onClick={() => selectItem("water")}>
          <GlassWater /> 600₩
        </Button>
        <Button onClick={() => selectItem("coffee")}>
          <Coffee /> 700₩
        </Button>
      </div>
    </div>
  );
};

export default Controls;
