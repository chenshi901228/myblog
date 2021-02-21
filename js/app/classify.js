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


let classTitle = JSON.parse(localStorage.getItem("classTitle"))
if (classTitle) {
    axios.post("http://myblogapi.chenshiservice.cn/classifyTitle/findTitle")
        .then(res => {
            $(".location").html(res.data.msg[classTitle].title)
            $(".headNav").html(`
                ${res.data.msg.map((item, index) => {
                return `<li>
                    ${item.title == "网站首页" ?
                        `<a href="./index.html">${item.title}</a> ` :
                        `<a data-item=${index} class=${index == classTitle ? "actived" : "normal"} href="./classifyItem.html">${item.title}</a>`}              
                    </li>`
            }).join("")
                }
            `)
            $(".classList").html(`
                ${res.data.msg[classTitle].contents.map(item => {
                return `<li>
                                <a data-index=${item._id} class="toDetail" href="./details.html">${item.title}</a>
                                <div class="item-info">
                                    <div class="left">
                                        <p>${item.intro}</p>
                                        <div class="tag">
                                            <img src="./images/icon/user.png" />
                                            <p>陈实</p>
                                            <img src="./images/icon/date.png" />
                                            <p>${item.date.slice(0, 10)}</p>
                                            <img src="./images/icon/tag.png" />
                                            <a href="">陈实的日记</a>
                                        </div>
                                    </div>
                                    <img class="show-img" src=${item.showImg} alt="">
                                </div>
                            </li>`
            }).join("")
                }
            `)
            $(".main .right").html(`
                ${res.data.msg.map((item, index) => {
                if (item.title !== "网站首页") {
                    return `
                            <div class="right-item">
                                <div class="right-top">
                                    <div class="right-top-img"><img src="./images/icon/menu.png" alt=""></div>
                                    <p>${item.title}</p>
                                </div>
                                <ul class="right-item-list">
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
        })
        .catch(error => { console.log(error) })
}

$(".headNav").on("click", "a", function () {
    let classTitle = $(this).data("item")
    localStorage.setItem("classTitle", JSON.stringify(classTitle))
})

$(".classList").on("click", ".toDetail", function () {
    let detailId = $(this).data("index")
    localStorage.setItem("detailId", JSON.stringify(detailId))
})

$(".right").on("click", ".toDetail", function () {
    let detailId = $(this).data("index")
    localStorage.setItem("detailId", JSON.stringify(detailId))
})