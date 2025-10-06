<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=aipostjob','root','');
foreach($pdo->query('SHOW TABLES') as $row){
    echo $row[0] . PHP_EOL;
}
