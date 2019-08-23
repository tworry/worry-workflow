var jsonParam = {
  "title": "flowDesign_flow1000000794",
  "nodes": {
    "start_flow000000001000": {
      "nodeId": "start",
      "node_desc": "集团客户认定流程-开始",
      "name": "start",
      "left": 106,
      "top": 81,
      "type": "start round",
      "have_idea": "null",
      "sendback_node": "null",
      "next_flow_key": "flow000000001001",
      "width": 24,
      "height": 24,
      "alt": true,
      "isNew": false
    },
    "0009_flow000000001001": {
      "nodeId": "0009",
      "node_desc": "集团客户认定流程-客户经理组主管",
      "name": "客户经理组主管",
      "left": 217,
      "top": 83,
      "type": "node",
      "have_idea": "1|4|5|",
      "sendback_node": "0040",
      "next_flow_key": "flow000000003555",
      "width": 24,
      "height": 24,
      "alt": true,
      "isNew": false
    },
    "9012_flow000000003556": {
      "nodeId": "9012",
      "node_desc": "集团客户认定流程-公司部主办",
      "name": "公司部主办",
      "left": 524,
      "top": 108,
      "type": "node",
      "have_idea": "1|3|4|5|",
      "sendback_node": "0011",
      "next_flow_key": "end",
      "width": 24,
      "height": 24,
      "alt": true,
      "isNew": false
    },
    "0011_flow000000003555": {
      "nodeId": "0011",
      "node_desc": "集团客户认定流程-风管部主办",
      "name": "风管部主办",
      "left": 395,
      "top": 96,
      "type": "node",
      "have_idea": "1|3|4|5|",
      "sendback_node": "0009",
      "next_flow_key": "flow000000003556",
      "width": 24,
      "height": 24,
      "alt": true,
      "isNew": false
    },
    "end": {
      "nodeId": "end",
      "name": "end",
      "left": 475,
      "top": 176,
      "type": "end round",
      "width": 24,
      "height": 24,
      "alt": true
    }
  },
  "lines": {
    "flow000000001000_0": {
      "type": "sl",
      "from": "start_flow000000001000",
      "to": "0009_flow000000001001",
      "name": "",
      "alt": true
    },
    "flow000000001001_0": {
      "type": "sl",
      "from": "0009_flow000000001001",
      "to": "0011_flow000000003555",
      "name": "",
      "alt": true
    },
    "flow000000003556_0": {
      "type": "sl",
      "from": "9012_flow000000003556",
      "to": "end",
      "name": "",
      "alt": true
    },
    "flow000000003555_0": {
      "type": "sl",
      "from": "0011_flow000000003555",
      "to": "9012_flow000000003556",
      "name": "",
      "alt": true
    }
  },
  "area": {},
  "initNum": 4
};
