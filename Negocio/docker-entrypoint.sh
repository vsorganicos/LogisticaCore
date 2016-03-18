#!/bin/bash
#echo "####### Installing PM2 Module ####### "
#npm install pm2 -g
#echo "####### Installing Dependencies ####### "
#npm install

echo "####### Starting App ####### "
pm2 start index.js -i 2
