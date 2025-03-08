import { itemIcons } from "./Inventory";

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
            const itemKey = Object.keys(itemIcons).find(
              (key) => key.toLowerCase() === item.toLowerCase()
            ) as keyof typeof itemIcons | undefined;

            const { icon: Icon, color } = itemKey
              ? itemIcons[itemKey]
              : itemIcons.water;

            return <Icon key={index} size={32} className={color} />;
          })
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
