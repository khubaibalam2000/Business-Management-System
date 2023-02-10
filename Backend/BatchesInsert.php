<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);  

        $name = $request->name;
        $bs = $request->bs;
        $rs = $request->rs;
    }
    echo $name." ".$bs." ".$rs;
    
    $sql = "INSERT INTO batches (name, bs, rs) VALUES ('$name', '$bs', '$rs')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>