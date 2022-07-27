
//category

$("#add_category").submit(function (event) {
  alert("Thêm danh mục thành công!");
});

$("#update_category").submit(function (event) {

    alert("Cập nhật danh mục thành công!");

});

$ondeletecategory = $(".table tbody td a.deletecategory");
$ondeletecategory.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/categories/${id}`,
    method: "DELETE",
  };

  if (confirm("Bạn có muốn xóa danh mục này không?")) {
    $.ajax(request).done(function (response) {
      alert("Xóa danh mục thành công!");
      location.reload();
    });
  }
});

//product
$("#add_product").submit(function (event) {
  alert("Thêm sản phẩm thành công!");
});

$ondeleteproduct = $(".table tbody td a.deleteproduct");
$ondeleteproduct.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/products/${id}`,
    method: "DELETE",
  };

  if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
    $.ajax(request).done(function (response) {
      alert("Xóa sản phẩm thành công!");
      location.reload();
    });
  }
});

//product detail
$("#add_productdetail").submit(function (event) {
  alert("Thêm chi tiết sản phẩm thành công!");
});

$("#update_productdetail").submit(function (event) {
  alert("Cập nhật chi tiết sản phẩm thành công!");
});

$ondeleteproductdetail = $(".table tbody td a.deleteproductdetail");
$ondeleteproductdetail.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/productdetails/${id}`,
    method: "DELETE",
  };

  if (confirm("Bạn có muốn xóa chi tiết sản phẩm này không?")) {
    $.ajax(request).done(function (response) {
      alert("Xóa chi tiết sản phẩm thành công!");
      location.reload();
    });
  }
});

//size
$("#add_size").submit(function (event) {
  alert("Thêm size thành công!");
});

$("#update_size").submit(function (event) {
  alert("Cập nhật size thành công!");
});



$ondeletesize = $(".table tbody td a.deletesize");
$ondeletesize.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/sizes/${id}`,
    method: "DELETE",
  };

  if (confirm("Bạn có muốn xóa kích cỡ này không?")) {
    $.ajax(request).done(function (response) {
      alert("Xóa kích cỡ thành công!");
      location.reload();
    });
  }
});
