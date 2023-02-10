<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $name = $request->name;
        $id = $request->rec_id;
        $bs = $request->bs;
        $rs = $request->rs;
        
        
        $sql = "UPDATE batches SET name = '$name', bs = '$bs' ,  rs = '$rs' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>