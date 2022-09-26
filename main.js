// Use deployed URL.

let addproduct = document.getElementById("add_product")
addproduct.onclick = (e) => {
    getdata(e)
}

let getdata = async (e) => {
    e.preventDefault()
    console.log("adddata")

    let items = {
        id: Date.now(),
        p_name: document.getElementById("name").value,
        p_price: document.getElementById("price").value,
        p_Description: document.getElementById("description").value,
        p_date: document.getElementById("delivery").value,
        p_image: document.getElementById("image").value,
    }
    console.log(items)

    let res = await fetch("https://evaluationmasai.herokuapp.com/api/products", {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let result = await res.json()
    // console.log(result);
    let inputs = document.querySelectorAll('#name,#price,#description,#delivery,#image')
    inputs.forEach(inputs => {
        inputs.value = ""
    })
    maindata()
}

let maindata = async () => {
    let res = await fetch("https://evaluationmasai.herokuapp.com/api/products")
    let data = await res.json()
    //  console.log("data",data)
    append(data)
}
maindata()

let container = document.getElementById("container")

let append = (data) => {
    container.innerHTML = ""
    data.forEach(({ p_image, p_name, p_price, p_date, p_Description, id }) => {
        let item = document.createElement("div")
        item.className = "item"
        let img = document.createElement("img")
        img.src = p_image
        let pimgdiv = document.createElement("div")
        pimgdiv.append(img)
        let d_name = document.createElement("h3")
        d_name.innerText = p_name
        let d_price = document.createElement("h4")
        d_price.innerText = p_price
        d_price.className="product_price"
        let d_date = document.createElement("p")
        d_date.innerText = p_date
        d_date.className = "product_delivery"
        let des = document.createElement("p")
        des.innerText = p_Description
        let div = document.createElement("div")
        let removebtn = document.createElement("button")
        removebtn.innerText = "Remove"
        removebtn.className = "remove_item"
        removebtn.onclick = () => {
            removefun(id)
        }
        let update = document.createElement("button")
        update.innerText = "Update Price"
        update.className = "update_price"
        update.onclick = () => {
            updatefun(id)
        }
        div.append(removebtn, update)
        item.append(pimgdiv, d_name, d_price, d_date, des, div)
        container.append(item)
    });
}

let removefun = async (id) => {
    // console.log("remove")
    let res = await fetch(`https://evaluationmasai.herokuapp.com/api/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    maindata()
}

let updatefun = async (id) => {
    let productsdata = await fetch(`https://evaluationmasai.herokuapp.com/api/products/${id}`)
    let new_price = window.prompt("Update the price")
    let datas = { p_price: new_price || productsdata.p_price }
    let res = await fetch(`https://evaluationmasai.herokuapp.com/api/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(datas),
        // mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    maindata()
}




let sortingme = document.getElementById("sort-low-to-high")
sortingme.onclick = () => {
    sortingmefn()
}

let sortingmefn = async () => {
    // console.log("hello")
    let res = await fetch("https://evaluationmasai.herokuapp.com/api/products")
    let data = await res.json()
    data.sort((a, b) => a.p_price - b.p_price)
    let result = await fetch(`https://evaluationmasai.herokuapp.com/api/products?_sort=p_price`, {
        method: "PATCH",
        body: JSON.stringify(data),
        // mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(data)

    maindata(result)
}
let sortinghe = document.getElementById("sort-high-to-low")
sortinghe.onclick = () => {
    sortinghefn()
}
let sortinghefn = async () => {
    console.log("hello")
    let res = await fetch("https://evaluationmasai.herokuapp.com/api/products")
    let data = await res.json()
    data.sort((a, b) => a.p_price - b.p_price)
    let results = await fetch(`https://evaluationmasai.herokuapp.com/api/products?_sort=p_price&order=desc`,{
        method: "PATCH",
        body: JSON.stringify(data),
        // mode:"no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let datas = await results.json()
    // console.log(data)
    maindata(datas)
}