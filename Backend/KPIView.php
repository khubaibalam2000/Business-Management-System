<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $kpis = [];
    $sql= "SELECT * FROM kpi";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $kpis[$cr]['requestID'] = $row['requestID'];
            $kpis[$cr]['name'] = $row['name'];
            $kpis[$cr]['sdate'] = $row['name'];
            $kpis[$cr]['edate'] = $row['name'];
            $kpis[$cr]['descr'] = $row['name'];
            $kpis[$cr]['department1'] = $row['department1'];
            $kpis[$cr]['department2'] = $row['department2'];
            $kpis[$cr]['department3'] = $row['department3'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($kpis);
    }
    else {
        http_response_code(404);
    }
?>