import { ChevronLeft, ChevronRight } from "lucide-react";

const YearNavigation: React.FC<{
  selectedYear: number;
  onYearChange: (year: number) => void;
}> = ({ selectedYear, onYearChange }) => {
  return (
    <div className='flex items-center justify-center my-2'>
      <button onClick={() => onYearChange(selectedYear - 1)} className='p-1'>
        <ChevronLeft className='h-4 w-4' />
      </button>
      <span className='mx-2'>{selectedYear}</span>
      <button onClick={() => onYearChange(selectedYear + 1)} className='p-1'>
        <ChevronRight className='h-4 w-4' />
      </button>
    </div>
  );
};
export { YearNavigation };
