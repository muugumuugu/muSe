<?php
include("../config.php");
if (isset($_POST['albumId'])) {
	# code...
	$albumId = $_POST['albumId'];

	$query = mysqli_query($con,"SELECT * FROM albums WHERE id='$albumId'");

	$resultarray = mysqli_fetch_array($query);
	
	echo json_encode($resultarray);
}
?>