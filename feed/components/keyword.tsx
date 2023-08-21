import Link from 'next/link';
import Image from 'next/image'

export default function Keyword({ analyzed, keyword, iconOnly = false }: { analyzed: any, keyword: string, iconOnly?: boolean }) {
  const latestAnalyzed = (analyzed) ? analyzed[0] : null;

  let icon, label, url;

  if (latestAnalyzed && latestAnalyzed.url) {
    url = latestAnalyzed.url;

    if (latestAnalyzed.source === "investopedia") {
      icon = "https://www.investopedia.com/thmb/XIM2KrGGvPZgAQJMsOG3hU7_fI0=/857x482/smart/filters:no_upscale()/investopedia_icon-4f30abcdb0cd455b9c740b7d09a07a47.png";
      label = "Investopedia";
    } else {
      icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png";
      label = "Wikipedia";
    }
  } else {
    url = `https://www.google.com/search?q=${keyword}`;
    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png";
    label = "Google";
  }

  return (
    <Link
      href={url}
      title={`Lookup on ${label}`}
      target='_blank'
      prefetch={false}
      className='group'>
      <span className='group-hover:border-gray-400 border-2 bg-gray-100 dark:border-gray-400 dark:bg-gray-400 group-hover:dark:border-gray-200 border-dashed p-1 flex items-center justify-center w-8'>
        <Image src={icon} alt={label} width={22} height={22} className={`${label === 'Google' ? 'w-5' : ''} h-auto`} />
      </span>

      {!iconOnly &&
        <span className='keyword py-1 px-3'>
          {keyword}
        </span>
      }
    </Link>
  )
}