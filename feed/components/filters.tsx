'use client';

export default function Filters({onClick}: {onClick: any}) {
  return (
    <div onClick={onClick}>
      <span className='underline cursor-pointer filter hover:underline' data-endpoint='rising'>Latest</span> |
      <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='day'>Top 24h</span> |
      <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='week'>Top 7d</span> |
      <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='month'>Top 30d</span> |
      <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='year'>Top 365d</span>
    </div>
  )
}