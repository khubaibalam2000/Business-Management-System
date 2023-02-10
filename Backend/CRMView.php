<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $crms = [];
    $sql= "SELECT * FROM crm";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $crms[$cr]['name'] = $row['name'];
            $crms[$cr]['requestID'] = $row['requestID'];
            $crms[$cr]['review'] = $row['review'];
            $crms [$cr]['rating'] = $row['rating'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($crms);
    }
    else {
        http_response_code(404);
    }
?>