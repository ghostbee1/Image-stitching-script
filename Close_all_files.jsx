// 确保Photoshop实例已准备好
if (app.documents.length > 0) {
    // 弹出确认对话框
    var userResponse = confirm("是否关闭其他打开的文档？");

    if (userResponse) {
        // 当前活动文档
        var activeDoc = app.activeDocument;

        // 遍历所有打开的文档
        for (var i = app.documents.length - 1; i >= 0; i--) {
            var doc = app.documents[i];
            doc.close(SaveOptions.DONOTSAVECHANGES);
            
            // 如果不是当前活动文档，则关闭
            //if (doc !== activeDoc) {
                //doc.close(SaveOptions.DONOTSAVECHANGES);
            //}
        }
    }
} else {
    alert("没有打开的文档。");
}

// 辅助函数：确认对话框
function confirm(message) {
    return ExternalObject.AdobeDialogs.confirm(message, "是", "否");
}