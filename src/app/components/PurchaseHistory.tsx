import { Item } from "../types";

interface Props {
  purchasedItems: Item[];
}

const PurchaseHistory = ({ purchasedItems }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">구매한 상품</h3>
      <div className="flex flex-wrap gap-2">
        {purchasedItems.length === 0 ? (
          <p className="text-gray-500">구매한 상품 없음</p>
        ) : (
          purchasedItems.map((item, index) => {
            return <div key={index}>{item.icon}</div>;
          })
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
