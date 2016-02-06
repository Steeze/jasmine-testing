/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /**
     *Test suite to validate RSS feeds functionality
     */
    describe('RSS Feeds', function() {
        /**
         * Test to validate the all feeds array is defined
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Loop through the allFeeds array passing the object to test url exists function
         */
        for(var key in allFeeds){
            var obj = allFeeds[key];
           test_url_exists(obj);
        }

        /**
         * Function test url exists is called in the for loop and validates a url is defined.
         * @param input
         */
        function test_url_exists(input){
            it('should contain a url', function(){
                expect(input.url).toBeDefined();
            });
        }

        /**
         * Loop through the allFeeds array passing the object to the test name exists function
         */
        for(var key in allFeeds){
            var obj = allFeeds[key];
            test_name_exists(obj);
        }

        /**
         * Function test name exists is called in the for loop that validates a name is defined
         * @param input
         */
        function test_name_exists(input){
            it('should contain a name', function(){
                expect(input.name).toBeDefined();
            });
            it('should have a name that is not empty', function(){
                expect(input.name).not.toBe('');
            });
        }
    });

    /**
     * Test suite covering the menu of the rss feeder application
     */
    describe('The menu', function(){

        /**
         * Using jQuery hasClass function, this test validates the menu is hidden when the page is loaded.
         */
        describe('when the page is first loaded', function(){
            it('should have menu-hidden present', function(){
                expect($("body").hasClass('menu-hidden')).toBe(true);
            });
        });

        /**
         * Using Jasmine beforeEach method, this test is preforming a click event with
         * jQuery's trigger method. The test is validating using jQuery's hasClass
         * method that the CSS property menu-hidden has been removed.
         */
         describe('when the menu icon is clicked',function(){
             beforeEach(function(){
                 $('.icon-list').trigger('click');
             });

             it('should toggle the menu-hidden class ', function(){
                 return expect($('body').hasClass('menu-hidden')).toBe(false);
             });
         });

        /**
         * Using Jasmine beforeEach method, this test is preforming two click events.
         * The first click is performed using jQuery's trigger method.
         * A timeout is used to allow the DOM to render, then a second click event is made.
         * The test then validates using jQuery's hasClass method that the CSS property menu-hidden
         * has been removed.
         */
         describe('when the menu icon is clicked twice', function(){
            beforeEach(function(){
                $('.icon-list').trigger('click');

                setTimeout(function(){
                    $('.icon-list').trigger('click');
                }, 500);

            });
             it('should ', function(){
                 return expect($('body').hasClass('menu-hidden')).toBe(true);
             });
         });

    });

    /**
     * Test suite covering the initial entries.
     */
     describe('Initial Entries', function(){

         /**
          * The ajax function loadFeed is called with the first element in the allFeeds array.
          * Once the callback is returned, the count of the list of feeds returned is determined
          * using jQuery's find method to determine the length of the results.
          */
         var results;
         beforeEach(function(done){
             loadFeed(0, function(){
                 results = $('.feed').find('.entry-link').length;
                 done();
             });
         });

         /**
          * Test to validate that the length of the results is greater than zero.
          */
         it('should load the rss feed results', function(done){
           expect(results).toBeGreaterThan(0);
           done();
         });
     });

    /**
     * Test suite covering the new feed selection.
     */
      describe('New Feed Selection', function(){

          /**
           * Using jasmines async done() method, this test is loading two ajax callbacks and
           * testing the title has changed between callbacks by using jQuery's element selector and text
           * method to compare.
           */
          var resultsOne;
          var resultsTwo;

          beforeEach(function(done){
              loadFeed(0, function(){
                  resultsOne = $('.header h1.header-title').text();
                  loadFeed(1, function(){
                      resultsTwo = $('.header h1.header-title').text();
                      done();
                  });
              });
          });
          /**
           * Test to validate the titles changed between callbacks.
           */
          it('should have different titles when menu option is selected', function(done){
              expect(resultsOne).not.toEqual(resultsTwo);
              done();
          });
      });

    /**
     * Test suite covering the default title is replaced after successful callback.
     */
      describe('Default Title',function(){
          /**
           * Using jQuery's element selector the default title is captured.
           * Using jasmines async done() method, the loadFeed ajax feed is made
           * and the title is then captured a second time.
            */
         var defaultTitle;
         var afterLoadedTitle;
         beforeEach(function(done){
            defaultTitle = $('.header h1.header-title').text();
             loadFeed(0, function(){
                 afterLoadedTitle = $('.header h1.header-title').text();
                 done();
             });
         });
          /**
           * Test to validate the default title is replace.
           */
          it('should be replaced on successful callback', function(){
            expect(defaultTitle).not.toEqual(afterLoadedTitle);
            done();
          });
      });

}());
