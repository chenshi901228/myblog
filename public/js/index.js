
var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    speed:400,
    loop: true, // 循环模式选项
    slidesPerView: 4,
    spaceBetween : 20,
    // 如果需要前进后退按钮
})
$('.swiper-div-prev').click(function () {
    mySwiper.slidePrev();
})
$('.swiper-div-next').click(function () {
    mySwiper.slideNext();
})

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
        document.querySelector(".goTop").style.display = "block"
    } else {
        document.querySelector(".goTop").style.display = "none"
    }
}
document.querySelector(".goTop").addEventListener("click", () => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
})
