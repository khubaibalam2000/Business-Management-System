<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $id = $request->rec_id;
        $position = $request->position;
        $department = $request->department;
        $exp = $request->exp;
        $qual = $request->qual;
        $minSal = $request->minSal;
        $maxSal = $request->maxSal;
        
        
        echo $id." ".$department." ".$exp." ".$qual." ".$minSal." ".$maxSal;
        $sql = "UPDATE recruitment SET  position = '$position' ,  department = '$department' ,  exp = '$exp',  qual = '$qual',  minSal = '$minSal',  maxSal = '$maxSal' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>