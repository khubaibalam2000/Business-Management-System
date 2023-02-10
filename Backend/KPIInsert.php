<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->name;
        $sdate = $request->sdate;
        $edate = $request->edate;
        $descr = $request->descr;
        $department1 = $request->department1;
        $department2 = $request->department2;
        $department3 = $request->department3;
    }
    echo $name." ".$sdate." ".$edate;
    
    $sql = "INSERT INTO kpi (name, sdate, edate, descr, department1, department2, department3) VALUES ('$name', '$sdate', '$edate', '$descr', '$department1', '$department2', '$department3')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>