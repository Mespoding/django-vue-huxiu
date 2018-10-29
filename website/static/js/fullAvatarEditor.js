function fullAvatarEditor() {
    for (var id = "fullAvatarEditor", file = "/static/js/fullAvatarEditor.swf", version = "10.1.0", expressInstall = "expressInstall.swf", width = 630, height = 430, container = id, flashvars = {}, callback = function () {
    }, heightChanged = !1, i = 0; i < arguments.length; i++)"string" == typeof arguments[i] ? container = arguments[i] : "number" == typeof arguments[i] ? heightChanged ? width = arguments[i] : (height = arguments[i], heightChanged = !0) : "function" == typeof arguments[i] ? callback = arguments[i] : flashvars = arguments[i];
    var vars = {id: id};
    for (var name in flashvars)null != flashvars[name] && ("upload_url" == name || "src_url" == name ? vars[name] = encodeURIComponent(flashvars[name]) : vars[name] = flashvars[name]);
    var params = {
        menu: "true",
        scale: "noScale",
        allowFullscreen: "true",
        allowScriptAccess: "always",
        wmode: "transparent"
    }, attributes = {id: vars.id, name: vars.id}, swf = null, callbackFn = function (e) {
        swf = e.ref, swf.eventHandler = function (json) {
            callback.call(swf, json)
        }
    };
    return swfobject.embedSWF(file, container, width, height, version, expressInstall, vars, params, attributes, callbackFn), swf
}