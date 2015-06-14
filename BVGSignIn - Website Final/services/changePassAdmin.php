<?php 

// The script which allows an admin to change his password on the database. -->

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ // check if administrator is currently logged in
	$admin_id = $_SESSION['admin_id']; // get admin ID from current session
	$oldPassword = md5($mysqli->real_escape_string($_POST['existingPass'])); // convert old password to MD5 encryption
	$newPassword = md5($mysqli->real_escape_string($_POST['newPass'])); // convert new password to MD5 encryption
	$checklogin = $mysqli->query("SELECT * FROM admins WHERE admin_id = '$admin_id' AND password = '$oldPassword'");
	// get all administrators from database who match the admin ID and provided password

	if($checklogin->num_rows == 1){ // if such an admin exists, set his password to the new password
        $updatePass = $mysqli->query("UPDATE admins SET password ='$newPassword' WHERE admin_id='$admin_id'");
		echo "1";
	}
	else{ // otherwise report an error
        echo "0";
    }
}

?>