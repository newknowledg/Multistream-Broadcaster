#!/usr/bin/nodejs

const fileS = require('fs');

 function rFile(){
    const Temp = fileS.readFileSync('template');
    fileS.writeFileSync('Restream.conf', Temp);        
}

function eFile(){
    const Temp2 = fileS.readFileSync('template2');
    fileS.appendFileSync('Restream.conf','\n'+ Temp2);
}

function aFile(des,key){
    var sKey = des + key
    fileS.appendFileSync('Restream.conf',"\n" + sKey + ";\n");
}

module.exports = {rFile, eFile, aFile}
 
