export interface IWrappedDividerProps {
  title: string;
}

export default function WrappedDivider({ title }: IWrappedDividerProps) {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <hr className="flex-grow h-[2px] bg-slate-950 border-none ml-1" />
      <span className="mx-2 whitespace-nowrap">{title}</span>
      <hr className="flex-grow h-[2px] bg-slate-950 border-none mr-1" />
    </div>
  );
}
