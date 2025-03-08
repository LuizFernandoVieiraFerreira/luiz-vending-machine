import { getIcon } from "./itemIcons";

interface Props {
  purchases: string[];
}

const PurchaseHistory = ({ purchases }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">구매한 상품</h3>
      <div className="flex flex-wrap gap-2">
        {purchases.length === 0 ? (
          <p className="text-gray-500">구매한 상품 없음</p>
        ) : (
          purchases.map((item, index) => {
            return <div key={index}>{getIcon(item)}</div>;
          })
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
