// 定义重复次数
//弹窗填入脚本循环次数
var tatalnums= prompt("请输入文件夹中不同类的详情页个数(要循环几次脚本)：", "3");
var repeatCount =tatalnums; // 将此值更改为需要的重复次数
//var repeatCount =3; // 将此值更改为需要的重复次数

// 动作集和动作名称
var actionSet = "自建"; // 替换为你的动作集名称
//var actionSet = "TEMP"; // 替换为你的动作集名称
var actionName = "高效拼合图片脚本"; // 替换为你的动作名称
//var actionName = "关闭所有打开文档"; // 替换为你的动作名称

// 开始执行动作
for (var i = 0; i < repeatCount; i++) {
    app.doAction(actionName, actionSet);
    alert("已执行"+(i+1)+"次长图合并脚本");
    
}

alert("动作已执行完毕！");