export default function Tooltip({ message, children }: { message: string, children: any }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-16 mt-2 -left-5 scale-0 transition-all rounded bg-gray-800 p-3 text-xs text-white group-hover:scale-125 z-40 w-[220px]">{message}</span>
    </div>
  )
}