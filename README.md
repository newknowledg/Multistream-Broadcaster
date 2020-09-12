# Multistream-Broadcaster

Multistream-Broadcaster uses the Nginx RTMP library to enable users to rebroadcast RTMP streams to as many destinations as the user chooses.

Through a web interface users are able to dynamically change the target destination of the streams.

## Installation 

The installation file is designed to run on Debian based systems

* git clone https://github.com/newknowledg/Multistream-Broadcaster.git
* cd Multistream-Broadcaster
* sudo ./install.sh

## Run

To ensure privacy the web interface of Multistream-Broadcaster was designed to be accessed via SSH Local Forwarding

* ssh -L 1234:localhost:80 remoteuser@remoteserver
Port 1234 designates the local port that will be forwarding to the http port of your remote server. You can change this port to any number you wish

* In a web browser enter http://localhost:1234/msbroadcast

Here you will be brought to the web interface. You will be able to add as many rebroadcast streams as you like. No limit has been placed on the amount.
You are able to stream to multiple targets on the same platform, exception being Facebook as we are only able to stream to one Facebook destination at a time.

* Select your platform and place the streamkey into the input field

Twitch users must place the url and streamkey int the input field

* Click button Prepare Stream

* Connect your streaming device to rtmp://{server url}:1935/live

You should not connect to your streaming device before clicking Prepare Stream as doing so will disconnect your streaming device forcing you to reconnect.

Mulistream-Broadcaster was not designed to be accessed when seperated from users and placed behind an NAT. 
When user and Multistream-Broadcaster are both behind NAT no issue will arise. However if the user wishes to access Multistream-Broadcaster from outside of NAT
the app will not work.
