var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    speed: 400,
    loop: true, // 循环模式选项
    slidesPerView: 4,
    spaceBetween: 20,
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

axios.post("http://myblogapi.chenshiservice.cn/classifyTitle/findTitle")
    .then(res => {
        $(".headNav").html(`
            ${
            res.data.msg.map((item,index) => {
                return `<li>
                ${item.title == "网站首页" ?
                        `<a class="actived" href="./index.html">${item.title}</a> ` :
                        `<a data-item=${index} href="./classifyItem.html">${item.title}</a>`}              
                </li>`
            }).join("")
            }
        `)
    })
    .catch(error => { console.log(error) })

$(".headNav").on("click", "a", function () {
    let classTitle = $(this).data("item")
    localStorage.setItem("classTitle", JSON.stringify(classTitle))
})