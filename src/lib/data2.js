var json = {
  "flowKey": "d0f61131b1cc48ceacbbc4a50f49934c",
  "displayName": "流程名称",
  "stepDrawFlag": "1",
  "nodes": [{
      "displayName": "开始",
      "nodeType": "start",
      "position": "-227,177",
      "nodeKey": "26af6db8a3754b96a177c82ee022654c",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "546c7f307933488fa4709acf3278896e",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "金额",
      "nodeType": "decision",
      "position": "399,13",
      "nodeKey": "d548811a1a5343d5b7bfea785ce43346",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
          "targetNodeKey": "e181cc37f4e54911a1f8af89fab61a11",
          "expType": "2",
          "expr": "${app_amt<=500000}",
          "displayName": "50万（含）以下"
        },
        {
          "targetNodeKey": "7aaa3b63a17d4cfda209719f5912bc81",
          "expType": "2",
          "expr": "${app_amt<5000000 && app_amt > 500000}",
          "displayName": "50万至500万"
        }
      ]
    },
    {
      "displayName": "会签一",
      "nodeType": "sign",
      "position": "625,-83",
      "nodeKey": "e181cc37f4e54911a1f8af89fab61a11",
      "allowAccessNodes": "",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "0723d4e9aa314d0cb13d066a87b6394e",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "会签二",
      "nodeType": "sign",
      "position": "401,177",
      "nodeKey": "7aaa3b63a17d4cfda209719f5912bc81",
      "allowAccessNodes": "",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "0723d4e9aa314d0cb13d066a87b6394e",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "聚合节点",
      "nodeType": "join",
      "position": "857,176",
      "nodeKey": "0723d4e9aa314d0cb13d066a87b6394e",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "432e2db6c4784003b800a640d384c831",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "会签三",
      "nodeType": "sign",
      "position": "399,368",
      "nodeKey": "9c307b5e661748f691ad1cef7175102c",
      "allowAccessNodes": "",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "0723d4e9aa314d0cb13d066a87b6394e",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "综合确认岗",
      "nodeType": "task",
      "position": "857,310",
      "nodeKey": "432e2db6c4784003b800a640d384c831",
      "dispatcher": "0",
      "allowAccessNodes": "",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
        "targetNodeKey": "6a2e0294c3eb4995b1837bf8725a865c",
        "expType": "",
        "expr": "",
        "displayName": ""
      }]
    },
    {
      "displayName": "结束",
      "nodeType": "end",
      "position": "858,484",
      "nodeKey": "6a2e0294c3eb4995b1837bf8725a865c",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [

      ]
    },
    {
      "displayName": "担保方式",
      "nodeType": "decision",
      "position": "-19,176",
      "nodeKey": "546c7f307933488fa4709acf3278896e",
      "callbackBean": "",
      "appIdeaOptions": "430012001,430012004,430012005",
      "postInterceptors": "",
      "postNodeInitInterceptors": "",
      "preInterceptors": "",
      "preNodeInitInterceptors": "",
      "outputs": [{
          "targetNodeKey": "d548811a1a5343d5b7bfea785ce43346",
          "expType": "2",
          "expr": "${flow:contains(\"001005 001008\",vou_type)}",
          "displayName": "股票/基金+信托受益权"
        },
        {
          "targetNodeKey": "9c307b5e661748f691ad1cef7175102c",
          "expType": "2",
          "expr": "${flow:contains(\"001001 001002 001003 001004 001006 001007\",vou_type)}",
          "displayName": "现金及其等价物 贵金属 债券 票据 保单 理财产品"
        }
      ]
    }
  ]
}
