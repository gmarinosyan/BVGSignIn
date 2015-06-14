<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

$username = $mysqli->real_escape_string($_POST['username']);
$password = md5($mysqli->real_escape_string($_POST['password']));

    $checklogin = $mysqli->query("SELECT * FROM students WHERE username = '$username' AND password = '$password' ");

    if($checklogin->num_rows == 1)
    {
        $row = $checklogin->fetch_array();
        $_SESSION['username'] = $username;
        $_SESSION['student_id'] = intval($row['student_id']);
        $_SESSION['firstName'] = $row['firstName'];
        $_SESSION['lastName'] = $row['lastName'];
        $_SESSION['status'] = $row['status'];
        $_SESSION['loggedIn'] = 1;
		echo "1";
    }
    else
    {
        echo "0";
    }

?>