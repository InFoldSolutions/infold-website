export default function Tooltip({ message, top, left, right, bottom, padding, minWidth, maxWidth, children }: { message: string, top?: number, left?: number, right?: number, bottom?: number, padding?: number, minWidth?: number, maxWidth?: number, children: any }) {
  return (
    <div className="group relative flex w-full">
      {children}
      <div className={`
        absolute scale-0 px-2 transition-all rounded bg-black dark:bg-gray-200 dark:text-black text-xs text-white group-hover:scale-125 z-40 
        ${top ? `top-${top}` : ''} 
        ${bottom ? `bottom-${bottom}` : ''} 
        ${left ? `left-${left}` : ''} 
        ${right ? `right-${right}` : ''} 
        ${padding ? `p-${padding}` : '2'} 
        ${minWidth ? `min-w-[${minWidth}px]` : ''} 
        ${maxWidth ? `max-w-[${maxWidth}px]` : ''}`}>

        {message}
      </div>

      <span className='hidden bottom-1 top-1 top-2 top-3 top-5 top-10 top-12 p-3 left-4 left-3 left-10 left-14 left-16 left-20 top-10 top-20 right-10 right-6 right-4 right-3 right-2 right-1 min-w-[220px] min-w-[150px] min-w-[139px] min-w-[125px] min-w-[120px] min-w-[115px] min-w-[113px] min-w-[110px] min-w-[103px] min-w-[100px] min-w-[97px] min-w-[95px] min-w-[90px] min-w-[89px] min-w-[85px] min-w-[80px] min-w-[77px] min-w-[70px] min-w-[60px] w-0 h-0 border-blue-500'></span>
    </div>
  )
}