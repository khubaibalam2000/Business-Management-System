<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->name;
        $bi = $request->bi;
        $br = $request->br;
        $sales = $request->sales;
    }
    echo $name." ".$bi." ".$br." ".$sales;
    
    $sql = "INSERT INTO products (name, bi, br, sales) VALUES ('$name', '$bi', '$br', '$sales')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>