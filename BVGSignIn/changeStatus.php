<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['loggedIn'])){
	$student_id = $_SESSION['student_id'];
	$checklogin = $mysqli->query("SELECT * FROM students WHERE student_id = '$student_id'");
	if($_SESSION['status'] == "1"){
		$change = $mysqli->query("UPDATE students SET status='0' WHERE student_id='$student_id'");
		echo 0;
	}
	else{
		$change = $mysqli->query("UPDATE students SET status='1' WHERE student_id='$student_id'");
		echo 1;
	}

}
else{
	echo 404;
}

?>