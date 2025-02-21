// 获取当前文档
var doc = app.activeDocument;
// 递归函数用于遍历所有图层并记录它们的宽度
function traverseLayers(layerOrGroup) {
        var bounds = layerOrGroup.bounds;
        if (bounds.length >= 4) { // 检查是否有有效的边界信息
            var width = bounds[2].as("px") - bounds[0].as("px"); // 计算宽度（注意要转换为像素）
            layerWidths.push(width);
        } else {
            console.log("图层没有有效的边界信息: " + layerOrGroup.name);
        }
    }


// 存储所有图层的宽度
var layerWidths = [];

// 获取画布的边界
var bounds = doc.bounds;

// 计算画布宽度（右边界 - 左边界）
var canvasWidth = doc.width.as("px");

// 输出画布宽度
//alert("画布宽度为: " + canvasWidth + " 像素");
// 遍历所有顶层图层
for (var i = 0; i < doc.layers.length; i++) {
    traverseLayers(doc.layers[i]);
}

// 获取最大宽度
if (layerWidths.length > 0) {
    var maxWidth = canvasWidth ;
} else {
    alert("没有找到任何图像图层。");
    exit();
}

// 提示用户输入目标宽度，默认使用最大宽度
var targetWidthInput = prompt("请输入目标宽度（单位：像素），留空则使用所有图层中的最大宽度：" + maxWidth, "");
var targetWidth = targetWidthInput ? parseFloat(targetWidthInput) : maxWidth;

// 输入验证
if (isNaN(targetWidth) || targetWidth <= 0) {
    alert("无效的目标宽度，请输入一个正数。");
    exit();
}

// 再次遍历所有图层并调整大小
function resizeLayer(layerOrGroup, targetWidth) {
        var bounds = layerOrGroup.bounds;
        if (bounds.length >= 4) { // 检查是否有有效的边界信息
            var currentWidth = bounds[2].as("px") - bounds[0].as("px"); // 计算当前宽度
            
            // 如果宽度已经符合目标宽度，则跳过
            if (currentWidth == targetWidth) {
                return;
            }
            
            // 计算缩放比例
            var scale = targetWidth / currentWidth;
            var newHeight = (targetWidth / currentWidth) * (bounds[3].as("px") - bounds[1].as("px")); // 根据宽度计算新的高度
            
            // 调整图层大小
            layerOrGroup.resize(scale * 100, (newHeight / (bounds[3].as("px") - bounds[1].as("px"))) * 100, AnchorPosition.MIDDLECENTER);
        } else {
            console.log("图层没有有效的边界信息: " + layerOrGroup.name);
        }
    }


// 开始调整所有图层的大小
for (var i = 0; i < doc.layers.length; i++) {
    resizeLayer(doc.layers[i], targetWidth);
}
//高度累加
function calculateTotalHeight(doc) {
    var totalHeight = 0;

    // 遍历所有图层
    for (var i = 0; i < doc.artLayers.length; i++) {
        var layer = doc.artLayers[i];

        // 获取图层的边界框
        var bounds = layer.bounds;

        // 确保边界框有效
        if (bounds.length >= 4) {
            var top = bounds[1].as("px");
            var bottom = bounds[3].as("px");

            // 计算图层的高度
            var layerHeight = bottom - top;
            totalHeight += layerHeight;
        } else {
            alert("图层没有有效的边界信息: " + layer.name);
        }
    }

    return totalHeight;
}
// 提示完成
alert("所有图层已调整为 " + targetWidth + " 像素宽度！");
// 计算所有图层的总高度
var totalHeight = calculateTotalHeight(doc);

// 显示结果
//alert("所有图层的累加高度为: " + totalHeight + " 像素");
//重命名图层
var layerCount = doc.artLayers.length;

//删除默认图层
 //if (doc.artLayers[layerCount-1].isBackgroundLayer) {
        // 解锁背景图层
       // doc.artLayers[layerCount-1].isBackgroundLayer = false;
        // 删除图层
       // doc.artLayers[layerCount-1].remove();
        // 提示用户操作已完成
//alert("已删除锁定的背景图层。"); 
//下方变量更新
//layerCount = doc.artLayers.length;}
var layers = doc.artLayers;
var firstLayer = layers[0];
 // 重命名首末图层
firstLayer.name = "PSBL-Auto_0.jpg";
var lastlayer =  layers[layerCount-1];//避开默认背景
lastlayer.name = "PSBL-Auto_last.jpg";
//新建画布
// 获取当前活动文档
var doc = app.activeDocument;

// 检查是否有打开的文档
if (!doc) {
    alert("没有打开的文档。");
    exit();
}

// 获取原始文档的分辨率（DPI）
var resolution = doc.resolution;

// 获取原始文档的宽度和高度（单位为像素）
var originalWidth = doc.width.as("px");
var originalHeight = doc.height.as("px");

// 创建新的文档配置
var newDocName = "longmerge";
var newDocWidth = originalWidth; // 新文档宽度与原文档相同
var newDocHeight = totalHeight; // 新文档高度设定为1300像素
var newDocResolution = resolution; // 新文档的分辨率与原文档相同

// 创建新文档
var newDoc = app.documents.add(
    newDocWidth, // 宽度
    newDocHeight, // 高度
    resolution, // 分辨率
    newDocName, // 文档名称
    NewDocumentMode.RGB, // 模式：RGB
    DocumentFill.WHITE // 背景填充颜色：白色
);

// 提示成功创建
alert("已成功创建名为 '" + newDocName + "' 的新文档。\n宽度: " + newDocWidth + " px\n高度: " + newDocHeight + " px\n分辨率: " + resolution + " DPI");
app.doAction("ac1", "自建");