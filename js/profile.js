
var nameFlag=true;
var ageFlag=true;
var phoneFlag=true;
var emailFlag=true;
var addressFlag=true;
var imageFlag=true;
var profileToSave = {id:0,name:"",age:"",phone:"",email:"",address:"",image:""};
	
function save()
{
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var address = document.getElementById("address").value;
	var imgPath = document.getElementById("imageName").value;
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(name == "" || name == null) {
		alert("Please Enter Your Name");
		document.getElementById("name").focus();
		nameFlag = false;
	} else if(isNaN(age)||age<1||age>100) {
		alert("Please Enter Valid Age");
		document.getElementById("age").focus();
		ageFlag = false;
	} else if(isNaN(phone)||phone.length != 10) {
		alert("Please Enter Valid Phone Number");
		document.getElementById("phone").focus();
		phoneFlag = false;
	} else if(!filter.test(email)){
		alert("Please Enter Valid Email Address");
		document.getElementById("email").focus();
		emailFlag = false;
	} else if(address == null || address == "") {
		alert("Please Enter the Address");
		document.getElementById("address").focus();
		emailFlag = false;
	}
	if(imgPath == null || imgPath == ""){
		imageFlag=false;
	}
	if(!imageFlag){
		alert("In-Valid File was Selected Kindly Select only Image File");
	}
	if(nameFlag && ageFlag && phoneFlag && emailFlag && addressFlag && imageFlag){
		profileToSave.id=1;
		profileToSave.name=name;
		profileToSave.age=age;
		profileToSave.phone=phone;
		profileToSave.email=email;
		profileToSave.address=address;
		profileToSave.image=globalPic;
		saveProfile(profileToSave);
		alert("Your Profile Saved Successfully...");
	}
	return false;
}
function saveProfile(profileToSave){
	localStorage.setItem("profile",profileToSave);
	
}
var maxWidth=152;
var maxHeight=229;
var fileTypes=["bmp","gif","png","jpg","jpeg"];
var outImage="previewField";
var defaultPic="../images/fixing-exe-errors.jpg";
function preview(what){
    var source=what.value;
	filename = source;
    var ext=source.substring(source.lastIndexOf(".")+1,source.length).toLowerCase();
    for (var i=0; i<fileTypes.length; i++){
		if (fileTypes[i]==ext){
			break;
		}
	}
    globalPic=new Image();
    if (i<fileTypes.length){
		try{
			globalPic.src=what.files[0].getAsDataURL();
			filename=what.files[0].getAsDataURL();
	  }catch(err){
			globalPic.src=source;
			filename=source;
	  }
	  imageFlag=true;
	}else {
      globalPic.src=defaultPic;
      alert("In-Valid File was Selected Kindly Select only Image File");
	  imageFlag=false;
    }
    setTimeout("applyChanges()",200);
}
var globalPic;
var filename;
function applyChanges(){
    var field=document.getElementById(outImage);
	var field1=document.getElementById("imageName");
    var x=parseInt(globalPic.width);
    var y=parseInt(globalPic.height);
    if (x>maxWidth) {
      y*=maxWidth/x;
      x=maxWidth;
    }
    if (y>maxHeight) {
      x*=maxHeight/y;
      y=maxHeight;
    }
    field.style.display=(x<1 || y<1)?"none":"";
    field.src=globalPic.src;
    field.width=x;
    field.height=y;
	field1.value=filename;
}