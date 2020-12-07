    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
window.g= {
    //rootPath:localhostPaht+projectName+'/'
	rootPath:'http://192.168.1.112:8011/zjmes/'
}