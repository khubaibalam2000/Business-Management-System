<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->name;
        $department = $request->department;
        $reason = $request->reason;
        $meet = $request->meet;
    }
    echo $name." ".$department." ".$reason." ".$meet;
    
    $sql = "INSERT INTO termination (name, department, reason, meet) VALUES ('$name', '$department', '$reason', '$meet')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>