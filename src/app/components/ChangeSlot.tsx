interface Props {
  changeReceived: number | null;
}

const ChangeSlot = ({ changeReceived }: Props) => {
  return (
    <div className="h-[46px] mx-[6px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center mt-[18px]">
      {changeReceived !== null && <>{changeReceived}₩</>}
    </div>
  );
};

export default ChangeSlot;
