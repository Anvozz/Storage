import { ChevronLeft, ChevronRight } from "lucide-react";

type DashBoardTogglePropsType = {
  classNames: string;
  isOpen: boolean;
  onClick(val: boolean): void;
};

const DashboardToggle = ({
  classNames,
  isOpen,
  onClick,
}: DashBoardTogglePropsType) => {
  return (
    <div
      className={`ml-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 ${classNames}`}
      onClick={() => onClick(!isOpen)}
    >
      {isOpen ? (
        <ChevronRight color="#000000" />
      ) : (
        <ChevronLeft color="#000000" />
      )}
    </div>
  );
};

export default DashboardToggle;
