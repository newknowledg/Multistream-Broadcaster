const fBook = 'push rtmp://127.0.0.1:1936/rtmp/'
const yTube = 'push rtmp://a.rtmp.youtube.com/live2/'
const twitch = 'push '
const peris = 'exec /usr/bin/ffmpeg -i rtmp://127.0.0.1/live/$name -crf 30 -preset ultrafast -acodec aac -strict experimental -ar 44100 -ac 2 -b:a 64k -vcodec libx264 -x264-params keyint=60:no-scenecut=1 -r 30 -b:v 500k -s 960x540 -f flv rtmp://ca.pscp.tv:80/x/'
const injButt = document.getElementById("inject")
const rejButt = document.getElementById("reject")
const addButt = document.getElementById("addS") 

function emit(){
  var tskey = document.getElementsByClassName("s_key");
      tdest = document.getElementsByClassName("dest");
  var skey = []
      fdest = []
      
  for (var i = 0; i < tskey.length; i++){
         if (tdest[i].value == 'fb'){
          skey.push(fBook);}
         else if (tdest[i].value == 'yt'){
             skey.push(yTube);
         }
         else if (tdest[i].value == 'pr'){
             skey.push(peris);
         }
         else { 
             skey.push(twitch);
         }
         skey.push(tskey[i].value);
  }; 
   fetch('http://${receive}:4000/stream', { method: 'POST', headers:     {'content-type':'application/json'}, body: JSON.stringify(skey)})
   injButt.disabled = true;
   addButt.disabled = true;

}
  function addLoc(){
          var temp = document.getElementById("tempd").content;
          var copy = document.importNode(temp,true);
          document.getElementById("app").appendChild(copy);
  }
  function delLine(e){
          if(e.target.classList.contains("delButt")){
                  e.target.parentElement.remove();
          }
  }
function reneg(){
   var skey = []
   fetch('http://${receive}:4000/stream', { method: 'POST', headers:     {'content-type':'application/json'}, body: JSON.stringify(skey)})
  injButt.disabled = false
  addButt.disabled = false
      
}

document.getElementById("inject").addEventListener("click", emit)
document.getElementById("reject").addEventListener("click", reneg);
document.getElementById("addS").addEventListener("click", addLoc);
document.getElementById("app").addEventListener("click", delLine);



