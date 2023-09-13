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

      <span className='hidden bottom-1 left-10 top-20 right-6 min-w-[220px]'></span>
    </div>
  )
}