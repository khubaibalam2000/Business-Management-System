<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $terminations = [];
    $sql= "SELECT * FROM termination";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $terminations[$cr]['name'] = $row['name'];
            $terminations[$cr]['department'] = $row['department'];
            $terminations [$cr]['reason'] = $row['reason'];
            $terminations[$cr]['meet'] = $row['meet'];
            $terminations [$cr]['requestID'] = $row['requestID'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($terminations);
    }
    else {
        http_response_code(404);
    }
?>