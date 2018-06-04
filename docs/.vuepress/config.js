module.exports = {
  title: ' coachmarks',
  description: 'Add sketchy coachmark onboarding tips to your web / hybrid / progressive app',

  base: '/coachmarks/',
  head: [
    ['script', { src: 'https://cdn.rawgit.com/onboardist/coachmarks/v1.3.0/dist/coachmarks.umd.min.js'} ]
  ],

  themeConfig: {
    repo: 'onboardist/coachmarks',
    editLinks: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Onboardist', link: 'https://github.com/onboardist' },
    ]
  }
}
