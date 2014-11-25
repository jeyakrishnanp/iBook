/* Feed function and its prototype */
function Feed(id, type) {
	this.id = id;
	this.type = type;
	this.date = new Date();
}

Feed.prototype =  {
	getID: function(){
		return this.id;
	},
	getType: function() {
		return this.type;	
	},
	getDate: function() {
		return this.date;
	}
};

/* URL Feed function and its prototype */
function URLFeed(url) {
	this.url=url;
	this.type = "URL";
	this.date = new Date();
}

URLFeed.prototype = Object.create(Feed.prototype);

URLFeed.prototype.getFeed = function() {
	return this.url;
}

/* Text Feed function and its prototype */
function TextFeed(text) {

	this.text = text;
	this.type = "TEXT";
	this.date = new Date();
}

TextFeed.prototype = Object.create(Feed.prototype);

TextFeed.prototype.getFeed = function() {
	return this.text;
}

/* create a feed */
var feedNew = [];

function createFeed(id) {	

	var feedValue = document.getElementById(id).value;
	var feed;
	if(feedValue.length > 4 && 
		(feedValue.substring(0, 4).toUpperCase() == "HTTP" || 
		feedValue.substring(0,4).toUpperCase() == "HTTPS" || 
		feedValue.substring(0,3).toUpperCase() == "WWW")) {

		if(feedValue.substring(0, 3).toUpperCase() == "WWW") {
			feedValue ="http://" + feedValue;
		}
		feed = new URLFeed(feedValue);
	} else {
		feed = new TextFeed(feedValue);
	}

	if (feedValue.length > 0) {
		addFeedService(feed);
	} else {
		alert('Please enter the Feed');
	}
	document.getElementById(id).value = "";	
}

/* Delete a Feed */
function deleteFeeds(id){	
	deleteFeedService(id);
}

/* eturning Functions and Immediate Invocation */
var addFeedService = feedService("AddFeed");

var deleteFeedService = feedService("DeleteFeed");

function User(userName) {
	this.feeds = [];
	this.createdBy = userName;
}

function feedService(mode) {

	var currentUser = new User("admin");
	var feedsArray = currentUser.feeds;
	var result;
	
	if(mode === "AddFeed") {

		result = function(feed) {
			feedsArray.push(feed);			
			reloadFeeds(feedsArray);
		};
	} else if (mode === "DeleteFeed") {

		result = function(id) {

			feedsArray = feedNew;
			console.log(feedsArray); 
			feedsArray.splice(id, 1);	
			console.log(feedsArray);
			var myfeed = document.getElementById("loadFeeds");
			while (myfeed.firstChild) {
				myfeed.removeChild(myfeed.firstChild);
			}			
			reloadFeeds(feedsArray);
		};
	} 
	return result;
}

function reloadFeeds(feedsArray) {		

	var element = document.getElementById("loadFeeds");	
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}	
	var feeds = feedsArray;	
	feedNew=feeds;
	var div = document.createElement("div");
	var userFeed,userFeedText,userFeedDelete,userFeedDate,img,node,input,node1,index,userIcon;
		for(var i=0,l=feeds.length;i<l;i++){				
			userFeed = getElement("div","userFeed");
			userFeedText = getElement("div","UserFeedText");
			userFeedDelete = getElement("div","UserFeedDelete");
			userFeedDate = getElement("div","UserFeedDate");
			userIcon = getElement("div","userIcon");
			img = document.createElement("img");		
			img.setAttribute("src", "../images/user.png");
			img.setAttribute("height", "40px");
			img.setAttribute("width", "40px");
			userIcon.appendChild(img);
			userIcon.setAttribute("id", "img1");
			node = document.createElement("a");
			if(feeds[i] instanceof URLFeed){
				node.setAttribute("href", feeds[i].getFeed());		
			}
			node.setAttribute("id", "txt");
			node.innerHTML=feeds[i].getFeed();
			userFeedText.appendChild(node);
			input = document.createElement("input");		
			input.setAttribute("type", "button");
			input.setAttribute("onclick", ("deleteFeeds("+i+")"));
			input.setAttribute("id", "but");
			userFeedDelete.appendChild(input);
			node1 = document.createTextNode(getDateString(feeds[i].getDate()));
			userFeedDate.appendChild(node1);
			userFeed.setAttribute("id", "feedDiv");
			userFeed.appendChild(userIcon);
			userFeed.appendChild(userFeedText);
			userFeed.appendChild(userFeedDelete);
			userFeed.appendChild(userFeedDate);
			div.appendChild(userFeed);
		}
	element.appendChild(div);
}

function getElement(type,styleClass){
	var element = document.createElement(type);
	element.setAttribute("class",styleClass);
	return element;
}

function getDateString(date){
	return (date.getMonth()+1) +"/"+ (date.getDate()) + "/"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}
