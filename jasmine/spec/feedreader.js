/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("has an existing URL", function() {
            for (let feed of allFeeds) {
                // tests if url key and values exists
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0); 
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("has an existing name", function() {
            for (let feed of allFeeds) {
                // tests if name key and values exists
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("Menu element", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const body = document.getElementsByTagName('body')[0];
         
        it("is hidden", function() {
             expect(body.classList.contains("menu-hidden")).toBe(true);
        });
        
        

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        
        it("toggles visibility when menu is clicked", function() {
            const menu = document.getElementsByClassName("menu-icon-link")[0];
            // preforms a click on the menu element
            menu.click();
            // checks if menu-hidden is removed from body
            expect(body.classList.contains("menu-hidden")).toBe(false);
            
            menu.click();
            // checks if menu-hidden exists on body
            expect(body.classList.contains("menu-hidden")).toBe(true); 
        });
});
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // loads feed
            loadFeed(0, done);
        });

        it("contain atleast an entry in the feed container", function() {
            const feed = document.getElementsByClassName("feed")[0];
            const entry = feed.querySelector(".entry").length
            /* expect(feed.classList.contains('entry')).toBe(true); */
            // checks if the feed has content/children
            expect(entry).not.toBe(0)
        });
    });
    /*  TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
         /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */ 
         
         // learned from Matthew Cranford's tutorial :)
         // https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
           const feed = document.getElementsByClassName("feed")[0]; 
           const feed1 = [];
           const feed2 = [];
        
           beforeEach(function(done) {
               // loads first feed
               loadFeed(0);
               // pushes content from first feed to feed1
               Array.from(feed.children).forEach(entry => {
                   feed1.push(entry.innerHTML);
               })
               // loads second feed
               loadFeed(1, done);
               // pushes content from second feed to feed2
              Array.from(feed.children).forEach(entry => {
                   feed2.push(entry.innerHTML);
               })
           })
           
           it("has loaded new feed", function() {
               // loops through original feed to check if contents equals to the feed1's index
               Array.from(feed.children).forEach((entry, index) => {
                  expect(entry.innerHTML === feed1[index]).toBe(false) 
               });
               // loops through original feed to check if contents equals to the feed2's index
               Array.from(feed.children).forEach((entry, index) => {
                  expect(entry.innerHTML === feed2[index]).toBe(false) 
               });
           });
       });
}());
