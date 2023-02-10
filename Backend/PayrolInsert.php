<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    echo $postdata;
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $increment = $request->inc;
        $bonus = $request->bon;
        $id = $request->rec_id;
    }
    echo $increment." ".$bonus;
    $total = $increment + $bonus;
    $sql = "UPDATE employees SET salary = '$total' WHERE  E_id = $id  LIMIT 1";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>