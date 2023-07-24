
export default function Arrow({ direction, clickFunction, visible = true }: { direction: string, clickFunction: any, visible: boolean }) {

  const svgPath = (direction === 'left') ? 
    'M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z' : 
    'M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z'; 
  return (
    <div
      className={ `${direction} ${direction === 'left' ? '-left-[43px]' : '-right-[43px]'} ${!visible ? 'hidden' : ''} arrow absolute z-10 top-1/2 -mt-[50px] w-7 h-9 p-1 rounded-full border-2 border-neutral-100 dark:border-neutral-600 flex items-center justify-center cursor-pointer` }
      onClick={ clickFunction }>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="w-4/5">
        <g>
          <path d={svgPath} className="fill-neutral-800 dark:fill-neutral-200"/>
        </g>
      </svg>
    </div>
  );
}