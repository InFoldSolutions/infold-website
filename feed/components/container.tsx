import Header from '@/components/header';

export default function Container({ children, header = true }: { children: React.ReactNode, header?: boolean }) {
  return (
    <div className='relative md:mx-auto w-full max-w-full lg:max-w-[1160px] lg:w-[1160px] font-mono px-4 md:p-8 md:py-4'>
      {header && <Header />}

      {children}
    </div>
  )
}