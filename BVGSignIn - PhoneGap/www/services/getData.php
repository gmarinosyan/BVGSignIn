<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['studentLoggedIn'])){
	$student_id = $_SESSION['student_id'];
	$checklogin = $mysqli->query("SELECT * FROM students WHERE student_id = '$student_id'");

    $row = $checklogin->fetch_array();
    $_SESSION['firstName'] = $row['firstName'];
    $_SESSION['lastName'] = $row['lastName'];
    $_SESSION['status'] = $row['status'];

	echo $_SESSION['student_id'], " ", $_SESSION['firstName'], " ", $_SESSION['lastName'], " ", $_SESSION['status'];
}
else{
	echo 404;
}

?>