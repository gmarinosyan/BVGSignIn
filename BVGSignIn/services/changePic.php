<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_FILES["file"]["type"])){

	$validextensions = array("jpeg", "jpg", "JPG");
	$temporary = explode(".", $_FILES["file"]["name"]);
	$file_extension = end($temporary);

	if ((($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
	) && ($_FILES["file"]["size"] < 3000000) && in_array($file_extension, $validextensions)) {

		if ($_FILES["file"]["error"] > 0){
			echo "0";
		}

		else {

			$sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
			$targetPath = "../profilePics/".$_SESSION['student_id'].".jpg"; // Target path where file is to be stored
			move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
			echo "1";
		}
	}
	else{
		echo "3";
	}
}

else {
echo "2";
}


?>