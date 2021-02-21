

let detailId = JSON.parse(localStorage.getItem("detailId"))
axios.post("http://myblogapi.chenshiservice.cn/content/findContent", {
    _id: detailId
})
    .then(res => {
        let data = res.data.msg[0]
        $(".location").html(data.ifyTitle)
        $(".articleDetails h4").html(data.title)
        $(".articleDetails .date").html(data.date.slice(0, 10))
        $(".intro span").html(data.intro)
        $(".articleDetails .detail").html(data.str)
    })
    .catch(error => { console.log(error) })

axios.post("http://myblogapi.chenshiservice.cn/classifyTitle/findTitle")
    .then(res => {
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

$(".right").on("click", ".toDetail", function () {
    let detailId = $(this).data("index")
    localStorage.setItem("detailId", JSON.stringify(detailId))
})