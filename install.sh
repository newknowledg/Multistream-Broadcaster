#!/bin/bash

apt install update
apt install build-essential libpcre3 libpcre3-dev libssl-dev nginx libnginx-mod-rtmp ffmpeg stunnel4 node.js npm -y

cp -r ./msbroadcast /var/www/

echo "moved files to /var/www/msbroadcast"
check="$(awk '/msbroadcast/' /etc/nginx/nginx.conf)"
ccheck="include /var/www/msbroadcast/api/Restream.conf;"
if [ "$check" == "$ccheck" ]
    then 
    echo "configuration already exist"
    else
    echo "include /var/www/msbroadcast/api/Restream.conf;" >> /etc/nginx/nginx.conf
    echo "wrote to nginx.conf"
fi

groupadd msbroadcast
useradd -M -g msbroadcast msbroadcast
echo  "%msbroadcast ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/msbroadcast
export receive=$(hostname -I| xargs)
envsubst < msbroadcast/main.js > /var/www/msbroadcast/main.js

cat  stunnel.tmp > /etc/stunnel/stunnel.conf
cat appservice.tmp > /etc/systemd/system/msbroadcast.service
cat site.tmp > /etc/nginx/sites-enabled/msbroadcast
cd /var/www/msbroadcast/api
chmod 0666 Restream.conf
npm install
systemctl start msbroadcast
systemctl enable msbroadcast


