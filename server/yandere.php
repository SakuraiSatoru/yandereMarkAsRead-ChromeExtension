<?php
header("content-type:application/json; charset:utf-8");
$rawData = file_get_contents("php://input");
$pNum = explode(",",$rawData);
$handle = fopen("history.txt", "a");
fclose($handle);
$handle = fopen("history.txt", "r+");
$line = fgets($handle);
$re = "";
if($pNum){
	$arrlength=count($pNum);
	for($x=0;$x<$arrlength;$x++) {
		if(strpos($line, $pNum[$x]) === 0 or strpos($line, $pNum[$x]) > 0){
			$re = $re."1";
		}else{
			$re = $re."0";
			fwrite($handle, ",".$pNum[$x]);
	  };
	};
}
fclose($handle);
exit(json_encode(array ('access'=>$re)));
?>
