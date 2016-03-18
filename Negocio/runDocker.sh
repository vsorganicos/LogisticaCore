#!/bin/bash
echo "#### Run Docker ####"
docker run --name logistica -p 3000:3000 -d vsorganicos/logistica:latest

echo "#### Docker Logs ####"
docker logs `docker ps -aq`
