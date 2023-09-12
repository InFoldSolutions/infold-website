const config = {
  'mockTweets': [
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: '@arstechnica',
      added_at: '2023-08-20T20:00:00.000Z',
      body: 'New findings: potential cause of long Covid but frustratingly little funding to test treatments. Story by @cooney_liz',
      logo: '/assets/images/twitter.svg',
      likes: '76',
      views: '4k',
      sentiment: 'neutral',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: 'u/user',
      added_at: '2023-08-19T10:00:00.000Z',
      body: 'After starting the year by lowering its 2023 revenue projections, San Diego-based genomics giant Illumina did so again.',
      logo: '/assets/images/reddit.svg',
      likes: '16',
      views: '1k',
      sentiment: 'positive',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: 'fbuser',
      added_at: '2023-08-18T10:00:00.000Z',
      body: 'Europe turns its new $1.5 billion space telescope on, and happily it works',
      logo: '/assets/images/facebook.png',
      likes: '430',
      views: '42k',
      sentiment: 'negative',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: '@mastodon',
      added_at: '2023-08-19T10:00:00.000Z',
      body: 'The NIH has finally launched clinical trials almost 3 years after the agency received a $1 billion mandate from Congress to study and treat',
      logo: '/assets/images/mastodon.png',
      likes: '560',
      views: '7.5k',
      sentiment: 'positive',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: 'u/user',
      added_at: '2023-08-15T10:00:00.000Z',
      body: 'The FTC is getting even more aggressive in its enforcement over digital health companies’ irresponsible data use.',
      logo: '/assets/images/reddit.svg',
      likes: '23',
      views: '2.1k',
      sentiment: 'negative',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: 'fbuser',
      added_at: '2023-08-15T10:00:00.000Z',
      body: 'The FTC is getting even more aggressive in its enforcement over digital health companies’ irresponsible data use.',
      logo: '/assets/images/facebook.png',
      likes: '990',
      views: '9.1k',
      sentiment: 'neutral',
    },
    {
      url: 'https://twitter.com/arstechnica/status/1686057171446906888',
      type: 'social',
      name: 'Ars Technica',
      author: '@mastodon',
      added_at: '2023-08-15T10:00:00.000Z',
      body: 'The FTC is getting even more aggressive in its enforcement over digital health companies’ irresponsible data use.',
      logo: '/assets/images/mastodon.png',
      likes: '335',
      views: '3.1k',
      sentiment: 'neutral',
    },
  ],

  'sentiment': {
    'positive': {
      'bg': 'bg-green-600',
      'textColor': 'text-green-600',
      'icon': 'fa-smile',
      'name': 'Positive'
    },
    'negative': {
      'bg': 'bg-red-600',
      'textColor': 'text-red-600',
      'icon': 'fa-frown',
      'name': 'Negative'
    },
    'neutral': {
      'bg': 'bg-slate-500',
      'textColor': 'text-slate-500',
      'icon': 'fa-meh',
      'name': 'Neutral'
    }
  },

  'interests': [
    'World News', 'Ukraine', 'Taiwan', 'America', 'China', 'Europe', 'Tech', 'Business', 'Stocks', 'Space', 'Science', 'Crypto', 'Gaming', 'Cars', 'Programming', 'Fitness', 'Health', 'Sports', 'NBA', 'NFL', 'UFC'
  ],

  'api': {
    'url': 'https://api.infold.ai',
    'defaultLimit': 10,
    'defaultBucket': 'month',
    'defaultSort': 'top'
  },

  'ws': {
    'chat': 'wss://api.infold.ai',
    'path': 'chat/foldy'
  },

  // temp keyword blacklist
  // lowercase
  'keywordsBlacklist': ['telegram', 'tvl', 'tap', 'cai', 'maps', 'instagram', 'lakes', 'post', 'bills', 'test', 'u.s.—and', 'walkman', 'wikipedia', 'honestly', 'northeast', 'mich', 'detroit', 'left', 'right', 'the associated press', 'defense', 'business insider', 'breaking news', 'the washington post', 'the united states', 'ont.', '” orr', 'sun', 'ky.', 'abc', 'r-fla.', 'this week', 'del.', 'ap', 'cbs', 'north', 'south', 'east', 'fl', 'west', 'u.s', 'juice', 'n.y.', 'cbs', 'msnbc', 'guardian', 'ocu', 'state', 'hill', 'insider', 'berlin', 'mass', 'americas', 'moody', 'asia', 'berlin', 'indiana', 'paris', 'dmn', 'ocean waves', 't.s', 'new delhi', 'leopard', 'moon', 'united nations', 'albania', 'malta', 'britain', 'european state', 'indonesia', 'columbia', 'fox news', 'mich.', 'north korea', 'new york city', 'u.k.', 'south korea', 'boston', 'vegas', 'east river', 'milwaukee', 'fla.', 'soviet union', 'variety', 'italy', 'sky news', 'npr', 'New Delhi', 'u.n.', 'singapore', 'nbc', 'tesla', 'austin', 'fremont', 'london', 'google', 'germany', 'spa', 'japan', 'brazil', 'australia', 'netherlands', 'france', 'noordwijk', 'marinka', 'bds', 'bbc', 'associated press', 'nbc news', 'florida', 'politico', 'new york state', 'florida', 'north america', 'kremlin', 'alliance', 'rome', 'koco', 'un', 'eu', 'stockholm', 'estonia', 'brussels', 'mideast', 'hungary', 'sweden', 'middle east', 'jerusalem', 'pentagon', 'finland', 'd.c.', 'moscow', 'turkey', 'linkedin', 'saudi arabia', 'iran', 'beijing', 'nato', 'washington', 'pakista', 'india', 'canada', 'michigan', 'tenn.', 'new york', 'congress', 'trump', 'america', 'legislature', 'kan.', 'georgia', 'crow', 'facebook', 'capitol', 'knoxville', 'n.c.', 'raleigh', 'north carolina', 'tennessee', 'house', 'atlanta', 'cnn', 'manhattan', 'gop', 'reuters', 'memphis', 'white house', 'nashville', 'democratic', 'twitter', 'california', 'minnesota', 'europe', 'siberia', 'spain', 'peru', 'maine', 'colorado', 'university of sydney', 'africa', 'utc', 'princeton university', 'israel', 'washington university', 'england', 'earth', 'us', 'u.s.', 'russia', 'china', 'nasa', 'west', 'east', 'bard college', 'mars', 'iceland', 'veritas', 'texas', 'ukraine', 'uk', 'united kingdom', 'united states', 'united states of america'],
}

export default config