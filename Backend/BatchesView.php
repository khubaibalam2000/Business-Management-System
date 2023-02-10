<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $batch = [];
    $sql= "SELECT * FROM batches";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $batch[$cr]['name'] = $row['name'];
            $batch[$cr]['requestID'] = $row['requestID'];
            $batch[$cr]['bs'] = $row['bs'];
            $batch [$cr]['rs'] = $row['rs'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($batch);
    }
    else {
        http_response_code(404);
    }
?>