UE.registerUI('预设格式',function(editor,uiName){
    //注册按钮执行时的command命令,用uiName作为command名字，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(cmdName,value){
        }
    });


    //创建下拉菜单中的键值对，这里我用字体大小作为例子
    var items = []
        , ci = [
            {tag:'span', name:'span', label:'正文', style:'text-align: center;color:#333;font-family: "Microsoft Yahei";', class:'text-normal', style2:'font-size:16px;color:#333;font-family: "Microsoft Yahei";', type:'color:context'},
            {tag:'span', name:'tl',label:'大标题', style:'text-align: center;color:#a41d1d;font-weight:700;font-family: "Microsoft Yahei";', class:'text-big-title', style2:'font-size:20px;color:#a41d1d;font-family: "Microsoft Yahei";', type: 'color:bigHead'},
            {tag:'span', name:'tl',label:'小标题', style:'text-align: center;color:#a41d1d;font-weight:700;font-family: "Microsoft Yahei";', class:'text-sm-title', style2:'font-size:18px;color:#a41d1d;font-family: "Microsoft Yahei";', type: 'color:smallHead'},
            //{tag:'span',name:'im', label:'云酒注', style:'text-align: center;color:#999;font-family:"Microsoft Yahei";',  class:'text-hxzhu',style2:'font-size:16px;color:#999;font-family:"Microsoft Yahei";', type: 'color:hxnote'},
            {tag:'span',name:'hi', label:'备注', style:'text-align: center;color:#999;font-family:"Microsoft Yahei";', class:'text-remarks',style2:'font-size:16px;color:#999;font-family:"Microsoft Yahei";', type: 'color:remarks'}
        ];

    for(var i= 0;ci[i++];){
//        console.log(editor.queryCommandValue('customstyle'))
        items.push({
            //显示的条目
            label:ci[i-1].label,
            //选中条目后的返回值
            value:ci[i-1].style2,
            val:ci[i-1].style,
            tag:ci[i-1].tag,
            class: ci[i-1].class,
            //针对每个条目进行特殊的渲染
            renderLabelHtml:function () {
                //这个是希望每个条目的字体是不同的
                return '<div class="edui-label %%-label" style="line-height:2;font-size:16px;' +
                    this.val + '">' + (this.label || '') + '</div>';
            }
        });
    }
    //创建下来框
    var combox = new UE.ui.Combox({
        //需要指定当前的编辑器实例
        editor:editor,
        //添加条目
        items:items,
        //当选中时要做的事情
        onselect:function (t, index) {
            //拿到选中条目的值
//            editor.execCommand(uiName, items[index]);
            var range = editor.selection.getRange();

            range.removeInlineStyle(["em"]);
            range.removeInlineStyle(["strong"]);
            range.removeInlineStyle(["span"]);

//            range.applyInlineStyle(this.items[index].tag, {"style":this.items[index].value});

            /*var node = editor.selection.getStart();
            node.setAttribute('label', items[index].label);
            node.setAttribute('class', items[index].class);*/
            /*if(items[index].label == '大标题' || items[index].label == '小标题'){
             range.applyInlineStyle("strong");
             }*/


            if(this.items[index].class == 'text-hxzhu' || this.items[index].class == 'text-remarks'){
                range.applyInlineStyle(this.items[index].tag, {"class":this.items[index].class});
                var node = editor.selection.getStart();
                node.setAttribute('label', items[index].label);
            }else{
                range.traversal(function(node){
                    if(node.nodeType === 1){
                        node.setAttribute('label', items[index].label);
                        node.setAttribute('class', items[index].class);
                    }
                });
                var node = editor.selection.getStart();
                node.setAttribute('label', items[index].label);
                node.setAttribute('class', items[index].class);
            }





//            console.log( range.cloneContents() );

        },
        //提示
        title:uiName,
        //当编辑器没有焦点时，combox默认显示的内容
        initValue:uiName
    });

    editor.addListener('selectionchange', function (type, causeByUi, uiReady) {
        if (!uiReady) {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                combox.setDisabled(true);
            } else {
                combox.setDisabled(false);

//                editor.selection.getRange().traversal(function(node){
//                    console.log(node.nodeType)
//                    if(node.nodeType == 1){
//                        console.log(node);
//                        console.log(node.getAttribute('label'))
//                        for(var i=0; i < items.length; i++){
//                            if(node.getAttribute('label') == items[i].label){
//                                combox.setValue(items[i].label);
//                            }
//                        }
//                    }
//
//                })
                var node = editor.selection.getStart();
                var flag = false;//判断是否自定义中规定的那几种样式
                if(node.getAttribute('label') != null){
                    for(var i=0; i < items.length; i++){
                        if(node.getAttribute('label') == items[i].label){
                            combox.setValue(items[i].label);
                            flag = true;
                        }
                    }
                }
                if(!flag){
                    combox.setValue(uiName);
                }
            }
        }

    });
    return combox;
},4/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);