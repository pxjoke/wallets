#!/bin/bash
nohup npm start -D
sleep 5
robot -d /app/testbundles/test/out /app/testbundles/test/*.robot