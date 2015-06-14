<?php 

// The script which allows the student user to change his password on the database.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['studentLoggedIn'])){ // check if student is currently logged in
	$student_id = $_SESSION['student_id']; // get student ID from current session
	$oldPassword = md5($mysqli->real_escape_string($_POST['existingPass'])); // convert old password to MD5 encryption
	$newPassword = md5($mysqli->real_escape_string($_POST['newPass'])); // convert new password to MD5 encryption
	$checklogin = $mysqli->query("SELECT * FROM students WHERE student_id = '$student_id' AND password = '$oldPassword'"); 
	// get all students from database who match the student ID and password provided

	if($checklogin->num_rows == 1){ // if such a student exists, set his password to the provided new password
        $updatePass = $mysqli->query("UPDATE students SET password ='$newPassword' WHERE student_id='$student_id'");
		echo "1";
	}
	else{ // otherwise report an error
        echo "0";
    }
}

?>