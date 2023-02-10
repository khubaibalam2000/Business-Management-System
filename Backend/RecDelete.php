<?php

    require 'connection.php';
    $rec=$_GET['id'];
    // echo $id;
    $sql = "DELETE FROM recruitment WHERE requestID = $rec";
    if(mysqli_query($con, $sql)){
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
?>