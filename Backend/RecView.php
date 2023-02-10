<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $recruitments = [];
    $sql= "SELECT * FROM recruitment";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $recruitments[$cr]['position'] = $row['position'];
            $recruitments[$cr]['department'] = $row['department'];
            $recruitments [$cr]['exp'] = $row['exp'];
            $recruitments[$cr]['qual'] = $row['qual'];
            $recruitments [$cr]['minSal'] = $row['minSal'];
            $recruitments [$cr]['maxSal'] = $row['maxSal'];
            $recruitments [$cr]['requestID'] = $row['requestID'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($recruitments);
    }
    else {
        http_response_code(404);
    }
?>