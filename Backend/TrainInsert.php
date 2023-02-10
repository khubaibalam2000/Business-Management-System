<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $topic = $request->topic;
        $department = $request->department;
        $date = $request->date;
        $trainer = $request->trainer;
    }
    echo $topic." ".$department." ".$date." ".$trainer;
    
    $sql = "INSERT INTO training (topic, department, date, trainer) VALUES ('$topic', '$department', '$date', '$trainer')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>