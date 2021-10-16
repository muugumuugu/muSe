<?php

function santizeFormUsername($inputtext){
  $inputtext = strip_tags($inputtext);
  $inputtext = str_replace(" ", "", $inputtext);
  return $inputtext;
}

function santizeFormPassword($inputtext){
  $inputtext = strip_tags($inputtext);
  return $inputtext;
}

function santizeFormString($inputText){
  $inputText = strip_tags($inputText);
  $inputText = str_replace(" ", "", $inputText);
  $inputText = ucfirst(strtolower($inputText));
  return $inputText;
}


if (isset($_POST['registerButton'])) {

  $username = santizeFormUsername($_POST['username']);
  $password = santizeFormPassword($_POST['password']);
  $password2 = santizeFormPassword($_POST['password2']);

  $wasSuccessful =$account->register($username,$password,$password2);
  if ($wasSuccessful) {
    $_SESSION['userLoggedIn'] = $username;
    header("Location: index.php");
  }

}

?>