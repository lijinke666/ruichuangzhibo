var gulp = require('gulp'),
    sass = require('./node_modules/gulp-sass'),
//sass互相引用 添加索引 方便编辑器找到
    sourcemaps = require("./node_modules/gulp-sourcemaps"),
//sass 打印错误信息
    notify = require('./node_modules/gulp-notify'),
    plumber = require('./node_modules/gulp-plumber'),
    autoprefixer = require('./node_modules/gulp-autoprefixer'),      //自动补全前缀
    uglify = require('./node_modules/gulp-uglify'),          //压缩js
    cleanCss = require('./node_modules/gulp-clean-css'),     //压缩css
    // imagemin = require('./node_modules/gulp-imagemin'),      //压缩图片
    cache = require('./node_modules/gulp-cache'),            //未修改的图片压缩时才用缓存
    revappend = require('./node_modules/gulp-rev-append'),   //给页面引用url添加版本号  清除缓存
    cssversion = require('./node_modules/gulp-make-css-url-version'),     //url添加版本号
    htmlmin = require('./node_modules/gulp-htmlmin');        //压缩页面上的js 和 css
// var browser = require("./node_modules/browser-sync"); //自动刷新

//编译sass
gulp.task('Sass',function(){
        gulp.src('./app/sass/*.scss')
            .pipe(plumber({errorHandler:notify.onError('编译Sass错误信息:<%= error.message %>')}))
            .pipe(sourcemaps.init())    //编译前初始化索引信息
            .pipe(sass())
            .pipe(sourcemaps.write())   //编译完覆盖索引信息
            .pipe(autoprefixer({
                browsers:['last 2 version','ie>=8','Android>=4.0'],    //浏览器兼容
                cascade:true,        //是否美化属性
                remove:true          //是否去掉不必要的前缀
            }))
            .pipe(cssversion())
            .pipe(gulp.dest('./dist/css'))
            // .pipe(browserSync.reload({
            //     stream: true
            // }));
})

//压缩css
gulp.task('cssMin',function(){
        gulp.src('./dist/css/*.css')
            .pipe(cleanCss({
                advanced:false,        //是否开启高级优化
                compatibilty:'ie8',    //保留ie8兼容写法
                keepBreaks:false,       //是否保留换行
                keepSpecialComments: '*' //保留所有特殊前缀
            }))
            .pipe(gulp.dest('./dist/css-min'));
})
//压缩js
gulp.task('jsMin',function(){
        gulp.src('./app/js/*.js')
            .pipe(uglify({
                mangle:false              //是否修改变量名
            }))
            .pipe(gulp.dest('dist/js-min'));
});
//压缩图片
gulp.task('imageMin',function(){
        gulp.src('./app/images/*.{png,jpg,gif,jpeg,ico}')
            .pipe(cache(imagemin({
                    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            })))
            .pipe(gulp.dest('./dist/images-min'));
})
//给页面引用url添加版本号  以清除页面缓存
gulp.task('htmlRevUrl',function(){
        gulp.src('./dist/*.html')
            .pipe(revappend())
            .pipe(gulp.dest('dist'));
});
//压缩页面上的js 和 css
gulp.task('htmlMin',function(){
        gulp.src('./dist/*.html')
            .pipe(htmlmin({
                    removeComments: true,//清除HTML注释
                    collapseWhitespace: false,//压缩HTML
                    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                    removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
                    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                    minifyJS: true,//压缩页面JS
                    minifyCSS: true//压缩页面CSS
            }))
            .pipe(gulp.dest('dist/html-min'));
})
//自动刷新
gulp.task('browserSync',function(){
        browserSync({
                server:{
                        baseDir:'/dist'
                },
                files:[
                    '/css/*.css',
                    '/js/*.js',
                    '/*.html'
                ]
        })
})

//自动编译 watch
//sass文件有变动 自动执行一次Sass任务
gulp.task('watch',['Sass'],function(){  //执行watch之前 先执行刷新和编译
        gulp.watch('./app/sass/test.scss',['Sass'])
})