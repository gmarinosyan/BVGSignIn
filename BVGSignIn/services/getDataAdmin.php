<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){
	$checklogin = $mysqli->query("SELECT student_id, firstName, lastName, status FROM students");
	$admins = mysqli_fetch_all($checklogin);
	echo json_encode($admins);
}
else{
	echo 404;
}

?>