<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $id = $request->rec_id;
        $topic = $request->topic;
        $department = $request->department;
        $date = $request->date;
        $trainer = $request->trainer;
        
        
        $sql = "UPDATE training SET  topic = '$topic' ,  department = '$department' ,  date = '$date',  trainer = '$trainer' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>