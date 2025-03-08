interface Props {
  changeReceived: number | null;
}

const ChangeDisplay = ({ changeReceived }: Props) => {
  return (
    <div className="h-[52px] mx-[6px] bg-[#f3f3fa] rounded-[6px] flex justify-center items-center mt-[10px]">
      {changeReceived !== null && <>{changeReceived}₩</>}
    </div>
  );
};

export default ChangeDisplay;
