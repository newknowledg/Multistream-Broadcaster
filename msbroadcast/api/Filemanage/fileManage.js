#!/usr/bin/nodejs

const fileS = require('fs');

 function rFile(){
    const Temp = fileS.readFileSync('Filemanage/template');
    fileS.writeFileSync('./Restream.conf', Temp);        
}

function eFile(){
    const Temp2 = fileS.readFileSync('Filemanage/template2');
    fileS.appendFileSync('./Restream.conf','\n'+ Temp2);
}

function aFile(des,key){
    var sKey = des + key
    fileS.appendFileSync('./Restream.conf',"\n" + sKey + ";\n");
}

module.exports = {rFile, eFile, aFile}
 
