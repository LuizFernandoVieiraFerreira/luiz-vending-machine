import { Button } from "@/components/ui/button";

interface Props {
  receiveChange: () => void;
  changeReceived: number | null;
}

const ChangeDisplay = ({ receiveChange, changeReceived }: Props) => {
  return (
    <div className="mt-4">
      <Button variant="outline" onClick={receiveChange}>
        거스름돈 받기
      </Button>
      <div className="h-[52px] mx-[6px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center mt-4">
        {changeReceived !== null && <>{changeReceived}₩</>}
      </div>
    </div>
  );
};

export default ChangeDisplay;
