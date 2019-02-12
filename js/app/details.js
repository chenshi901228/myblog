

let detailId = JSON.parse(localStorage.getItem("detailId"))
axios.post("http://myblogapi.chenshiservice.cn/content/findContent", {
    _id: detailId
})
    .then(res => {
        let data = res.data.msg[0]
        console.log(data)
        $(".location").html(data.ifyTitle)
        $(".articleDetails h4").html(data.title)
        $(".articleDetails .date").html(data.date.slice(0, 10))
        $(".intro span").html(data.intro)
        $(".articleDetails .detail").html(data.str)
    })
    .catch(error => { console.log(error) })