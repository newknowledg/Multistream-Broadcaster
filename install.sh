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

# check to see if using FQDN
fqdn=0
echo "Will you be using a domain name (y/n)"
while [ $fqdn -eq 0 ]
    do
        read ans
        if [ $ans == "y" ] || [ $ans == "Y" ]
            then

            echo "please input the website url"
            while [ $fqdn -eq 0 ]
                do
                read URL
                DCHECK=${URL: -4}
                if [[ $DCHECK =~ '.' ]]  && [[ $URL =~ ^[a-z0-9.-]+$ ]]
                    then
                    sed -i -e 's/%url%/$URL/g' /etc/nginx/sites-enabled/msbroadcast
                    mv /etc/nginx/sites-enabled/$URL
                    fqdn=1
                    else
                        echo "please input a fully qualified domain name"
                fi
                done
        elif [ $ans == "n" ] || [ $ans == "N" ]
            then
            sed -i -e 's/%url%/127.0.0.1/g' /etc/nginx/sites-enabled/msbroadcast
            fqdn=1
        else
          #  then
            echo "Please input valid response (y/n)"
        fi
    done

groupadd msbroadcast
useradd -rM -s /bin/false -g msbroadcast msbroadcast
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


