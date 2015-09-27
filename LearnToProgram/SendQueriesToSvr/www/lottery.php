<?php
	$numNumbers = $_REQUEST['num'];
	$maxValue = $_REQUEST['max'];
	
	for($i=0; $i<$numNumbers; $i++)
	{
		$num = rand(1,$maxValue);
		echo("Lottery Number " . ($i+1). ": " . $num);
		echo("<br/>");
	}
?>