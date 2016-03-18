#!/bin/bash

echo "######### Stopping Docker Container #########"
docker stop `docker ps -aq`

echo "######### Destroying Docker Container #########"
docker rm `docker ps -aq`
