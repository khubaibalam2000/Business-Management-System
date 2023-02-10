<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $trainings = [];
    $sql= "SELECT * FROM training";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $trainings[$cr]['topic'] = $row['topic'];
            $trainings[$cr]['department'] = $row['department'];
            $trainings [$cr]['date'] = $row['date'];
            $trainings[$cr]['trainer'] = $row['trainer'];
            $trainings [$cr]['requestID'] = $row['requestID'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($trainings);
    }
    else {
        http_response_code(404);
    }
?>