
// Maximum number of repos to feature in the widget.
// To show all selected repos set to -1
var MAX_REPOS_VISIBLE = 2;

// To show a repo, add the following string to it's github description line
// (This allows the widget to identify which repos you'd like to feature)
var DESCRIPTION_SELECTOR = ";)";

// If set to true, the widget will remove your DESCRIPTION_SELECTOR from 
// the description it shows in the app
// 
// Ex. GitHub description: Here's my code ;)
// Ex. Shown in widget: Here's my code
//
// Personally, I'd set this to true
var REMOVE_DESCRIPTION_SELECTOR = true;