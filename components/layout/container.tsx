export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative md:mx-auto h-full w-full max-w-full font-mono'>
      {children}
    </div>
  )
}