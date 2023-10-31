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

  'mockSuggested': {
    'exploring-the-mind-of-j-robert-oppenheimer-a-deep-dive-into-the-father-of-the-atomic-bomb': [
      'Who was J. Robert Oppenheimer, and was he involved in the Manhattan Project?',
      'What is Christopher Nolan\'s latest film?',
      'How is the movie Oppenheimer doing at the box office?',
    ],
    'mercedes-benz-s-drive-pilot-system-hands-off-highway-driving-with-in-car-monitoring': [
      'What is a level 3 autonomous driving system ?',
      'Which companies received permit to test level 3 autonomous driving in California ?',
      'What autonomous level allows for the driver not to be present ?'
    ],
    'unity-s-controversial-installation-fee-policy-sparks-outrage-among-developers': [
      'What is Unity ?',
      'What is the Unity installation fee ?',
      'What is the Unity Plus subscription ?',
    ],
    'unlocking-the-power-of-the-iphone-15-pro-max': [
      'Tell me about the key features of the iPhone 15 Max.',
      'What improvements have been made in the iPhone 15 Max compared to its predecessor ?',
      'Compare the iPhone 15 Max to its competitors in terms of features and performance.'
    ],
    'scientists-discover-slow-spinning-stars-in-the-center-of-the-milky-way': [
      'Why did researchers conclude that the group of stars is spinning slowly ?',
      'In what ways does the discovery challenge previous assumptions about of the Milky Way ?',
      'Can we conclude that other galaxies may have formed in a similar manner ?'
    ]
  },



  'mockAffiliate': {
    'unlocking-the-power-of-the-iphone-15-pro-max': [{
      url: 'https://www.amazon.com/UltraGlass-Protector-Coverage-Military-Shatterproof/dp/B0CB5VVSGX/ref=sr_1_51?crid=1XNKUGG6LB0R7&keywords=iPhone%2B15%2BPro%2BMax&qid=1696508678&sprefix=iphone%2B15%2Bpro%2Bmax%2Caps%2C161&sr=8-51&th=1',
      title: 'UltraGlass UNBREAK TOP 9H+ Glass for iPhone 15 Pro Max Screen Protector [Full Coverage & Military Grade Shatterproof] Screen Protector 15 Pro Max Tempered Glass [Longest Durable] 2 Packs',
      img: 'https://m.media-amazon.com/images/I/71mSDF6S8SL._AC_SX679_.jpg',
      brand: 'UltraGlass',
      rating: 4.4,
      ratingsCount: 412,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/Magnetic-Wireless-Charger-Charging-Compatible/dp/B0B7L526VV/ref=sxin_26_cpf_saw-CPFPecos-dsk-lmlk-asin?content-id=amzn1.sym.5fd35f2d-c1de-4678-ba9f-54569b4fdcb7%3Aamzn1.sym.5fd35f2d-c1de-4678-ba9f-54569b4fdcb7&crid=1P7BKKV7UWD4T&cv_ct_cx=iphone%2B15%2Bpro%2Bmax%2Baccessories&keywords=iphone%2B15%2Bpro%2Bmax%2Baccessories&pd_rd_i=B0B7L526VV&pd_rd_r=fab780fc-3bfc-471d-9da3-8986fa3f688b&pd_rd_w=FAZbb&pd_rd_wg=Hl7K5&pf_rd_p=5fd35f2d-c1de-4678-ba9f-54569b4fdcb7&pf_rd_r=YVV3T3B9RXWZ6SMR2B43&qid=1696518869&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=iPhone%2B15%2BPro%2BMax%2Bac%2Caps%2C253&sr=1-3-88bb4e7b-fb79-43dc-9dec-6da196f88672&th=1',
      title: 'Magnetic Wireless Charger: MagSafe Charger Compatible with iPhone 15 Pro Max Plus 14 Pro Max Plus 13 Pro Max 12 Pro Max - iPhone Charging Pad for AirPods 3 2 Pro with USB-C 20W PD Adapter',
      img: 'https://m.media-amazon.com/images/I/61aelBFeHQL._AC_SY741_.jpg',
      brand: 'Bohuma',
      rating: 4.4,
      ratingsCount: 10113,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/YWXTW-iPhone-Pro-Max-Installation/dp/B0CBWHL4VC/ref=sxin_26_cpf_saw-CPFPecos-dsk-lmlk-asin?content-id=amzn1.sym.5fd35f2d-c1de-4678-ba9f-54569b4fdcb7%3Aamzn1.sym.5fd35f2d-c1de-4678-ba9f-54569b4fdcb7&crid=1P7BKKV7UWD4T&cv_ct_cx=iphone%2B15%2Bpro%2Bmax%2Baccessories&keywords=iphone%2B15%2Bpro%2Bmax%2Baccessories&pd_rd_i=B0CBWHL4VC&pd_rd_r=0bb6b57b-d49c-4ad3-aab6-0ab9b5327a22&pd_rd_w=oyag1&pd_rd_wg=7BEQX&pf_rd_p=5fd35f2d-c1de-4678-ba9f-54569b4fdcb7&pf_rd_r=T2N8HSVYSZT3FJ45RVJC&qid=1696520179&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=iPhone%2B15%2BPro%2BMax%2Bac%2Caps%2C253&sr=1-8-88bb4e7b-fb79-43dc-9dec-6da196f88672&th=1',
      title: 'YWXTW Camera Lens Protector for iPhone 15 Pro/iPhone 15 Pro Max, [1 Step Installation Tray] Tempered Glass Screen Protector Metal Individual Camera Cover Accessories Case Friendly (Black Titanium)',
      img: 'https://m.media-amazon.com/images/I/71xXKBU3Y4L._AC_SX679_.jpg',
      brand: 'YWXTW',
      rating: 4.4,
      ratingsCount: 1058,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/TORRAS-Magnetic-Shockproof-Protection-Kickstand/dp/B0CBJHPJG1/ref=sr_1_17_sspa?crid=1XNKUGG6LB0R7&keywords=iPhone%2B15%2BPro%2BMax&qid=1696508876&sprefix=iphone%2B15%2Bpro%2Bmax%2Caps%2C161&sr=8-17-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9idGY&th=1',
      title: 'TORRAS Magnetic Shockproof for iPhone 15 Pro Max Case,[Military Grade Drop Tested] [Fit for MagSafe] [Upgraded Camera Protection] Sturdy Kickstand Slim Frosted iPhone 15 ProMax Case, Black Titanium',
      img: 'https://m.media-amazon.com/images/I/71Pry7MWSGL._AC_SX679_.jpg',
      brand: 'TORRAS',
      rating: 4.8,
      ratingsCount: 103,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/TORRAS-360%C2%B0Rotatable-Compatible-Shockproof-Translucent/dp/B0CBJG1L3L/ref=sr_1_36?crid=1XNKUGG6LB0R7&keywords=iPhone%2B15%2BPro%2BMax&qid=1696508698&sprefix=iphone%2B15%2Bpro%2Bmax%2Caps%2C161&sr=8-36&th=1',
      title: 'TORRAS 360°Rotatable Magnetic Ring for iPhone 15 Pro Max Case, Compatible with MagSafe with Stand & Ring Holder, Military Grade Shockproof Translucent Back for iPhone 15 ProMax Case Ostand R, Black',
      img: 'https://m.media-amazon.com/images/I/81sX5Rr1YML._AC_SX569_.jpg',
      brand: 'TORRAS',
      rating: 4.5,
      ratingsCount: 186,
      type: 'product'
    }, {
      url: 'https://m.media-amazon.com/images/I/71zgA5etEeL._AC_SX679_.jpg',
      title: 'Spigen OneTap (MagFit) Designed for MagSafe Cup Holder Car Mount Compatible with iPhone 15 Pro Max, 15 Pro, 15 Plus, 15, 14, 13, and 12 Series',
      img: 'https://m.media-amazon.com/images/I/71zgA5etEeL._AC_SX679_.jpg',
      brand: 'Spigen',
      rating: 3.7,
      ratingsCount: 1152,
      type: 'product'
    }],
    'exploring-the-mind-of-j-robert-oppenheimer-a-deep-dive-into-the-father-of-the-atomic-bomb': [{
      url: 'https://amzn.to/46Fn113',
      title: 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer',
      img: 'https://m.media-amazon.com/images/I/81kdC93pWrL._SY466_.jpg',
      author: 'Kai Bird, Martin J. Sherwin',
      rating: 4.6,
      ratingsCount: 7014,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Countdown-1945-Extraordinary-Atomic-Changed/dp/B07ZWCSWPK/ref=sr_1_2?crid=1TFJCDKY9E82N&keywords=atomic+bomb&qid=1696456867&s=audible&sprefix=atomic+bomb%2Caudible%2C159&sr=1-2',
      title: 'Countdown 1945: The Extraordinary Story of the Atomic Bomb and the 116 Days That Changed the World',
      img: 'https://m.media-amazon.com/images/I/51ZEI-NjeRL.jpg',
      rating: 4.7,
      ratingsCount: 8718,
      author: 'Chris Wallace, Mitch Weiss',
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Making-Atomic-Bomb-Richard-Rhodes/dp/1451677618/ref=d_sims_dp_d_dex_ai_speed_loc_sccl_2_2/132-9214889-2545118?pd_rd_w=YX76u&content-id=amzn1.sym.29adec37-ce27-44ef-b467-ea0aa144e49d&pf_rd_p=29adec37-ce27-44ef-b467-ea0aa144e49d&pf_rd_r=6HE5QV2DJFC5560X8CAB&pd_rd_wg=HcBpY&pd_rd_r=d46b2a73-1187-48ba-a9b9-7f2531439a60&pd_rd_i=1451677618&psc=1',
      title: 'The Making of the Atomic Bomb',
      img: 'https://m.media-amazon.com/images/I/61KLAA1jwQL._SY466_.jpg',
      rating: 4.6,
      ratingsCount: 3456,
      author: 'Richard Rhodes ',
      type: 'book'
    }, {
      url: 'https://amzn.to/46e7ntv',
      title: 'Oppenheimer: Beyond the Blast: A Deep Dive into the Life and Legacy of J. Robert Oppenheimer - A 2023 Biography and Documentary Book (Pioneering Minds: The J. Robert Oppenheimer Legacy Series 1)',
      img: 'https://m.media-amazon.com/images/I/712BZ56me-L._SY466_.jpg',
      author: 'Julian R. Stonebridge',
      rating: 3.8,
      ratingsCount: 30,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Brief-History-Robert-Oppenheimer-Mechanics-ebook/dp/B0CD5214B3/ref=sr_1_9?crid=N5ME5ULHW0R5&keywords=the+manhattan+project&qid=1696456539&s=books&sprefix=the+manhatan+projec%2Cstripbooks-intl-ship%2C186&sr=1-9',
      title: 'A Brief History of Robert Oppenheimer - From Quantum Mechanics to the Atomic Bomb: A Journey Through the Manhattan Project and Beyond',
      img: 'https://m.media-amazon.com/images/I/81WoKR6La0L._SY466_.jpg',
      rating: 4.3,
      ratingsCount: 169,
      author: 'Albert Neutron',
      type: 'book'
    }, {
      url: 'https://amzn.to/3F3m1YJ',
      title: 'The Manhattan Project: The Making of the Atomic Bomb',
      img: 'https://m.media-amazon.com/images/I/518YhP5FpGL.jpg',
      rating: 4.2,
      ratingsCount: 559,
      author: 'Al Cimino',
      type: 'book'
    }, {
      url: 'https://amzn.to/3F3m1YJ',
      title: 'Now It Can Be Told: The Story Of The Manhattan Project',
      img: 'https://m.media-amazon.com/images/I/61T0Cg1flDL._SY466_.jpg',
      rating: 4.4,
      ratingsCount: 417,
      author: 'Leslie R. Groves',
      type: 'book'
    }],
    'escalating-tensions-between-india-and-canada-over-alleged-involvement-in-sikh-activist-s-murder': [{
      url: 'https://www.amazon.com/Passage-India-M-Forster/dp/0156711427/ref=sr_1_10?crid=2XOLMRP20E8WG&keywords=books+canada+india&qid=1696579483&s=books&sprefix=books+canada+indi%2Cstripbooks-intl-ship%2C165&sr=1-10',
      title: 'A Passage To India',
      img: 'https://m.media-amazon.com/images/I/71O4LefzraL._SY466_.jpg',
      author: 'E.M. Forster',
      rating: 4.0,
      ratingsCount: 3860,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Canada-Richard-Ford/dp/0061692034/ref=sr_1_17?crid=2XOLMRP20E8WG&keywords=books+canada+india&qid=1696579595&s=books&sprefix=books+canada+indi%2Cstripbooks-intl-ship%2C165&sr=1-17',
      title: 'Canada',
      img: 'https://m.media-amazon.com/images/I/71pOQaRRU9L._SY466_.jpg',
      author: 'Richard Ford',
      rating: 3.8,
      ratingsCount: 3251,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Company-Rise-Fall-Hudsons-Empire/dp/0385694091/ref=sr_1_24?crid=2XOLMRP20E8WG&keywords=books+canada+india&qid=1696579595&s=books&sprefix=books+canada+indi%2Cstripbooks-intl-ship%2C165&sr=1-24',
      title: 'The Company: The Rise and Fall of the Hudson\'s Bay Empire',
      img: 'https://m.media-amazon.com/images/I/81jomUVeItL._SY466_.jpg',
      author: 'Richard Ford',
      rating: 4.4,
      ratingsCount: 833,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/India-History-John-Keay-ebook/dp/B004UN6P0M/ref=sr_1_4?crid=SL4TYL4ZR88Q&keywords=books+india&qid=1696587572&s=books&sprefix=books+india%2Cstripbooks-intl-ship%2C163&sr=1-4',
      title: 'India: A History',
      img: 'https://m.media-amazon.com/images/I/91SzXVV2ekL._SY466_.jpg',
      author: 'John Keay',
      rating: 4.3,
      ratingsCount: 1068,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/India-Short-History-Andrew-Robinson/dp/0500295166/ref=sr_1_33?crid=2XOLMRP20E8WG&keywords=books+canada+india&qid=1696587552&s=books&sprefix=books+canada+indi%2Cstripbooks-intl-ship%2C165&sr=1-33',
      title: 'India: A Short History',
      img: 'https://m.media-amazon.com/images/I/81L-kU-S0KL._SY466_.jpg',
      author: 'Andrew Robinson',
      rating: 3.9,
      ratingsCount: 53,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Constitution-Canada-Founding-Fathers/dp/1774262665/ref=sr_1_14?crid=2XOLMRP20E8WG&keywords=books+canada+india&qid=1696579483&s=books&sprefix=books+canada+indi%2Cstripbooks-intl-ship%2C165&sr=1-14',
      title: 'The Constitution of Canada',
      img: 'https://m.media-amazon.com/images/I/71VXqEjOYJL._SY466_.jpg',
      author: 'Founding Fathers',
      rating: 4.6,
      ratingsCount: 387,
      type: 'book'
    }],
    'the-power-of-personalized-medicine-unlocking-the-secrets-of-aging-and-disease': [{
      url: 'https://www.amazon.com/Audible-Outlive-Science-Art-Longevity/dp/B0B64WL9PK/ref=sr_1_5?crid=ZOA3MY3E6302&keywords=aging+books&qid=1696598517&sprefix=aginng+book%2Caps%2C167&sr=8-5',
      title: 'The New Rules of Aging Well: A Simple Program for Immune Resilience, Strength, and Vitality',
      img: 'https://m.media-amazon.com/images/I/71u+9WRF4-L._SY466_.jpg',
      author: 'Frank Lipman MD, Danielle Claro',
      rating: 4.6,
      ratingsCount: 930,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Audible-Outlive-Science-Art-Longevity/dp/B0B64WL9PK/ref=sr_1_5?crid=ZOA3MY3E6302&keywords=aging+books&qid=1696598517&sprefix=aginng+book%2Caps%2C167&sr=8-5',
      title: 'Outlive: The Science and Art of Longevity',
      img: 'https://m.media-amazon.com/images/I/41qWDt1FuBL.jpg',
      author: 'Peter Attia MD, Bill Gifford',
      rating: 4.7,
      ratingsCount: 7628,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Lifespan-audiobook/dp/B07QGH1Q43/ref=sr_1_6?crid=ZOA3MY3E6302&keywords=aging+books&qid=1696598517&sprefix=aginng+book%2Caps%2C167&sr=8-6',
      title: 'Lifespan: Why We Age - and Why We Don\'t Have To',
      img: 'https://m.media-amazon.com/images/I/51bb7yJqDNL.jpg',
      author: 'David A. Sinclair PhD, Matthew D. LaPlante',
      rating: 4.6,
      ratingsCount: 10016,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Successful-Aging-Neuroscientist-Explores-Potential/dp/1524744204/ref=sr_1_33?crid=ZOA3MY3E6302&keywords=aging+books&qid=1696598517&sprefix=aginng+book%2Caps%2C167&sr=8-33',
      title: 'Successful Aging: A Neuroscientist Explores the Power and Potential of Our Lives',
      img: 'https://m.media-amazon.com/images/I/81-vZCSUDpL._SY466_.jpg',
      author: 'Daniel J. Levitin',
      rating: 4.4,
      ratingsCount: 905,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Aging-Spiritual-Practice-Contemplative-Growing/dp/1592407471/ref=sr_1_26?crid=1XF26KLLOKXQS&keywords=aging&qid=1696599037&sprefix=aging%2Caps%2C224&sr=8-26',
      title: 'Aging as a Spiritual Practice: A Contemplative Guide to Growing Older and Wiser',
      img: 'https://m.media-amazon.com/images/I/71zsply7pIL._SY466_.jpg',
      author: 'Lewis Richmond',
      rating: 4.5,
      ratingsCount: 457,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Genomics-Personalized-Medicine-Everyone-Needs-ebook/dp/B01B1EYBAI/ref=sr_1_5?crid=1HIWIBYO3HF1&keywords=personalized+medicine+book&qid=1696598410&sprefix=personalized+medicine+boo%2Caps%2C175&sr=8-5',
      title: 'Genomics and Personalized Medicine: What Everyone Needs to Know',
      img: 'https://m.media-amazon.com/images/I/81w8L-kbGAL._SY466_.jpg',
      author: 'Michael Snyder',
      rating: 4.5,
      ratingsCount: 102,
      type: 'book'
    }],
    '2024-audi-s5-sportback-sleek-looks-and-powerful-performance': [{
      url: 'https://www.amazon.com/AUTO-P-Suitable-2017-up-Interior-Modification/dp/B07VCFYMS8/ref=sr_1_4?crid=37YT4SH55DGG8&keywords=audi+s5+sportback+accessories&qid=1696619673&sprefix=Audi+S5+Sportback%2Caps%2C166&sr=8-4',
      title: 'AUTO-P Suitable for Audi 2017-up A4 A5 S5 RS5 Q7, 2018-up Q5 Shift knob Cover Shell Interior Modification (ABS Carbon Fiber Plaid) (A)',
      img: 'https://m.media-amazon.com/images/I/61xdcYQmt0L._AC_SX522_.jpg',
      brand: 'AUTO-P',
      rating: 4.4,
      ratingsCount: 115,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/CarQiWireless-Wireless-2018-2022-Organizer-Accessories/dp/B09LM1R7YT/ref=sr_1_5?crid=37YT4SH55DGG8&keywords=audi+s5+sportback+accessories&qid=1696619673&sprefix=Audi+S5+Sportback%2Caps%2C166&sr=8-5',
      title: 'CarQiWireless Wireless Charger for Audi A4 (B9) A5 S4 S5 2018-2023, Wireless Charging Pad Center Console Organizer for Audi A4 A5 Accessories A4 Allroad A4 Quattro, 2023 2022 2021 2020 2019 2018',
      img: 'https://m.media-amazon.com/images/I/71D-YcDctvL._AC_SX466_.jpg',
      brand: 'CarQiWireless',
      rating: 3.0,
      ratingsCount: 9,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/MIGUOER-S-line-Universal-Accessories-Motorcycles/dp/B0C533DNNK/ref=sr_1_42?crid=37YT4SH55DGG8&keywords=audi%2Bs5%2Bsportback%2Baccessories&qid=1696619673&sprefix=Audi%2BS5%2BSportback%2Caps%2C166&sr=8-42&th=1',
      title: 'MIGUOER Tire Valve Stem Caps for Audi S-line RS Series Stem Cap Universal Car Air Cover Car Accessories for Cars, SUV, Truck, Motorcycles 4pcs Black',
      img: 'https://m.media-amazon.com/images/I/71zQXA0KG4L._AC_SX466_.jpg',
      brand: 'MIGUOER',
      rating: 4.5,
      ratingsCount: 132,
      type: 'product'
    }, {
      url: 'https://www.amazon.com/TTCR-II-Compatible-Drill-Anti-Slip-Aluminum-Alloy-Brake-Automatic/dp/B08X4M1133/ref=sr_1_158?crid=37YT4SH55DGG8&keywords=audi+s5+sportback+accessories&qid=1696619820&sprefix=Audi+S5+Sportback%2Caps%2C166&sr=8-158',
      title: 'TTCR-II Compatible with Audi Pedals, Brake and Gas Pedal Covers for A3 A4 A5 A6 A7 A8 Q3 Q5 Q7 Q8 SQ5 SQ7 SQ8 TT TTRS Pedals, No Drill Anti-Slip Alloy Pedal Pad (Auto, 2 pcs)',
      img: 'https://m.media-amazon.com/images/I/71ZB+jg-nkL._AC_SX466_.jpg',
      brand: 'TTCR-II',
      rating: 3.7,
      ratingsCount: 82,
      type: 'product'
    }],
    'scientists-discover-slowly-spinning-group-of-stars-in-the-center-of-the-milky-way-galaxy': [{
      url: 'https://www.amazon.com/Cosmic-Queries-StarTalks-Guide-Where/dp/1426221770/ref=sr_1_2_sspa?crid=3VTVUH7GUTOUT&keywords=astronomy+books&qid=1696603018&sprefix=astronomy+book%2Caps%2C206&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
      title: 'Cosmic Queries: StarTalk\'s Guide to Who We Are, How We Got Here, and Where We\'re Going',
      img: 'https://m.media-amazon.com/images/I/91uhfngBB1L._SY466_.jpg',
      author: 'Neil Degrasse Tyson',
      rating: 4.8,
      ratingsCount: 3092,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Space-Atlas-Second-Mapping-Universe/dp/1426219695/ref=sr_1_9?crid=3VTVUH7GUTOUT&keywords=astronomy+books&qid=1696603168&sprefix=astronomy+book%2Caps%2C206&sr=8-9',
      title: 'Space Atlas, Second Edition: Mapping the Universe and Beyond',
      img: 'https://m.media-amazon.com/images/I/91w9WCjBeGL._SY466_.jpg',
      author: 'James Trefil',
      rating: 4.8,
      ratingsCount: 1047,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Star-Finder-Step-Step-Guide/dp/1465464751/ref=sr_1_26?crid=3VTVUH7GUTOUT&keywords=astronomy+books&qid=1696603168&sprefix=astronomy+book%2Caps%2C206&sr=8-26',
      title: 'Star Finder!: A Step-by-Step Guide to the Night Sky',
      img: 'https://m.media-amazon.com/images/I/71YLVkjyufL._SY466_.jpg',
      author: 'DK',
      rating: 4.7,
      ratingsCount: 1001,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Astrophysics-People-Hurry-audio-cd/dp/B06XB2PX7G/ref=sr_1_6?crid=3VTVUH7GUTOUT&keywords=astronomy+books&qid=1696603168&sprefix=astronomy+book%2Caps%2C206&sr=8-6',
      title: 'Astrophysics for People in a Hurry',
      img: 'https://m.media-amazon.com/images/I/61j+AB3GUoL.jpg',
      author: 'Neil deGrasse Tyson',
      rating: 4.6,
      ratingsCount: 35440,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/National-Geographic-Backyard-Guide-Night/dp/1426220154/ref=sr_1_3_sspa?crid=U25SXDSG1VCN&keywords=Milky+Way+book&qid=1696601235&sprefix=milky+way+book%2Caps%2C236&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
      title: 'National Geographic Backyard Guide to the Night Sky, 2nd Edition',
      img: 'https://m.media-amazon.com/images/I/81HDRnhESpL._SY466_.jpg',
      author: 'Andrew Fazekas',
      rating: 4.7,
      ratingsCount: 1461,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Visual-Galaxy-Ultimate-Guide-Beyond/dp/142622060X/ref=sr_1_6?crid=U25SXDSG1VCN&keywords=Milky+Way+book&qid=1696601235&sprefix=milky+way+book%2Caps%2C236&sr=8-6',
      title: 'Visual Galaxy: The Ultimate Guide to the Milky Way and Beyond',
      img: 'https://m.media-amazon.com/images/I/914j-nSmqOL._SY466_.jpg',
      author: 'National Geographic',
      rating: 4.7,
      ratingsCount: 154,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Believing-Seeing-Physicist-Shattered-Necessity-ebook/dp/B08XR1WGCW/ref=sr_1_11_sspa?crid=U25SXDSG1VCN&keywords=Milky+Way+book&qid=1696601235&sprefix=milky+way+book%2Caps%2C236&sr=8-11-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1',
      title: 'Believing Is Seeing: A Physicist Explains How Science Shattered His Atheism and Revealed the Necessity of Faith',
      img: 'https://m.media-amazon.com/images/I/81MSIk7jWES._SY466_.jpg',
      author: 'Michael Guillen',
      rating: 4.6,
      ratingsCount: 863,
      type: 'book'
    }, {
      url: 'https://www.amazon.com/Milky-Way-Autobiography-Our-Galaxy-ebook/dp/B09N3FS9DP/ref=sr_1_1?crid=U25SXDSG1VCN&keywords=Milky+Way+book&qid=1696601673&sprefix=milky+way+book%2Caps%2C236&sr=8-1',
      title: 'The Milky Way: An Autobiography of Our Galaxy',
      img: 'https://m.media-amazon.com/images/I/8121PSx1W3L._SY466_.jpg',
      author: 'Moiya McTier',
      rating: 4.2,
      ratingsCount: 167,
      type: 'book'
    }]
  },

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
    'defaultBucket': 'week',
    'defaultSort': 'top'
  },

  'ws': {
    'chat': 'wss://api.infold.ai',
    'path': 'chat/foldy'
  },

  'firebase': {
    'signInLinkRedirectUrl': 'https://infold.com',
  },

  story: {
    thumb: {
      name: 'thumbnail.png',
      width: 1200,
      height: 630,
    },
  },

  "api_key": process.env.NEXT_API_KEY,

  // temp keyword blacklist
  // lowercase
  'keywordsBlacklist': ['nbcuniversal', 'cnbc', 'cbo', 'youtube', 'getty images', 'los angeles', 'afp', 'itv', 'volodymyr zelenskyy', 'the pixel 8 pro', 'the pixel 8', 'lightning', 'mercedes-benz group ag', 'sacramento', 's class', 'san diego', 'sae', 'motional', 'blue cruise', 's-class', 'ford', 'dmv', 'nevada', 'markus schafer', 'level 3', 'newsmax', 'people', 'plains', 'archery', 'happy birthday', 'ga.', 'crew', 'section 3', 'national court', 'geo', 'nro', 'vulcan', 'endeavour', 'massa', 'treasury', 'ram', 'gulf', 'api', 'eia', 'iea', 'kingdom', 'bloomberg', 'fed', 'judiciary', 'renew', 'shortcut', 'indo', 'chiefs', 'usa', 'cabinet', 'channel', 'labour', 'government', 'court', 'resolve', 'vikram', 'colo.', 'calif.', 'k.c.', 'c3', 'tad', 'sydney', 'euractiv', 'parliament', 's.c.', 'senate', 'wagner', 'global news', 'amazon', 'tiktok', 'b.c', 'paradise', 'front street', 'ama', 'webb', 'telegram', 'tvl', 'tap', 'cai', 'maps', 'instagram', 'lakes', 'post', 'bills', 'test', 'u.s.—and', 'walkman', 'wikipedia', 'honestly', 'northeast', 'mich', 'detroit', 'left', 'right', 'the associated press', 'defense', 'business insider', 'breaking news', 'the washington post', 'the united states', 'ont.', '” orr', 'sun', 'ky.', 'abc', 'r - fla.', 'this week', 'del.', 'ap', 'cbs', 'north', 'south', 'east', 'fl', 'west', 'u.s', 'juice', 'n.y.', 'cbs', 'msnbc', 'guardian', 'ocu', 'state', 'hill', 'insider', 'berlin', 'mass', 'americas', 'moody', 'asia', 'berlin', 'indiana', 'paris', 'dmn', 'ocean waves', 't.s', 'new delhi', 'leopard', 'moon', 'united nations', 'albania', 'malta', 'britain', 'european state', 'indonesia', 'columbia', 'fox news', 'mich.', 'north korea', 'new york city', 'u.k.', 'south korea', 'boston', 'vegas', 'east river', 'milwaukee', 'fla.', 'soviet union', 'variety', 'italy', 'sky news', 'npr', 'New Delhi', 'u.n.', 'singapore', 'nbc', 'tesla', 'austin', 'fremont', 'london', 'google', 'germany', 'spa', 'japan', 'brazil', 'australia', 'netherlands', 'france', 'noordwijk', 'marinka', 'bds', 'bbc', 'associated press', 'nbc news', 'florida', 'politico', 'new york state', 'florida', 'north america', 'kremlin', 'alliance', 'rome', 'koco', 'un', 'eu', 'stockholm', 'estonia', 'brussels', 'mideast', 'hungary', 'sweden', 'middle east', 'jerusalem', 'pentagon', 'finland', 'd.c.', 'moscow', 'turkey', 'linkedin', 'saudi arabia', 'iran', 'beijing', 'nato', 'washington', 'pakista', 'india', 'canada', 'michigan', 'tenn.', 'new york', 'congress', 'trump', 'america', 'legislature', 'kan.', 'georgia', 'crow', 'facebook', 'capitol', 'knoxville', 'n.c.', 'raleigh', 'north carolina', 'tennessee', 'house', 'atlanta', 'cnn', 'manhattan', 'gop', 'reuters', 'memphis', 'white house', 'nashville', 'democratic', 'twitter', 'california', 'minnesota', 'europe', 'siberia', 'spain', 'peru', 'maine', 'colorado', 'university of sydney', 'africa', 'utc', 'princeton university', 'washington university', 'england', 'earth', 'us', 'u.s.', 'russia', 'china', 'nasa', 'west', 'east', 'bard college', 'mars', 'iceland', 'veritas', 'texas', 'ukraine', 'uk', 'united kingdom', 'united states', 'united states of america'],
}

export default config