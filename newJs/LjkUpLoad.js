/**
 * Created by Administrator on 2016/7/13.
 * By:睿创智播 李金珂小朋友
 * 文件上传 小组件
 * v 0.2
 *  ：）
 */
;(function ($) {
    var LjkUpload = function ( element ) {
        this.element = element;
    };
    LjkUpload.prototype = {
        //是否为PC   返回 true 或 false
        isPc: function () {
            var userAgent = navigator.userAgent;
            var AgentsArray = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var i = 0; i < AgentsArray.length; i++) {
                if (userAgent.indexOf(AgentsArray[i]) > -1) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        /**
         *
         * @param fileSelectBtn    美化后的文件选择按钮
         * @param fileBtn          真实的文件选择按钮
         */
        selectImg:function( options ){
            if( typeof options != "object" ){
                return
            }
            options.fileSelectBtn.on("click", function () {
                options.fileBtn.click();
            });
        },
        //拖拽图片
        /**
         *
         * @param ele      拖拽区域
         * @param isDown   是否按下
         * @param isPc     是否为pc
         */
        moveImage: function ( options ) {
            if( typeof options != "object" ){
                return
            }
            var mouseOffsetX = 0,
                mouseOffsetY = 0;
            //按下
            options.ele.on("mousedown touchstart", function ( e ) {
                var touche = options.isPc ? e : event.targetTouches[0];
                options.isDown = true;
                mouseOffsetX = touche.pageX - parseInt(options.ele.get(0).offsetLeft);
                mouseOffsetY = touche.pageY - parseInt(options.ele.get(0).offsetTop);
            });
            //离开
            options.ele.on("mousemove touchmove", function ( e ) {
                e.preventDefault();
                var mouseX = 0,
                    mouseY = 0;
                var touche = options.isPc ? e : event.targetTouches[0];
                if ( options.isDown === true ) {
                    mouseX = touche.pageX - mouseOffsetX;
                    mouseY = touche.pageY - mouseOffsetY;
                    options.ele.css({
                        top: mouseY + "px",
                        left: mouseX + "px"
                    })
                }
            })
            //弹起
            options.ele.on("mouseup touchend", function ( e ) {
                e.preventDefault();
                options.isDown = false;
            });
            //移出
            options.ele.on("mouseout", function ( e ) {
                e.preventDefault();
                options.isDown = false;
            });
        },
        //展示图片
        /**
         *
         * @param fileSelectBtn     文件选择按钮
         * @param fileBtn     文件按钮
         * @param showEle     图片显示区域
         * @param isImage     是图片还是文件 true || false
         * @param maxSize     图片最大限制  KB
         */
        showImage: function ( options ) {
            if( !window.FileReader){
                rcAlert("浏览器版本过低,建议升级浏览器");
                return;
            }
            if( typeof options != "object" ){
                return
            }
            if(typeof  options.isImage == 'undefined'){
                options.isImage = false;
            }
            var _this = this;
            _this.selectImg( options );
            //获取到文件时
            options.fileBtn.change(function () {
                if (this.files.length && this.files.length > 1) {
                    rcAlert("只能上传1张图片:)");
                    return;
                }
                //将对象转换为数组 Array.prototype.slice.call(obj);
                //ES6中可以写成  Array.from(obj);
                var files = Array.prototype.slice.call(this.files);
                files.forEach(function (file, i) {
                    //jpeg png gif    "/image/jpeg"     i对大小写不敏感
                    var fileType = options.isImage ? /\/(?:jpeg|png|gif)/i : /\/(?:mp4|rmvb|x-ms-wmv|rm|3gp|avi)/i;          //图片或者 视频
                    var type = file.type.split("/").pop();
                    if (!fileType.test(file.type)) {
                        rcAlert("不支持" + type + "格式的文件");
                        return;
                    }
                    if (typeof options.maxSize != 'undefined' && typeof options.maxSize == 'number') {
                        var fileSize = file.size / 1024;
                        if (fileSize > options.maxSize) {
                            rcAlert("抱歉,文件最大为 " + options.maxSize + " KB");
                            return;
                        }
                    }
                    //HTML 5.1  新增file接口
                    var reader = new FileReader(),
                        rc;

                    reader.onloadstart = function () {
                        rc = new rcLoading("读取中,请稍后");
                    };
                    //读取失败
                    reader.onerror = function () {
                        rc.remove();
                        rcAlert("读取失败");
                    };
                    //读取中断
                    reader.onabort = function () {
                        rc.remove();
                        rcAlert("网络异常!");
                    };
                    //读取成功
                    reader.onload = function () {
                        rc.remove();
                        var result = this.result;        //读取失败时  null   否则就是读取的结果
                        if (options.isImage === true) {
                            var image = new Image();
                            image.src = result;
                            options.showEle.html('').append(image).removeClass("hasImg");
                        } else if (options.isImage === false) {
                            //防止重复选中
                            if( !$("b").length ){
                                var $fileName = $("<b class='ml5 mt10'>"+ file.name +"</b>");
                                options.fileSelectBtn.after($fileName);
                            }

                        }
                        //鼠标滚动缩放图片
                        var $range = $('input[type="range"]'),
                            scale = Number($range.val());
                        options.showEle.get(0).onmousewheel = function(e){
                           var target,
                               ee = e || window.event;
                                target = ee.delta ? ee.delta :  ee.wheelDelta;
                           if(target > 0 ){
                               scale += 0.05;
                               scale = Math.min(scale,3);
                               $range.val(scale);
                              _this.ToScale(options.showEle,scale)
                           }else if( target < 0 ){
                               scale -=0.05;
                               scale = Math.max(0,scale);
                               $range.val(scale);
                               _this.ToScale(options.showEle,scale)
                           }else{
                               return false;
                           }
                        };
                        options.fileBtn.blur();
                    };
                    //注入图片或文件  转换成base64
                    reader.readAsDataURL(file);      //base64
                    // reader.readAsBinaryString( file );      //二进制

                });
            });
        },
        //滑块拖拽缩放
        /**
         *
         * @param range   滑块
         * @param ele     什么区域进行缩放
         */
        rangeToScale: function ( options ) {
            if( typeof options != "object" ){
                return;
            }
            var _this = this;
            var scale = Number ( options.range.val() );
            options.range.on("mousemove touchmove", function ( e ) {
                var _this_ = $(this);
                scale = Number(_this_.val());
                _this.ToScale( options.ele, scale );
            }).prev().on("click touchstart",function(){
                scale-= 0.01;
                options.range.val( scale );
                _this.ToScale( options.ele ,scale )
            }).next().next().on("click touchstart",function(){
                scale+= 0.01;
                options.range.val( scale );
                _this.ToScale( options.ele ,scale )
            });
        },
        //缩放
        /**
         *
         * @param ele     什么区域进行缩放
         * @param scale   缩放比例
         * @constructor
         */
        ToScale:function( ele , scale ){
            ele.css({
                "-webkit-transform": "scale(" + scale + ")",
                "-moz-transform": "scale(" + scale + ")",
                "-ms-transform": "scale(" + scale + ")",
                "-o-transform": "scale(" + scale + ")",
                "transform": "scale(" + scale + ")"
            })
        },
        //裁剪
        clipImage: function ( options ){
            if( typeof options != "object" ){
                return
            }
            var defaults = {
                uploadBtn:$(".upload-upload-btn"),
                uploadImageBox:$(".move-image"),
                clipImage:$(".clip-image"),
                range:$("#range")
            };
            var options = $.extend( defaults , options );
            //选择文件

            options.uploadBtn.on("click",function(){
                if(options.uploadImageBox.hasClass("hasImg")){
                    rcAlert("请选择图片");
                    return;
                }
                var $img = options.uploadImageBox.find("img"),
                    canvas = document.createElement("canvas"),
                    ljk = canvas.getContext("2d"),
                    $width = options.clipImage.width(),
                    $height = options.clipImage.height();
                canvas.width = $width;
                canvas.height = $height;

                var scale = options.range.val() || options.range.value,
                    sx = parseInt ( options.clipImage.offset().left - options.uploadImageBox.offset().left),
                    sy = parseInt ( options.clipImage.offset().top - options.uploadImageBox.offset().top );
                ljk.drawImage( $img.get(0), sx / scale, sy/ scale, $width / scale, $height / scale, 0, 0 , $width , $height );

                var Src = canvas.toDataURL( "image/png" );
                if( typeof  options.success != "function" ){
                    rcAlert("请使用success回调函数:(");
                    return;
                }
               options.success( Src );
            })
        }
    };
    window['LjkUpload'] = LjkUpload;
})(jQuery);