function validate() {
 
	var form = document.forms['form'];
	
	var invalid =' ';
	var userLength = 5;
	var pwdLength = 5;
	var user = form.user.value; 
	var pwd = form.password.value; 
	
	if (user == '')	{
		document.getElementById("userMsg").innerHTML = "Username can not be empty";
		addError("userTxt");
		return false;
	} else if (pwd == '') {
		document.getElementById("pwdMsg").innerHTML = "Passward can not be empty";
		addError("pwdTxt");
		return false;
	} else {                                              
	
		if (user.length < userLength) {
			document.getElementById("userMsg").innerHTML = 'Username must be ' + userLength + ' char long';
			addError("userTxt");
			form.user.value ="";
			form.password.value ="";
			return false;
		} else if (pwd.length < pwdLength) {
			document.getElementById("pwdMsg").innerHTML = 'Password must be ' + pwdLength + ' char long';
			addError("pwdTxt");
			form.user.value ="";
			form.password.value ="";
			return false;
		} else if (form.password.value.indexOf(invalid) > -1) {
			document.getElementById("pwdMsg").innerHTML = 'Sorry, spaces are not allowed.';
			addError("pwdTxt");
			return false;
		} else {
			if (user != "admin" && pwd != "admin"){
				document.getElementById("userMsg").innerHTML = 'Please enter valid login details.';
				addError("userTxt");
				return false;
			}
		}
	}
	return true;
}; 

var addError = function(field) {

	if (document.getElementById(field).className.indexOf(' error') < 0) {
		document.getElementById(field).className = document.getElementById(field).className + " error";  // this adds the error class
	}
}

function changeBehavior(txtField) {

	document.getElementById(txtField.id).className = document.getElementById(txtField.id).className.replace(" error", ""); // this removes the error class
	if (txtField.name == 'user') {
		document.getElementById("userMsg").innerHTML = "";
	} else if (txtField.name == 'password') {
		document.getElementById("pwdMsg").innerHTML = "";
	}
}

function passwordMask() {
    if (document.getElementById('pwd').value.length != 0) {
        
    }
};

