<?php
    require  'connection.php' ;
    $postdata = file_get_contents("php://input");
    
    echo $postdata;
    if(isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        $id = $request->em_id;
        $name = $request->name;
        $gender = $request->gender;
        $hiredate = $request->hiredate;
        $onboard = $request->onboard;
        $department = $request->department;
        $salary = $request->salary;
        $phone = $request->phone;
        $email = $request->email;
        $fuel = $request->fuel;
        echo $hiredate;

        // $temp = explode(" ", $department);
        
        
        echo $name." ".$department." ".$phone." ".$email." ".$gender." ".$onboard." ".$salary." ".$fuel." ";
        $sql = "UPDATE employees SET  name = '$name' ,  department = '$department' ,  email = '$email',  phone = '$phone',  gender = '$gender',  onboard = '$onboard' ,  salary = '$salary' , hiredate = '$hiredate', fuel = '$fuel' WHERE  E_id = $id  LIMIT 1";

        if(mysqli_query($con, $sql)){
            http_response_code(204);
        } else {
            return http_response_code(422);
        }
    }
?>