#!/bin/bash

echo "Number of queens = $1"
echo "Number of workers = $2"
echo "NodeJs code = $3"

rm res.txt

PIDS=()

solutions=0
num_possibilities=1
for ((i=0;i<$1;i++))
do
	num_possibilities=$(($num_possibilities*$1))
done

from=0
to=0
step=$(($num_possibilities/$2))
tmp=$(($step*$2))
rest=$(($num_possibilities-$tmp))
for ((i=0;i<$2;i++))
do	
	to=$(($from+$step))
	if [ $i -eq $(($2-1)) ]
	then
		to=$(($to+$rest))	
	fi

	echo "Starting worker $i (from=$from, to=$to)..."
	node $3 $1 $from $to >> res.txt &
	PIDS+=( $! )

	from=$(($from+$step))
done


echo "Waiting for all workers..."
for ((i=0;i<$2;i++))
do
	wait ${PIDS[$i]}
done

re='^[0-9]+$'
mapfile -t numbers < res.txt
for n in "${numbers[@]}"; do
	if [[ $n =~ $re ]]
	then
		(( sum += n ))
	fi
done
echo "Found solutions: $sum"
