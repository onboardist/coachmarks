export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // console.log(document.querySelector('.action-button'));
  router.afterEach((to, from) => {
    // Routing to homepage
    if (to.fullPath === '/') {
      Vue.nextTick(() => {
        let guideSelector = '.nav-item [href="/coachmarks/guide/"';
        if (window.getComputedStyle(document.querySelector('.sidebar-button')).display !== 'none') {
          guideSelector = '.sidebar-button';
        }

        coachmarks.add('try-it', {
          target: '.hero h1',
          text: 'You tried it!'
        });
        coachmarks.add('guide-link', {
          target: guideSelector,
          text: 'Check out the guide to get started'
        });
        coachmarks.flow('try-it').next('guide-link');

        document.querySelector('.home .action-button').addEventListener('click', (event) => {
          // debugger;
          event.preventDefault();
          event.stopPropagation();
          coachmarks.show('try-it');
        });
      });
    }
  });
}
