<?php

    require 'connection.php';
    $rec=$_GET['id'];
    echo $rec;
    $sql = "DELETE FROM termination WHERE requestID = $rec";
    if(mysqli_query($con, $sql)){
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
?>