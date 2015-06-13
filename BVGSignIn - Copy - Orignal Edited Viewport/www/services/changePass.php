<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['studentLoggedIn'])){
	$student_id = $_SESSION['student_id'];
	$oldPassword = md5($mysqli->real_escape_string($_POST['existingPass']));
	$newPassword = md5($mysqli->real_escape_string($_POST['newPass']));
	$checklogin = $mysqli->query("SELECT * FROM students WHERE student_id = '$student_id' AND password = '$oldPassword'");

	if($checklogin->num_rows == 1){
        $updatePass = $mysqli->query("UPDATE students SET password ='$newPassword' WHERE student_id='$student_id'");
		echo "1";
	}
	else{
        echo "0";
    }
}

?>