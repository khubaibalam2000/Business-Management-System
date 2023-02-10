<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $position = $request->position;
        $department = $request->department;
        $exp = $request->exp;
        $qual = $request->qual;
        $minSal = $request->minSal;
        $maxSal = $request->maxSal;
    }
    echo $position." ".$department." ".$exp." ".$qual." ".$minSal." ".$maxSal;
    
    $sql = "INSERT INTO recruitment (position, department, exp, qual, minSal, maxSal) VALUES ('$position', '$department', '$exp', '$qual', '$minSal', '$maxSal')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>