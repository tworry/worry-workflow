function formatData(data) {
  var nodes = data.nodes;
  // 把lines独立出来
  var lines = [];
  // 偏移基数
  var offsetLeft = 50;
  var offsetTop = 50;
  var left = Infinity;
  var top = Infinity;
  _.forEach(nodes, function (n) {
    _.forEach(n.outputs, function (l) {
      lines.push({
        source: n.nodeKey,
        target: l.targetNodeKey,
        data: l
      })
    })
    // 计算最左最上
    var position = n.position.split(',');
    n.left = Number(position[0]);
    n.top = Number(position[1]);
    if (n.left < left) {
      left = n.left;
    }
    if (n.top < top) {
      top = n.top;
    }
  })
  data.lines = lines;
  // 统一更改位置
  _.forEach(nodes, function (n) {
    n.left = n.left - left + offsetLeft;
    n.top = n.top - top + offsetTop;
  })
  return data;
}
