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
        coachmarks.add('try-it', {
          target: '.nav-item [href="/coachmarks/guide/"',
          text: 'You tried it! See the guide to get started'
        });

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
