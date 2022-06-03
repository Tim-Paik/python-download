var ua = UAParser();
function selectId(id) {
    return document.getElementById(id);
};
// console.log(ua); <- Debug ONLY, should NOT be used in production.
selectId("tip").innerText = "检测到您正在使用 " + ua.os.name + " 系统，处理器架构为 " + ua.cpu.architecture + "。";
function setLink(sourceId) {
    selectId("link").href = selectId(sourceId).href;
    selectId("link").innerText = selectId(sourceId).innerText;
    selectId("recommend").style.display = "initial";
};
switch (ua.os.name) {
    case "Windows":
        if (ua.os.version >= 6.3) setLink("win10x64");
        else if (ua.cpu.architecture == "amd64") setLink("win7x64");
        else setLink("win7x32");
        break;
    case "macOS":
        setLink("apple");
        break;
    case "Linux":
        setLink("linux");
        break;
    default:
        setLink("win10x64");
    // Win 10 is the most popular OS in China, so we use it as the default.
};
