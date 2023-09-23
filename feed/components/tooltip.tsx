export default function Tooltip({ message, top, left, right, bottom, padding, minWidth, maxWidth, children }: { message: string, top?: number, left?: number, right?: number, bottom?: number, padding?: number, minWidth?: number, maxWidth?: number, children: any }) {
  return (
    <div className="group relative flex">
      {children}
      <span className={`
        absolute scale-0 px-2 transition-all rounded bg-black dark:bg-gray-200 dark:text-black text-xs text-white group-hover:scale-125 z-40 w-auto 
        ${top ? `top-${top}` : ''} 
        ${bottom ? `bottom-${bottom}` : ''} 
        ${left ? `left-${left}` : ''} 
        ${right ? `right-${right}` : ''} 
        ${padding ? `p-${padding}` : '2'} 
        ${minWidth ? `min-w-[${minWidth}px]` : ''} 
        ${maxWidth ? `max-w-[${maxWidth}px]` : ''}`}>

        {message}
      </span>

      <span className='hidden bottom-1 top-1 top-12 left-4 left-3 p-3 right-10 left-10 top-20 right-1 right-6 right-4 right-3 min-w-[220px] min-w-[120px] min-w-[129px] min-w-[110px] min-w-[80px] min-w-[70px] min-w-[60px] min-w-[96px] min-w-[100px] w-0 h-0 border-blue-500'></span>
    </div>
  )
}