/**
 * @param {Object} param
 * @param {String = workFlow} param.mainId 主窗口ID
 * @param {Boolean = true} param.editable 是否可编辑,控制header和tools
 * @param {number = 2000} param.winWidth 
 * @param {number = 1000} param.winHeight 
 */
function WorryFlow(param) {
  /**
   * 配置
   * ==========================================================================
   */
  var defaultParam = {
    mainId: 'workFlow',
    editable: true,
    data: {},
    winWidth: 2000,
    winHeight: 1000,
    strokeColor: '#5c96bc',
    tools: {
      'start': {
        type: 'start',
        icon: 'playcircle',
        shape: 'Diamond',
      },
      'end': {
        type: 'end',
        icon: 'stopcircle',
        shape: 'Diamond',
      },
      'task': {
        type: 'task',
        icon: 'account',
        shape: 'Rectangle',
      },
      'sign': {
        type: 'sign',
        icon: 'user-group',
        shape: 'Rectangle',
      },
      'auto': {
        type: 'auto',
        icon: 'account-plus',
        shape: 'Rectangle',
      },
      'fork': {
        type: 'fork',
        icon: 'gateway',
        shape: 'icon',
      },
      'join': {
        type: 'join',
        icon: 'gateway2',
        shape: 'Diamond',
      },
      'decision': {
        type: 'decision',
        icon: 'gateway1',
        shape: 'Diamond',
      }
    },

  }
  var config = _.assign({}, defaultParam, param);

  /**
   * 内部变量
   * ==========================================================================
   */
  var _mainDom = null; // 主窗口
  var _workDom = null; // 工作窗口
  var _workContentDom = null; //node区域
  var _lineContentDom = null; // line区域
  var _headerDom = null; // 头部按钮
  var _toolsDom = null; // 左侧拖拽源
  var _editDom = null; // 右侧编辑窗口
  var _headerToggleBtn = null; // 头部缩放按钮，缩放header和tools

  /**
   * 内部方法
   * ==========================================================================
   */

  //  是否使用SVG模式
  function isSvg() {
    //IE6,7,8不支持SVG，使用VML
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0 ||
      navigator.userAgent.indexOf("MSIE 7.0") > 0 ||
      navigator.userAgent.indexOf("MSIE 6.0") > 0) {
      return false;
    } else {
      return true;
    }
  };
  // TODO: 生成header 
  function _generateHeader() {
    if (!config.editable) {
      return
    }
    _headerDom = $('<div class="ww-header"></div>');
    // 切换按钮
    _headerToggleBtn = $('<div class="header-btn btn-toggle"></div>')
      .append($('<i class="iconfont icon-arrawsalt"></i><i class="iconfont icon-shrink"></i>'));
    _headerToggleBtn.on('click', function (e) {
      if (_headerToggleBtn.hasClass('active')) {
        $('.ww-header').css({
          width: 'auto',
        })
        $('.ww-tools').show();
        _headerToggleBtn.removeClass('active');
      } else {
        _headerToggleBtn.addClass('active');
        $('.ww-tools').hide();
        $('.ww-header').css({
          width: 40
        })
      }
    })
    _headerDom.append(_headerToggleBtn);
    // 其他按钮
  }
  // TODO: 生成tools
  function _generateTools() {
    if (!config.editable) {
      return
    }
    _toolsDom = $('<div class="ww-tools"></div>');
  }
  // TODO: 生成editor
  function _generateEditor() {
    if (!config.editable) {
      return
    }
    _editDom = $('<div class="ww-edit"></div>');

  }
  // 生成node的工作窗口
  function _generateWork() {
    _workDom = $('<div class="ww-work"></div>');
    _workContentDom = $('<div class="work-content"></div>').css({
      minWidth: config.winWidth,
      minHeight: config.winHeight
    })
    if (isSvg()) {
      _lineContentDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      _lineContentDom.setAttribute('class', 'line-content')
    } else {
      _lineContentDom = document.createElement("div");
      $(_lineContentDom).css({
        overflow: 'visible',
        position: 'absolute',
        top: 0,
        left: 0,
      })
    }

    _workDom.append(_workContentDom, _lineContentDom)
  }
  // 生成main
  function _generateMain() {
    _generateHeader()
    _generateTools()
    _generateEditor()
    _generateWork()

    _mainDom = $('#' + config.mainId).addClass('ww-main');
    _mainDom.append(_headerDom, _toolsDom, _editDom, _workDom)
  }
  // 读取数据
  function _loadFlowData() {
    _.forEach(config.data.nodes, function (node) {
      _addNode(node);
    })
    _.forEach(config.data.lines, function (line) {
      _addLine(line)
    })
  }
  // 添加node节点
  function _addNode(node) {
    var n = $('<div class="w" id="' + node.nodeKey + '"></div>');
    n.append('<i class="iconfont icon-' + config.tools[node.nodeType].icon + '"></i><div class="node-text">' + node.displayName + '</div>')
    n.addClass(config.tools[node.nodeType]['shape']);
    n.css({
      left: node.left,
      top: node.top,
    })
    _workContentDom.append(n);
  }
  // 添加线
  function _addLine(line) {
    var source = _getAnchorPosition(line.source);
    var target = _getAnchorPosition(line.target);

    var x = source.centerX - target.centerX;
    var y = source.centerY - target.centerY;
    // 锚点坐标
    var sourceAnchor = null;
    var targetAnchor = null;
    var horizontal = true;

    if (Math.abs(x) > Math.abs(y)) {
      horizontal = true;
      sourceAnchor = {
        x: x > 0 ? source.left : source.right,
        y: source.centerY,
        position: x > 0 ? 'left' : 'right',
      };
      targetAnchor = {
        x: x > 0 ? target.right : target.left,
        y: target.centerY,
        position: x > 0 ? 'right' : 'left',
      };
    } else {
      horizontal = false;
      sourceAnchor = {
        x: source.centerX,
        y: y > 0 ? source.top : source.bottom,
        position: y > 0 ? 'top' : 'bottom',
      };
      targetAnchor = {
        x: target.centerX,
        y: y > 0 ? target.bottom : target.top,
        position: y > 0 ? 'bottom' : 'top',
      };
    }
    // line 中心点坐标
    var centerPoint = {
      x: (sourceAnchor.x + targetAnchor.x) / 2,
      y: (sourceAnchor.y + targetAnchor.y) / 2,
    }

    if (isSvg()) {
      // 线条
      var d = 'M' + sourceAnchor.x + ',' + sourceAnchor.y
      // 横向和竖向
      if (horizontal) {
        d += 'L' + centerPoint.x + ',' + sourceAnchor.y;
        d += 'L' + centerPoint.x + ',' + targetAnchor.y;
        d += 'L' + targetAnchor.x + ',' + targetAnchor.y;
      } else {
        d += 'L' + sourceAnchor.x + ',' + centerPoint.y;
        d += 'L' + targetAnchor.x + ',' + centerPoint.y;
        d += 'L' + targetAnchor.x + ',' + targetAnchor.y;
      }
      // 箭头
      var a = 'M' + targetAnchor.x + ',' + targetAnchor.y;
      if (targetAnchor.position == 'top') {
        a += 'l6,-12l-12,0,l6,12'
      } else if (targetAnchor.position == 'bottom') {
        a += 'l6,12l-12,0l6,-12'
      } else if (targetAnchor.position == 'right') {
        a += 'l12,6l0,-12l-12,-6'
      } else if (targetAnchor.position == 'left') {
        a += 'l-12,-6l0,12l12,-6'
      }

      var l = document.createElementNS("http://www.w3.org/2000/svg", "g");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      var anchor = document.createElementNS("http://www.w3.org/2000/svg", "path");

      path.setAttribute("d", d);
      path.setAttribute("stroke-width", 2);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", config.strokeColor);

      anchor.setAttribute("d", a);
      anchor.setAttribute("fill", config.strokeColor);

      l.appendChild(path);
      l.appendChild(anchor);
      _lineContentDom.appendChild(l)
    } else {
      var poly = document.createElement("v:polyline");
      var d = sourceAnchor.x + ',' + sourceAnchor.y;
      // 横向和竖向
      if (horizontal) {
        d += ' ' + centerPoint.x + ',' + sourceAnchor.y;
        d += ' ' + centerPoint.x + ',' + targetAnchor.y;
        d += ' ' + targetAnchor.x + ',' + targetAnchor.y;
      } else {
        d += ' ' + sourceAnchor.x + ',' + centerPoint.y;
        d += ' ' + targetAnchor.x + ',' + centerPoint.y;
        d += ' ' + targetAnchor.x + ',' + targetAnchor.y;
      }
      poly.points.value = d;
      poly.strokeWeight = "2";
      poly.stroke.EndArrow = "Block";
      poly.strokeColor = config.strokeColor;

      _lineContentDom.appendChild(poly)
    }

    // 文字
    if (line.data.displayName) {
      var text = $('<div class="label"></div>').text(line.data.displayName);
      _workContentDom.append(text);
      var textWidth = text.width();
      var textHeight = text.height();
      text.css({
        left: centerPoint.x - textWidth / 2,
        top: centerPoint.y - textHeight / 2,
      })
    }
  }
  // 获取node的四个点
  function _getAnchorPosition(nodeKey) {
    var width = $('#' + nodeKey).width();
    var height = $('#' + nodeKey).height();
    var nodeData = _.find(config.data.nodes, function (node) {
      return node.nodeKey == nodeKey
    })
    return {
      left: nodeData.left,
      top: nodeData.top,
      right: nodeData.left + width,
      bottom: nodeData.top + height,
      centerX: nodeData.left + width / 2,
      centerY: nodeData.top + height / 2,
    }
  }

  /**
   * 初始化
   * ==========================================================================
   */
  // 生成框架dom
  _generateMain()
  // 如果有数据，加载数据
  if (!_.isEmpty(config.data)) {
    console.log(config.data)
    _loadFlowData();
  }

}
