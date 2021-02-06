## News-Explorer project REACT.JS FUNCTIONALITY

Bootstrapped with Create-React-App

A few notes:

* Everything seems to be working. Depending on the speed of the api, sometimes the redirects are kind of funky
* Code is logically organized, but currently still pretty messy.
* Couldn't get the redirect to work with the useHistory hook, so I used the useLocation hook instead.
* Created a crash function as part of the App.js, in case the api server fails.

Draft 2:

* In case you were wondering, git checkout . erases all unstaged changes. RIP the first time I wrote all this code. Luckily, it goes much faster when you know the problems you need to solve. I've since installed a local backup extension separate from git. Lesson learned.
* Moved all api calls to app.js
* Moved all constants and config data to a constants.js folder inside the utils folder.
* Accidentally broke my first API key after the page got stuck in a loop and sent too many requests. New key has been added.
* Added new localStorage functions to hold the last search.
* Updated JWT login/logout so the error doesn't appear on initial page load.
* Updated date in the NewsApi requests to send timestamps rather than date objects.
* Added delete handler for the Main component.
* Added styles and functionality for input disabling.
* Elevated popup handlers for cleaner popup triggers.
* Moved location hook functionality to the history hook instead.
* Updated SearchForm to actually put the cards in the proper format before trying to match them to the NewsApi cards, lol.
* Removed validator.js and updated to use regular expressions instead.

### Enjoy!

### Website is here: http://danny-news-explorer.students.nomoreparties.site
