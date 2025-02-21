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

// 获取当前活动文档
var doc = app.activeDocument;

// 确保所有图层可见以获取正确的边界信息
//doc.activeLayer = doc.artLayers[0]; // 激活第一个图层
//app.runMenuItem(stringIDToTypeID('showAll')); // 显示所有图层

// 计算所有图层的总高度
var totalHeight = calculateTotalHeight(doc);

// 显示结果
alert("所有图层的累加高度为: " + totalHeight + " 像素");
