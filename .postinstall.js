const fs = require('fs');

function createSymlink(source, target){
    fs.exists(target,function(e){e||fs.symlinkSync(source,target,'dir')});

}

//createSymlink('../main', 'node_modules/main');
//createSymlink('../integration-tests', 'node_modules/integration-tests');
