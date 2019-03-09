// Dummy data
var dsSanPham = [
    {
        "Ma" : 1,
        "Ten" : "iPhone XS Max",
        "Gia" : 1100
    },
    {
        "Ma" : 2,
        "Ten" : "Galaxy S9",
        "Gia" : 800
    },
    {
        "Ma" : 3,
        "Ten" : "Galaxy Node 10",
        "Gia" : 1500
    }
];

var maSanPham = 1;
var coButtonLuuThongTinSanPham = 0; // 0 - dang click btnThemSanPham - 1 - dang click btnCapNhat
var viTriCapNhap = -1;

function LoadData(){
    $("tbody").html("");

    var i = 0;
    dsSanPham.forEach(function(item){
        var trNode = $("<tr></tr>");
    
        var thNode = $("<th scope='row'>" + item.Ma + "</th>");
        trNode.append(thNode);

        var tdTenSanPhamNode = $("<td>" + item.Ten + "</td>");
        trNode.append(tdTenSanPhamNode);

        var tdGiaSanPhamNode = $("<td>" + item.Gia + "</td>");
        trNode.append(tdGiaSanPhamNode);

        var tdThaoTacNode = $("<td></td>");
        var btnCapNhatNode = $("<button type='button' class='btn btn-primary btn-CapNhat' data-toggle='modal' data-target='#sanPhamModal' value='" + i + "'>Cập nhật</button>");
        var btnXoaNode = $("<button type='button' class='btn btn-danger btn-Xoa' value='" + i + "'>Xoá</button>");
        tdThaoTacNode.append(btnCapNhatNode);
        tdThaoTacNode.append(btnXoaNode);
        trNode.append(tdThaoTacNode);

        $("tbody").append(trNode);
        i++;

        // Xử lý xự kiện click cho Button Cập nhật
        btnCapNhatNode.click(function(){
            var i = $(this).val();

            viTriCapNhap = i;
            
            maSanPham = dsSanPham[i].Ma;
            $("#MaSanPham").val(maSanPham);

            $("#TenSanPham").val(dsSanPham[i].Ten);
            $("#GiaSanPham").val(dsSanPham[i].Gia);

            coButtonLuuThongTinSanPham = 1;
        });

        // Xử lý sự kiện click cho Button Xoá
        btnXoaNode.click(function(){
            var viTriXoa = btnCapNhatNode.val();
            dsSanPham.splice(viTriXoa, 1);
            LoadData();
        });
    });
}

function LuuThongTinSanPham(){
    var tenSanPham = $("#TenSanPham").val();
    var giaSanPham = $("#GiaSanPham").val();

    var sanPham = {
        "Ma" : maSanPham,
        "Ten" : tenSanPham,
        "Gia" : giaSanPham
    }

    dsSanPham.push(sanPham);
}

function CapNhatThongTinSanPham(){
    var tenSanPham = $("#TenSanPham").val();
    var giaSanPham = $("#GiaSanPham").val();

    var sanPham = {
        "Ma" : maSanPham,
        "Ten" : tenSanPham,
        "Gia" : giaSanPham
    }

    dsSanPham[viTriCapNhap] = sanPham;
}

$(document).ready(function(){
    LoadData();

    $("#btnThem").click(function(){
        if(dsSanPham.length > 0)
            maSanPham = dsSanPham[dsSanPham.length - 1].Ma + 1;
        $("#MaSanPham").val(maSanPham);
        coButtonLuuThongTinSanPham = 0;
    });

    $("#btnHuy").click(function(){
        maSanPham = 1;
        coButtonLuuThongTinSanPham = 0;
        viTriCapNhap = -1;
    });

    $("#btnLuu").click(function(){
        if(coButtonLuuThongTinSanPham == 0) {
            // Lưu lại thông tin của sản phẩm mới vào trong dsSanPham
            LuuThongTinSanPham();
        } else {
            // Cập nhật lại thông tin sản phẩm đã được hiệu chỉnh
            CapNhatThongTinSanPham();
        }
        $("#sanPhamModal").modal('hide');   // Xử lý ấn Modal đi
        LoadData();
    });

    $("#sanPhamModal").on("hidden.bs.modal", function(){
        $("#TenSanPham").val("");
        $("#GiaSanPham").val("");
    });
});