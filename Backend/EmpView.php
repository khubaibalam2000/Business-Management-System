<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $employees = [];
    $sql= "SELECT * FROM employees";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $employees[$cr]['name'] = $row['name'];
            $employees[$cr]['department'] = $row['department'];
            $employees [$cr]['phone'] = $row['phone'];
            $employees[$cr]['email'] = $row['email'];
            $employees [$cr]['gender'] = $row['gender'];
            $employees [$cr]['hiredate'] = $row['hiredate'];
            $employees [$cr]['onboard'] = $row['onboard'];
            $employees [$cr]['salary'] = $row['salary'];
            $employees [$cr]['fuel'] = $row['fuel'];
            $employees [$cr]['E_id'] = $row['E_id'];
            $cr++;
        }
        // echo $employees;
        }
        echo json_encode($employees);
    }
    else {
        http_response_code(404);
    }
?>