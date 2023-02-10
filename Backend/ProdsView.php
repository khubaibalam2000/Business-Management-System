<?php
    require 'connection.php'; 
    error_reporting(E_ERROR);
    $prods = [];
    $sql= "SELECT * FROM products";
    if($result = mysqli_query($con, $sql)) {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result)) {        { 
            $prods[$cr]['name'] = $row['name'];
            $prods[$cr]['bi'] = $row['bi'];
            $prods [$cr]['br'] = $row['br'];
            $prods[$cr]['sales'] = $row['sales'];
            $prods [$cr]['requestID'] = $row['requestID'];
            $cr++;
        }
        // echo $recruitments;
        }
        echo json_encode($prods);
    }
    else {
        http_response_code(404);
    }
?>