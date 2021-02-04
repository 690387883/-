$(function () {
  layui.form.verify({
    newpwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码不一致";
      }
    },
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $("#changeform").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg("原密码错误");
        }
        console.log(res);
        $("#changeform")[0].reset();
        return layui.layer.msg("修改密码成功");
      },
    });
  });
});
