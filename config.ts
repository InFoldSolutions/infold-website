const config = {

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
    'World News', 'Middle East', 'Ukraine', 'Taiwan', 'America', 'China', 'Europe', 'Tech', 'Business', 'Stocks', 'Space', 'Science', 'Crypto', 'Gaming', 'Cars', 'Programming', 'Fitness', 'Health', 'Sports', 'NBA', 'NFL', 'UFC'
  ],

  'tagsAggs': {
    'positive': {
      'label': 'Positive',
      'backgroundColor': 'rgba(22, 163, 74, 0.2)',
      'borderColor': 'rgb(22, 163, 74)'
    },
    'negative': {
      'label': 'Negative',
      'backgroundColor': 'rgba(220, 38, 38, 0.2)',
      'borderColor': 'rgb(220, 38, 38)'
    },
    'neutral': {
      'label': 'Neutral',
      'backgroundColor': 'rgba(100, 116, 139, 0.2)',
      'borderColor': 'rgb(100, 116, 139)'
    },
    'left': {
      'label': 'Left',
      'backgroundColor': 'rgba(0, 0, 255, 0.2)',
      'borderColor': 'rgb(0, 0, 255)'
    },
    'right': {
      'label': 'Right',
      'backgroundColor': 'rgba(255, 0, 0, 0.2)',
      'borderColor': 'rgb(255, 0, 0)'
    },
    'center': {
      'label': 'Center',
      'backgroundColor': 'rgba(255, 255, 0, 0.2)',
      'borderColor': 'rgb(255, 255, 0)'
    }
  },

  'api': {
    'url': 'https://api.infold.ai',
    'defaultLimit': 10,
    'defaultBucket': 'day',
    'defaultSort': 'top'
  },

  'www': {
    'root': 'https://infold.com',
  },

  'ws': {
    'chat': 'wss://api.infold.ai',
    'path': 'chat/foldy'
  },

  'firebase': {
    'signInLinkRedirectUrl': 'https://infold.com',
  },

  'story': {
    'thumb': {
      'name': 'thumbnail.png',
      'width': 1200,
      'height': 630,
    },
  },

  defaultFeeds: [{
    keyword: 'Top Stories',
    live: true,
    icon: 'fad fa-fire-alt',
    iconColor: 'text-yellow-600',
    type: 'featured'
  }, {
    keyword: 'Donald Trump',
    live: false,
    icon: 'fad fa-landmark',
    iconColor: 'text-gray-400',
    type: 'topic'
  }, {
    keyword: 'r/all',
    live: false,
    icon: 'fab fa-reddit-alien',
    iconColor: 'text-orange-500',
    type: 'subreddit'
  }, {
    keyword: 'Middle East',
    live: false,
    icon: 'fad fa-globe',
    iconColor: 'text-blue-400',
    type: 'topic'
  }, {
    keyword: 'r/worldnews',
    live: false,
    icon: 'fab fa-reddit-alien',
    iconColor: 'text-orange-500',
    type: 'subreddit'
  }, {
    keyword: 'Europe',
    live: false,
    icon: 'fad fa-globe',
    iconColor: 'text-blue-400',
    type: 'topic'
  }, {
    keyword: 'China',
    live: false,
    icon: 'fad fa-globe',
    iconColor: 'text-blue-400',
    type: 'topic'
  }],

  topOptions: [
    //{ label: 'Hour', value: 'hour' },
    { label: 'Today', value: 'day' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    //{ label: 'This Year', value: 'year' },
  ],

  categoryOptions: [
    { label: 'Politics', value: 'Politics', icon: 'fa-landmark', iconMargin: '' },
    { label: 'Technology', value: 'Technology', icon: 'fa-computer-classic', iconMargin: '' },  //'fa-flask'
    { label: 'Science', value: 'Science', icon: 'fa-flask', iconMargin: '' },  //''
    { label: 'Sports', value: 'Sports', icon: 'fa-football-ball', iconMargin: '' },
    { label: 'Finance', value: 'Finance', icon: 'fa-user-chart', iconMargin: '-ml-[12px]' },
    { label: 'Health', value: 'Health', icon: 'fa-heart-rate', iconMargin: '-ml-[5px]' },
    { label: 'Culture', value: 'Culture', icon: 'fa-film-alt', iconMargin: '' },
    //{ label: 'Gaming', value: 'Gaming', icon: 'fa-computer-classic' },
    { label: 'Law & Crime', value: 'Law+%26+Crime', icon: 'fa-balance-scale', iconMargin: '' },
    //{ label: 'Health', value: 'Health', icon: 'fa-heartbeat' },
  ],

  // Input should be 'Politics', 'Culture', 'Sports', 'Technology', 'Law & Crime', 'Business', 'Science', 'Health' or 'Gaming'

  'media': {
    'blacklistChannels': ['megyn kelly', 'amweekly', 'ary media', 'india today', 'bloomberg television', 'los angeles times', 'universal pictures uk', 'cleo abram']
  },

  api_key: process.env.NEXT_API_KEY,

  // blacklist questions
  'questionsBlacklist': ['**10 short questions about the subject of the text:**', '**Here are 10 short questions about the subject of the text:**', '**Here are 10 short questions about the subject the text is describing:**'],

  // temp keyword blacklist
  // lowercase
  'keywordsBlacklist': ['the food and drug administration', 'novo nordisk\'s', 'nature', 'nbcuniversal', 'cnbc', 'cbo', 'youtube', 'getty images', 'los angeles', 'afp', 'itv', 'volodymyr zelenskyy', 'the pixel 8 pro', 'the pixel 8', 'lightning', 'mercedes-benz group ag', 'sacramento', 's class', 'san diego', 'sae', 'motional', 'blue cruise', 's-class', 'ford', 'dmv', 'nevada', 'markus schafer', 'level 3', 'newsmax', 'people', 'plains', 'archery', 'happy birthday', 'ga.', 'crew', 'section 3', 'national court', 'geo', 'nro', 'vulcan', 'endeavour', 'massa', 'treasury', 'ram', 'gulf', 'api', 'eia', 'iea', 'kingdom', 'bloomberg', 'fed', 'judiciary', 'renew', 'shortcut', 'indo', 'chiefs', 'usa', 'cabinet', 'channel', 'labour', 'government', 'court', 'resolve', 'vikram', 'colo.', 'calif.', 'k.c.', 'c3', 'tad', 'sydney', 'euractiv', 'parliament', 's.c.', 'senate', 'wagner', 'global news', 'amazon', 'tiktok', 'b.c', 'paradise', 'front street', 'ama', 'webb', 'telegram', 'tvl', 'tap', 'cai', 'maps', 'instagram', 'lakes', 'post', 'bills', 'test', 'u.s.—and', 'walkman', 'wikipedia', 'honestly', 'northeast', 'mich', 'detroit', 'left', 'right', 'the associated press', 'defense', 'business insider', 'breaking news', 'the washington post', 'the united states', 'ont.', '” orr', 'sun', 'ky.', 'abc', 'r - fla.', 'this week', 'del.', 'ap', 'cbs', 'north', 'south', 'east', 'fl', 'west', 'u.s', 'juice', 'n.y.', 'cbs', 'msnbc', 'guardian', 'ocu', 'state', 'hill', 'insider', 'berlin', 'mass', 'americas', 'moody', 'asia', 'berlin', 'indiana', 'paris', 'dmn', 'ocean waves', 't.s', 'new delhi', 'leopard', 'moon', 'united nations', 'albania', 'malta', 'britain', 'european state', 'indonesia', 'columbia', 'fox news', 'mich.', 'north korea', 'new york city', 'u.k.', 'south korea', 'boston', 'vegas', 'east river', 'milwaukee', 'fla.', 'soviet union', 'variety', 'italy', 'sky news', 'npr', 'New Delhi', 'u.n.', 'singapore', 'nbc', 'tesla', 'austin', 'fremont', 'london', 'google', 'germany', 'spa', 'japan', 'brazil', 'australia', 'netherlands', 'france', 'noordwijk', 'marinka', 'bds', 'bbc', 'associated press', 'nbc news', 'florida', 'politico', 'new york state', 'florida', 'north america', 'kremlin', 'alliance', 'rome', 'koco', 'un', 'eu', 'stockholm', 'estonia', 'brussels', 'mideast', 'hungary', 'sweden', 'middle east', 'jerusalem', 'pentagon', 'finland', 'd.c.', 'moscow', 'turkey', 'linkedin', 'saudi arabia', 'iran', 'beijing', 'nato', 'washington', 'pakista', 'india', 'canada', 'michigan', 'tenn.', 'new york', 'congress', 'trump', 'america', 'legislature', 'kan.', 'georgia', 'crow', 'facebook', 'capitol', 'knoxville', 'n.c.', 'raleigh', 'north carolina', 'tennessee', 'house', 'atlanta', 'cnn', 'manhattan', 'gop', 'reuters', 'memphis', 'white house', 'nashville', 'democratic', 'twitter', 'california', 'minnesota', 'europe', 'siberia', 'spain', 'peru', 'maine', 'colorado', 'university of sydney', 'africa', 'utc', 'princeton university', 'washington university', 'england', 'earth', 'us', 'u.s.', 'russia', 'china', 'nasa', 'west', 'east', 'bard college', 'mars', 'iceland', 'veritas', 'texas', 'ukraine', 'uk', 'united kingdom', 'united states', 'united states of america'],
}

export default config