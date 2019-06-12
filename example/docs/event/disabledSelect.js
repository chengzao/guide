// 禁止选中
function disabledSel() {
  if (document.all) {
    document.onselectstart = function () { return false; }; //for ie
  } else {
    document.onmousedown = function () { return false; };
    document.onmouseup = function () { return true; };
  }
  document.onselectstart = new Function('event.returnValue=false;');
  if (window.getSelector) {
    var selection = window.getSelection();
    selection.removeAllRanges();
  } else if (document.selection && document.selection.empty) {
    document.selection.empty();
    // document.selection.clear();
  }
}
