var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    speed: 400,
    loop: true, // 循环模式选项
    slidesPerView: 4,
    spaceBetween: 20,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper 
    observeParents: true//修改swiper的父元素时，自动初始化swiper 
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
        console.log(res.data.msg)
        $(".headNav").html(`
            ${res.data.msg.map((item, index) => {
            return `<li>
                ${item.title == "网站首页" ?
                    `<a class="actived" href="./index.html">${item.title}</a> ` :
                    `<a data-item=${index} href="./classifyItem.html">${item.title}</a>`}              
                </li>`
        }).join("")
            }
        `)
        $(".container").html(`
            ${res.data.msg.map((item, index) => {
            if (item.title !== "网站首页") {
                return `
                        <div class="ify">
                            <div class="ify-top">
                                <div class="ify-top-img"><img src="./images/icon/menu.png" alt=""></div>
                                <div class="ify-top-title">
                                    <p>${item.title}</p><a class="toclassifyItem" data-item=${index} href="./classifyItem.html">更多</a>
                                </div>
                            </div>
                            <ul class="ify-item">
                                ${item.contents.slice(0, 5).map((item_c, index_c) => {
                    return `
                                <li>
                                    <a data-index=${item_c._id} class="toDetail" href="./details.html"><img src="./images/icon/right.png" alt="">${item_c.intro}</a>
                                    <p>${item_c.date.slice(5, 10)}</p>
                                </li>
                                    `
                }).join("")}
                            </ul>
                        </div>
                        `
            }
        }).join("")
            }
        `)
        $(".swiper .swiper-wrapper").html(`
            ${res.data.msg.map((item, index) => {
            if (item.title !== "网站首页") {
                return `
                    ${item.contents.slice(0, 10).map((item_c, index_c) => {
                    return `
                        <div class="swiper-slide">
                            <img src="${item_c.showImg == undefined || "" ? "./images/head_img.jpg" : item_c.showImg}" alt="">
                            <p>${item_c.title}</p>
                        </div>
                        `
                }).join('')}
                    `
            }
        }).join("")}
        `)
    })
    .catch(error => { console.log(error) })

$(".headNav").on("click", "a", function () {
    let classTitle = $(this).data("item")
    localStorage.setItem("classTitle", JSON.stringify(classTitle))
})
$(".container").on("click", ".toclassifyItem", function () {
    let classTitle = $(this).data("item")
    localStorage.setItem("classTitle", JSON.stringify(classTitle))
})
$(".container").on("click", ".toDetail", function () {
    let detailId = $(this).data("index")
    localStorage.setItem("detailId", JSON.stringify(detailId))
})