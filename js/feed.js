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
			feedsArray.splice(id, 1);	
			var myfeed = document.getElementById("loadFeeds");
			while (myfeed.firstChild) {
				myfeed.removeChild(myfeed.firstChild);
			}			
			reloadFeeds(feedsArray);
		};
	} 
	return result;
}

var reloadFeeds = function (feedsArray) {		

	var element = document.getElementById("loadFeeds");	
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	var feeds = feedsArray;	
	feedNew=feeds;
	var div = document.createElement("div");
	var userFeed,userFeedText,userFeedDelete,userFeedDate,img,node,input,node1,index,userIcon;

	for (var i=0, l=feeds.length; i<l; i++) {				

		userFeed = getElement("div","userFeed");
		userIcon = getElement("div", "feedIcon");
		userFeedText = getElement("div","feedText");
		userFeedDate = getElement("div","feedDate");
		userFeedDelete = getElement("div","feedDelete");
		userSpan = getElement("span","userSpan");

		img = document.createElement("img");		
		img.setAttribute("src", "../images/user.png");
		img.setAttribute("height", "30px");
		img.setAttribute("width", "30px");
		userIcon.appendChild(img);
		userIcon.setAttribute("id", "img1");

		node = document.createElement("a");
		if (feeds[i] instanceof URLFeed) {
			node.setAttribute("href", feeds[i].getFeed());		
		}
		node.setAttribute("id", "txt");
		node.innerHTML=feeds[i].getFeed();
		userFeedText.appendChild(node);

		input = document.createElement("input");		
		input.setAttribute("id", "but");
		input.setAttribute("class", "delete-btn");
		input.setAttribute("type", "button");
		input.setAttribute("onclick", ("deleteFeeds("+i+")"));
		userFeedDelete.appendChild(input);

		node1 = document.createTextNode(getDateString(feeds[i].getDate()));
		userFeedDate.appendChild(node1);

		userFeed.setAttribute("id", "feedDiv");
		userFeed.appendChild(userIcon);
		userFeed.appendChild(userFeedText);
		userFeed.appendChild(userFeedDate);
		userFeed.appendChild(userFeedDelete);
		userFeed.appendChild(userSpan);
		div.appendChild(userFeed);
	}
	element.appendChild(div);
}

function getElement(type, styleClass) {
	var element = document.createElement(type);
	element.setAttribute("class", styleClass);
	return element;
}

function getDateString(date) {
	return (date.getMonth()+1) +"-"+ (date.getDate()) + "-"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}

var switchDiv = function(container) {
	
	if (container.name == 'feed') {
		 document.getElementById("profile").style.display = "none";
		 document.getElementById("bookshelf").style.display = "inline-block";
	} else if (container.name == 'profile') {
		 document.getElementById("bookshelf").style.display = "none";
		 document.getElementById("profile").style.display = "inline-block";
	}
}

var fileTypes = ["bmp","gif","png","jpg","jpeg"];
var profilePic;
function showImage(fileChoosen) {

	var source = fileChoosen.value;
	var fileExtension = source.substring(source.lastIndexOf(".") + 1, source.length).toLowerCase();

	if (fileTypes.indexOf(fileExtension) > -1) {
		
		var reader = new FileReader();
		reader.onloadend = function () {
			document.getElementById("previewField").src = reader.result;
		}

		var file = fileChoosen.files[0];
		profilePic = new Image();
		if (file) {
			reader.readAsDataURL(file);
		} else {
			preview.src = "";
		}
		document.getElementById("imageName").value = source;
	} else {
		alert("Invalid file selection, please select image files");
	}
}

var flag = true;
var imageFlag = true;
var profileToSave = {id:0, name:"", age:"", phone:"", email:"", address:"", image:""};

var saveProfile = function() {
	
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var address = document.getElementById("address").value;
	var imgPath = document.getElementById("imageName").value;
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(name == "" || name == null) {
		alert("Profile name can not be empty");
		document.getElementById("name").focus();
		flag = false;
	} else if(isNaN(age)||age<1||age>100) {
		alert("Age can not be empty");
		document.getElementById("age").focus();
		flag = false;
	} else if(isNaN(phone)||phone.length != 10) {
		alert("Contact number can not be empty");
		document.getElementById("phone").focus();
		flag = false;
	} else if(!filter.test(email)){
		alert("Email address can not be empty");
		document.getElementById("email").focus();
		flag = false;
	} else if(address == null || address == "") {
		alert("Address can not be empty");
		document.getElementById("address").focus();
		flag = false;
	}

	if (imgPath == null || imgPath == "") {
		imageFlag = false;
	}

	if (!imageFlag) {
		alert("Invalid file selection, please select image files");
	}

	if (flag && imageFlag) {

		profileToSave.id=1;
		profileToSave.name=name;
		profileToSave.age=age;
		profileToSave.phone=phone;
		profileToSave.email=email;
		profileToSave.address=address;
		profileToSave.image=profilePic;
		alert("Profile Saved Successfully...");
	}
	return false;
}
