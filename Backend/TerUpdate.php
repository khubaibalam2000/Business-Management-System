<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $id = $request->rec_id;
        $name = $request->name;
        $department = $request->department;
        $reason = $request->reason;
        $meet = $request->meet;
        
        
        $sql = "UPDATE termination SET  name = '$name' ,  department = '$department' ,  reason = '$reason',  meet = '$meet' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>