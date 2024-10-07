// 수량 버튼 js

function fnCalCount(type, ths) {
  var $input = $(ths).parents("td").find("input[name='pop_out']");
  var tCount = Number($input.val());
  var tEqCount = Number($(ths).parents("tr").find("td.bseq_ea").html());

  if (type == "p") {
    if (tCount < tEqCount) $input.val(Number(tCount) + 1);
  } else {
    if (tCount > 0) $input.val(Number(tCount) - 1);
  }
}

// 수량 버튼 js
