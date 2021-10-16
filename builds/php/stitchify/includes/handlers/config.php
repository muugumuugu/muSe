<?php
ob_start();
session_start();
$timezone = date_default_timezone_set("Indian/Christmas");
$con = mysqli_connect("localhost", "root", 'MukuLoves"0"', "slutify");

if (mysqli_connect_errno()) {
	echo "Failed to connect: ".mysqli_connect_errno();
}

?>
