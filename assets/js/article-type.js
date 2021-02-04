$(function () {
  randerTab();
  function randerTab() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success(res) {
        // console.log(res);
        var htmlStr = template("tlp", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  var add = null;
  $("#btnadd").on("click", function () {
    // var htmlForm=template('addform',)
    add = layui.layer.open({
      type: 1,
      title: ["添加分类", "font-size:18px;"],
      area: ["500px", "300px"],
      content: $("#addform").html(), //这里content是一个普通的String
    });
  });
  $(document).on("submit", "#add-forms", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg("添加失败");
        }
        randerTab();
        layui.layer.close(add);
      },
    });
  });
  var cmp = null;
  $("tbody").on("click", "#compile", function () {
    cmp = layui.layer.open({
      type: 1,
      title: ["修改分类", "font-size:18px;"],
      area: ["500px", "300px"],
      content: $("#cmpform").html(), //这里content是一个普通的String
    });
    var index = $(this).attr("data-id");
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + index,
      success(res) {
        layui.form.val("cmp-forms-lay", res.data);
      },
    });
  });
  $(document).on("submit", "#cmp-forms", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success(res) {
        layui.layer.close(cmp);
        randerTab();
      },
    });
  });
  $("tbody").on("click", "#del", function () {
    var del = $(this).attr("data-del");
    layui.layer.confirm(
      "您确定删除吗",
      { icon: 3, title: "提示" },
      function (index) {
        $.ajax({
          type: "get",
          url: "/my/article/deletecate/" + del,
          success(res) {
            randerTab();
          },
        });
        layui.layer.close(index);
      }
    );
  });
});
