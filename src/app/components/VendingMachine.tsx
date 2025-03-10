"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CupSoda, GlassWater, Coffee, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Inventory from "./Inventory";
import Controls from "./Controls";
import DispenseSlot from "./DispenseSlot";
import PaymentOptions from "./PaymentOptions";
import PurchaseHistory from "./PurchaseHistory";
import ChangeSlot from "./ChangeSlot";
import { Item, PaymentMethod } from "../types";
import { toastConfig } from "../config";

const messages = {
  purchaseComplete: "구매를 완료했습니다!",
  insufficientBalance: "잔액이 부족합니다",
  outOfStock: "품절",
  balanceLimitExceeded: "투입 가능한 금액을 초과했습니다",
  cardAlreadySelected: "이미 카드를 선택했습니다",
  moneyAlreadySelected: "이미 현금을 선택했습니다",
  noChangeToReturn: "반환할 거스름돈이 없습니다",
  changeReturned: (amount: number) => `${amount}₩ 반환 완료했습니다!`,
  machineReset: "자판기가 초기화되었습니다!",
};

const VendingMachine = () => {
  const [balance, setBalance] = useState(0);
  const [dispenseSlotItem, setDispenseSlotItem] = useState<Item | null>(null);
  const [changeReceived, setChangeReceived] = useState<number | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const initialInventory = {
    cola: { name: "Cola", price: 1100, stock: 5, icon: <CupSoda /> },
    water: { name: "Water", price: 600, stock: 3, icon: <GlassWater /> },
    coffee: { name: "Coffee", price: 700, stock: 2, icon: <Coffee /> },
  };

  const [inventory, setInventory] = useState(initialInventory);

  const addMoney = (value: number) => {
    if (paymentMethod === PaymentMethod.Card) {
      toast.error(messages.cardAlreadySelected, toastConfig.error);
      return;
    }

    setBalance((prev) => {
      if (prev >= 10000) {
        toast.error(messages.balanceLimitExceeded, toastConfig.error);
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
      toast.error(messages.moneyAlreadySelected, toastConfig.error);
      return;
    }

    setPaymentMethod((prev) =>
      prev === PaymentMethod.Card ? null : PaymentMethod.Card
    );
  };

  const purchaseItem = (itemKey: keyof typeof inventory) => {
    setInventory((prevInventory) => {
      const item = prevInventory[itemKey];

      if (item.stock <= 0) {
        toast.error(messages.outOfStock, toastConfig.error);
        return prevInventory;
      }

      if (paymentMethod !== PaymentMethod.Card && balance < item.price) {
        toast.error(messages.insufficientBalance, toastConfig.error);
        return prevInventory;
      }

      if (paymentMethod !== PaymentMethod.Card) {
        setBalance((prevBalance) => prevBalance - item.price);
      }

      setDispenseSlotItem(item);
      setPurchasedItems((prev) => [...prev, item]);

      toast.success(messages.purchaseComplete, toastConfig.success);

      return {
        ...prevInventory,
        [itemKey]: { ...item, stock: item.stock - 1 },
      };
    });
  };

  const receiveChange = () => {
    if (balance === 0) {
      toast.error(messages.noChangeToReturn, toastConfig.error);
      return;
    }

    setChangeReceived(balance);
    setBalance(0);
    setPaymentMethod(null);
    toast.success(messages.changeReturned(balance), toastConfig.info);
  };

  const resetMachine = () => {
    setBalance(0);
    setDispenseSlotItem(null);
    setChangeReceived(null);
    setPurchasedItems([]);
    setPaymentMethod(null);
    setInventory(initialInventory);
    toast.success(messages.machineReset, toastConfig.info);
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
            <DispenseSlot item={dispenseSlotItem} />
          </div>
          <div className="flex-1">
            <Controls
              paymentMethod={paymentMethod}
              balance={balance}
              purchaseItem={purchaseItem}
              receiveChange={receiveChange}
            />
            <ChangeSlot changeReceived={changeReceived} />
          </div>
        </div>
        <div className="w-75 flex flex-col gap-8">
          <PaymentOptions
            paymentMethod={paymentMethod}
            addMoney={addMoney}
            toggleCardPaymentMethod={toggleCardPaymentMethod}
          />
          <PurchaseHistory purchasedItems={purchasedItems} />
        </div>
      </div>
    </>
  );
};

export default VendingMachine;
