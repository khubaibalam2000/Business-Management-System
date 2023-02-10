<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $name = $request->name;
        $sdate = $request->sdate;
        $edate = $request->edate;
        $descr = $request->descr;
        $department1 = $request->department1;
        $department2 = $request->department2;
        $department3 = $request->department3;
        
        $id = $request->rec_id;
        
        $sql = "UPDATE kpi SET name = '$name', sdate = '$sdate' ,  edate = '$edate', descr = '$descr' ,  department1 = '$department1', department2 = '$department2', department3 = '$department3' WHERE  requestID = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>