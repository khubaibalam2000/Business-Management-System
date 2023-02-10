<?php

    require 'connection.php';
    $E_id=$_GET['id'];
    // echo $id;
    $sql = "DELETE FROM employees WHERE E_id = $E_id";
    if(mysqli_query($con, $sql)){
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
?>