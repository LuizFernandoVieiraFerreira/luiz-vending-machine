"use client";

import { useState } from "react";
import Inventory from "./inventory";
import Controls from "./controls";
import VendSlot from "./vend-slots";
import PaymentOptions from "./payment-options";
import Purchases from "./purchases";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ChangeDisplay from "./change-display";
import { PaymentMethod } from "../types";

const toastConfig = {
  error: {
    style: {
      backgroundColor: "#eab308",
      color: "#1f1f1f",
      border: "1px solid #eab308",
    },
  },
  success: {
    style: {
      backgroundColor: "#22c55e",
      color: "#fff",
      border: "1px solid #22c55e",
    },
  },
  info: {
    style: {
      background: "#3b82f6",
      color: "#fff",
      border: "1px solid #3b82f6",
    },
  },
};

const VendingMachine = () => {
  const [balance, setBalance] = useState(0);
  const [vendSlot, setVendSlot] = useState<string | null>(null);
  const [changeReceived, setChangeReceived] = useState<number | null>(null);
  const [purchases, setPurchases] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const [inventory, setInventory] = useState({
    cola: { name: "Cola", price: 1100, stock: 5 },
    water: { name: "Water", price: 600, stock: 3 },
    coffee: { name: "Coffee", price: 700, stock: 2 },
  });

  const addCoin = (value: number) => {
    if (paymentMethod === PaymentMethod.Card) {
      toast.error("카드는 이미 선택했어요.", toastConfig.error);
      return;
    }

    setBalance((prev) => {
      if (prev >= 10000) {
        toast.error("잔액 한도를 초과", toastConfig.error);
        return prev;
      }

      if (!paymentMethod) {
        setPaymentMethod(PaymentMethod.Money);
      }

      return prev + value;
    });
  };

  const toggleCardPaymentMethod = () => {
    if (paymentMethod === PaymentMethod.Money) {
      toast.error("돈을 이미 선택했어요.", toastConfig.error);
      return;
    }

    setPaymentMethod((prev) =>
      prev === PaymentMethod.Card ? null : PaymentMethod.Card
    );
  };

  const selectItem = (itemKey: keyof typeof inventory) => {
    setInventory((prevInventory) => {
      const item = prevInventory[itemKey];

      if (item.stock <= 0) {
        toast.error("품절", toastConfig.error);
        return prevInventory;
      }

      if (paymentMethod !== PaymentMethod.Card && balance < item.price) {
        toast.error("잔액 부족", toastConfig.error);
        return prevInventory;
      }

      if (paymentMethod !== PaymentMethod.Card) {
        setBalance((prevBalance) => prevBalance - item.price);
      }

      setVendSlot(item.name);
      setPurchases((prev) => [...prev, item.name]);

      toast.success("구매 완료!", toastConfig.success);

      return {
        ...prevInventory,
        [itemKey]: { ...item, stock: item.stock - 1 },
      };
    });
  };

  const receiveChange = () => {
    if (balance === 0) {
      toast.error("반환할 잔액이 없습니다.", toastConfig.error);
      return;
    }

    setChangeReceived(balance);
    setBalance(0);
    setPaymentMethod(null);
    toast.success(`${balance}₩ 반환 완료!`, toastConfig.info);
  };

  const resetMachine = () => {
    setBalance(0);
    setVendSlot(null);
    setChangeReceived(null);
    setPurchases([]);
    setPaymentMethod(null);
    setInventory({
      cola: { name: "Cola", price: 1100, stock: 5 },
      water: { name: "Water", price: 600, stock: 3 },
      coffee: { name: "Coffee", price: 700, stock: 2 },
    });
    toast.success("자판기가 초기화되었습니다!", toastConfig.info);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={resetMachine}
      >
        <RefreshCw size={20} />
      </Button>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-8 md:gap-16">
        <div className="w-[352px] h-[500px] p-[20px] rounded-[12px] bg-[#333333] flex gap-2">
          <div className="w-64">
            <Inventory inventory={inventory} />
            <VendSlot item={vendSlot} />
          </div>
          <div className="flex-1">
            <Controls
              paymentMethod={paymentMethod}
              balance={balance}
              selectItem={selectItem}
              receiveChange={receiveChange}
            />
            <ChangeDisplay changeReceived={changeReceived} />
          </div>
        </div>
        <div className="w-75 flex flex-col gap-8">
          <PaymentOptions
            paymentMethod={paymentMethod}
            addCoin={addCoin}
            toggleCardPaymentMethod={toggleCardPaymentMethod}
          />
          <Purchases purchases={purchases} />
        </div>
      </div>
    </>
  );
};

export default VendingMachine;
