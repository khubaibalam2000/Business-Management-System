<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->name;
        $review = $request->review;
        $rating = $request->rating;
    }
    echo $name." ".$review." ".$rating;
    
    $sql = "INSERT INTO crm (name, review, rating) VALUES ('$name', '$review', '$rating')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>