<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $name = $request->name;
        $id = $request->rec_id;
        $review = $request->review;
        $rating = $request->rating;
        
        
        $sql = "UPDATE crm SET name = '$name', review = '$review' ,  rating = '$rating' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>