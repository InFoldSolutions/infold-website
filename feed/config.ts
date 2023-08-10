const config = {
  'mockTweets': [
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      handle: '@arstechnica',
      added_at: '2023-08-04T20:00:00.000Z',
      summary: 'New findings: potential cause of long Covid but frustratingly little funding to test treatments. Story by @cooney_liz',
      logo: '/assets/images/twitter.svg',    
      likes: '76',
      views: '4k'
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      handle: 'u/user',
      added_at: '2023-07-29T10:00:00.000Z',
      summary: 'After starting the year by lowering its 2023 revenue projections, San Diego-based genomics giant Illumina did so again.',
      logo: '/assets/images/reddit.svg',
      likes: '16',
      views: '1k'
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      handle: 'fbuser',
      added_at: '2023-07-25T10:00:00.000Z',
      summary: 'Europe turns its new $1.5 billion space telescope on, and happily it works',
      logo: '/assets/images/facebook.png',
      likes: '430',
      views: '42k'
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      handle: '@mastodon',
      added_at: '2023-07-19T10:00:00.000Z',
      summary: 'The NIH has finally launched clinical trials almost 3 years after the agency received a $1 billion mandate from Congress to study and treat #LongCovid. But scientists say the trials are unlikely to deliver meaningful treatments.',
      logo: '/assets/images/mastodon.png',
      likes: '560',
      views: '7.5k'
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      handle: 'u/user',
      added_at: '2023-07-15T10:00:00.000Z',
      summary: 'The FTC is getting even more aggressive in its enforcement over digital health companies’ irresponsible data use.',
      logo: '/assets/images/reddit.svg',
      likes: '23',
      views: '2.1k'
    },
  ],

  api: {
    defaultLimit: 10,
    defaultBucket: 'month',
    defaultSort: 'top'
  },

  // temp keyword blacklist
  // lowercase
  'keywordsBlacklist': ['tvl', 'tap', 'cai', 'maps', 'instagram', 'lakes', 'post', 'bills', 'test', 'u.s.—and', 'walkman', 'wikipedia', 'honestly', 'northeast', 'mich', 'detroit', 'left', 'right', 'the associated press', 'defense', 'business insider', 'breaking news', 'the washington post', 'the united states', 'ont.', '” orr', 'sun', 'ky.', 'abc', 'r-fla.', 'this week', 'del.', 'ap', 'cbs', 'north', 'south', 'east', 'fl', 'west', 'u.s', 'juice', 'n.y.', 'cbs', 'msnbc', 'guardian', 'ocu', 'state', 'hill', 'insider', 'berlin', 'mass', 'americas', 'moody', 'asia', 'berlin', 'indiana', 'paris', 'dmn', 'ocean waves', 't.s', 'new delhi', 'leopard', 'moon', 'united nations', 'albania', 'malta', 'britain', 'european state', 'indonesia', 'columbia', 'fox news', 'mich.', 'north korea', 'new york city', 'u.k.', 'south korea', 'boston', 'vegas', 'east river', 'milwaukee', 'fla.', 'soviet union', 'variety', 'italy', 'sky news', 'npr', 'New Delhi', 'u.n.', 'singapore', 'nbc', 'tesla', 'austin', 'fremont', 'london', 'google', 'germany', 'spa', 'japan', 'brazil', 'australia', 'netherlands', 'france', 'noordwijk', 'marinka', 'bds', 'bbc', 'associated press', 'nbc news', 'florida', 'politico', 'new york state', 'florida', 'north america', 'kremlin', 'alliance', 'rome', 'koco', 'un', 'eu', 'stockholm', 'estonia', 'brussels', 'mideast', 'hungary', 'sweden', 'middle east', 'jerusalem', 'pentagon', 'finland', 'd.c.', 'moscow', 'turkey', 'linkedin', 'saudi arabia', 'iran', 'beijing', 'nato', 'washington', 'pakista', 'india', 'canada', 'michigan', 'tenn.', 'new york', 'congress', 'trump', 'america', 'legislature', 'kan.', 'georgia', 'crow', 'facebook', 'capitol', 'knoxville', 'n.c.', 'raleigh', 'north carolina', 'tennessee', 'house', 'atlanta', 'cnn', 'manhattan', 'gop', 'reuters', 'memphis', 'white house', 'nashville', 'democratic', 'twitter', 'california', 'minnesota', 'europe', 'siberia', 'spain', 'peru', 'maine', 'colorado', 'university of sydney', 'africa', 'utc', 'princeton university', 'israel', 'washington university', 'england', 'earth', 'us', 'u.s.', 'russia', 'china', 'nasa', 'west', 'east', 'bard college', 'mars', 'iceland', 'veritas', 'texas', 'ukraine', 'uk', 'united kingdom', 'united states', 'united states of america'],
}

export default config