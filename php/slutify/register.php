<?php
  include("includes/handlers/config.php");
  include("includes/classes/Constants.php");
  include("includes/classes/Account.php");
  $account =new Account($con);
  include("includes/handlers/register_handler.php");
  include("includes/handlers/loginhandler.php");

  function getInputValue($name){
    if (isset($_POST[$name])) {
      echo $_POST[$name];
    }
  }

?>

<!DOCTYPE html>
<html lang="en">
  <head>

    <title>Welcome to Slutify!</title>
    <link rel="stylesheet" type="text/css" href="includes/assets/css/register.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="includes/assets/js/register.js"></script>
  </head>
  <body>

    <?php

    if (isset($_POST["registerButton"])) {
      echo '<script>
        $(document).ready(function(){
        $("#loginform").hide();
        $("#registerform").show();
      });
      </script>';
    }
    else {

      echo '<script>
        $(document).ready(function(){
        $("#loginform").show();
        $("#registerform").hide();
      });
      </script>';
    }
    ?>
    <div id="background">
      <div id="loginContainer">
        <div id="container">
          <div id="inputContainer">
            <form id="loginform" action="register.php" method="POST">
              <h2>Login to your account</h2>
              <p>
                <?php echo $account->getError( Constants::$loginFailed); ?>
                <label for="loginUsername">Username</label>
                <input id="loginUsername" name="loginUsername" type="text" required placeholder="admin" value="<?php getInputValue('loginUsername'); ?>">
              </p>
              <p>
                <label for="loginPassword">Password</label>
                <input id="loginPassword" name="loginPassword" placeholder="admin" type="password" required value="<?php getInputValue('loginPassword'); ?>">
              </p>
              <button type="submit" name="loginButton">LOG IN</button>
              <div class="hasAccountText">
                <span id="hideLogin">Don't have Account. Register here!</span>
              </div>
            </form>



            <form id="registerform" action="register.php" method="POST">
              <h2>Create a NEW account</h2>
              <p>
                <?php echo $account->getError(Constants::$usernameCharacters); ?>
                <?php echo $account->getError(Constants::$usernameTaken); ?>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" required placeholder="username" value="<?php getInputValue('username'); ?>">
              </p>
              <p>
                <?php echo $account->getError(Constants::$passwordsDoNotMAtch); ?>
                <?php echo $account->getError(Constants::$passwordsNotAlphaNumeric); ?>
                <?php echo $account->getError(Constants::$passwordsCharacters); ?>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required placeholder="password" value="<?php getInputValue('password'); ?>">
              </p>
              <p>
                <label for="password2">Confirm Password</label>
                <input id="password2" name="password2" type="password" required  placeholder="password" value="<?php getInputValue('password2'); ?>">
              </p>
              <button type="submit" name="registerButton">Register</button>
              <div class="hasAccountText">
                <span id="hideRegister">Already! have Account. Login here!</span>
              </div>
            </form>
          </div>

          <div id="loginText">
            <h1>slutify</h1>
            <h2>only music. random music</h2>
            <ul>
              <li>dicover music for your favourite playlist</li>
              <li>search through songs easily</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
