
export default function AnalyzedIcon({ analyzed, keyword }: { analyzed: any, keyword: string }) {
  const latestAnalyzed = (analyzed) ? analyzed[0] : null;
  console.log('latestAnalyzed', latestAnalyzed);

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
    <a className='flex border-solid border-r-neutral-50 border-r-2 bg-neutral-100 hover:bg-neutral-200 justify-center h-full w-8 p-1 items-center dark:border-r-0' href={url} title={label} target='_blank'>
      <img src={icon} alt={label} className="w-5 h-5" />
    </a>
  )
}