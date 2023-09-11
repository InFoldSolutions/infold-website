import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Container({ children, header = true }: { children: React.ReactNode, header?: boolean }) {
  return (
    <div className='relative md:mx-auto w-full max-w-full lg:max-w-[1260px] lg:w-[1260px] font-mono px-4 md:px-8'>
      {header && <Header />}

      {children}

      <Footer />
    </div>
  )
}