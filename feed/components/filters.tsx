'use client';

import events from "@/app/services/events";

// Rising filter component
export default function Filters() {
  return (
    <div onClick={handleClientClick}>
      <span className="underline cursor-pointer filter hover:underline" data-endpoint="rising">Rising</span> |
      <span className="ml-3 cursor-pointer filter hover:underline" data-endpoint="top" data-bucket="day">Top 24h</span> |
      <span className="ml-3 cursor-pointer filter hover:underline" data-endpoint="top" data-bucket="week">Top 7d</span> |
      <span className="ml-3 cursor-pointer filter hover:underline" data-endpoint="top" data-bucket="month">Top 30d</span> |
      <span className="ml-3 cursor-pointer filter hover:underline" data-endpoint="top" data-bucket="year">Top 365d</span>
    </div>
  )
}

async function handleClientClick(e: any) {
  e.preventDefault();
  
  if (!e.target.classList.contains('filter')) return;

  const filters = e.target.parentNode.querySelectorAll('.filter');
  filters.forEach((filter: any) => filter.classList.remove('underline'));

  e.target.classList.add('underline');

  events.emit('filter', e.target.dataset.endpoint, e.target.dataset.bucket);
}