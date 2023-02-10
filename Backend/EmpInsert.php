<?php
    require 'connection.php';
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->name;
        $department = $request->department;
        $email = $request->email;
        $phone = $request->phone;
        $gender = $request->gender;
        $hiredate = $request->hiredate;
        $onboard = $request->onboard;
        $salary = $request->salary;
        $fuel = $request->fuel;
    }
    $date=date_create($hiredate);
    $hiredate = date_format($date,"Y-m-d");
    echo $name." ".$department." ".$phone." ".$email." ".$gender." ".$hiredate." ".$onboard." ".$salary." ".$fuel." ";
    
    $sql = "INSERT INTO employees (name, department, email, phone, gender, hiredate, onboard, salary, fuel) VALUES ('$name', '$department', '$email', '$phone', '$gender', '$hiredate', '$onboard', '$salary', '$fuel')";

    if(mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
?>