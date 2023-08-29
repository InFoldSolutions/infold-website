export default function Tooltip({ message, children }: { message: string, children: any }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-16 mt-3 -left-9 scale-0 transition-all rounded bg-black dark:bg-gray-200 dark:text-black p-3 text-xs text-white group-hover:scale-125 z-40 w-[220px]">{message}</span>
    </div>
  )
}