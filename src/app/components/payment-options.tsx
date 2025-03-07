import { Button } from "@/components/ui/button";
import { CreditCard, HandCoins } from "lucide-react";

interface Props {
  addCoin: (value: number) => void;
  payWithCard: () => void;
}

const PaymentOptions = ({ addCoin, payWithCard }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">결제 옵션</h3>
      <div className="payment-controls flex flex-col gap-2">
        <div className="flex gap-2">
          <Button variant="cash" onClick={() => addCoin(100)}>
            <HandCoins /> 100₩
          </Button>
          <Button variant="cash" onClick={() => addCoin(500)}>
            <HandCoins /> 500₩
          </Button>
          <Button variant="cash" onClick={() => addCoin(1000)}>
            <HandCoins /> 1000₩
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="cash" onClick={() => addCoin(5000)}>
            <HandCoins /> 5000₩
          </Button>
          <Button variant="cash" onClick={() => addCoin(10000)}>
            <HandCoins /> 10000₩
          </Button>
          <Button variant="card" onClick={() => payWithCard()}>
            <CreditCard /> 카드
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
