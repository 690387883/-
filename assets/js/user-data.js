$(function () {
  layui.form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  getinfo();
  $("#btnreset").on("click", function (e) {
    e.preventDefault();
    getinfo();
  });
  function getinfo() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      success(res) {
        console.log(res);
        layui.form.val("form-data", res.data);
      },
    });
  }
  $("#formData").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg("修改失败");
        }
        window.parent.getRander();
      },
    });
  });
});
