<?php
	for ($i = 0; $i < 6; $i++)
	{
		$num = rand(1,42);
		echo("Lottery Number ".($i+1) . ": ".$num);
		echo("<br/>");
	}
?>