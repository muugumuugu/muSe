<?php

include("../config.php");

if (!isset($_POST['username'])) {
	echo "ERROR: In getting username";
	exit();
}

if (!isset($_POST['oldPassword']) || !isset($_POST['newPassword1']) || !isset($_POST['newPassword2'])) {
	echo "All Password are not Set";
	exit();
}

if ($_POST['oldPassword'] == "" || $_POST['newPassword1'] =="" || $_POST['newPassword2'] == "") {
	echo "Please fill all Fields!";
	exit();
}

$username = $_POST['username'];
$oldPassword = $_POST['oldPassword'];
$newPassword1  = $_POST['newPassword1'];
$newPassword2  = $_POST['newPassword2'];

$oldmd5 = md5($oldPassword);

$oldPasswordCheck = mysqli_query($con,"SELECT * FROM users WHERE username='$username' AND password='$oldmd5'");

if (mysqli_num_rows($oldPasswordCheck) !=1) {
	echo "Wrong Password";
	exit();
}

if ($newPassword1 != $newPassword2) {
	echo "New Passwords do not Match";
	exit();
}

if (preg_match('/[^A-Za-z0-9]/', $newPassword1)) {
	echo "Password can contain only numbers and letters";
	exit();
}

if (strlen($newPassword1) >30 || strlen($newPassword1) <5) {
	echo "Password size should be between 5-30 only";
	exit();
}

$newmd5 =md5($newPassword1);

mysqli_query($con,"UPDATE users SET password='$newmd5' WHERE username='$username' ");

echo "Password Updated";




?>