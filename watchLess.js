// 编译less
const watch = require('node-watch');
const exec = require('child_process').exec;

console.log('watching the less files');

watch('src/style/less', { recursive: true }, function(evt, name) {
  exec("lessc --js src/style/less/index.less src/style/style.css", function(error, stdout, stderr){
     error && console.log(error);
     stdout && console.log(stdout);
     stderr && console.log(stderr);
  });
});
