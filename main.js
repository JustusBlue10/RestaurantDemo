// let dirtyJSON = [

//     {"id":0,"Dish":"Smoked Salmon","Price":6.25},

//     {"id":1,"Dish":"Carrot Soup","Price":3.55},

//     {"id":2,"Dish":"Chicken Balerno","Price":9.35},

//     {"id":3,"Dish":"Roast Beef","Price":10.00},

//     {"id":4,"Dish":"Pizza Americana","Price":10.20},

//     {"id":5,"Dish":"Chocolate gateau","Price":4.00},

//     {"id":6,"Dish":"Chocolate Cake","Price":4.50},

//     {"id":7,"Dish":"Coffee and Mints","Price":2.50},

//     {"id":8,"Dish":"Margarita lemon","Price":7},

//     {"id":9,"Dish":"Cosmopolitan","Price":7.99},

//     {"id":10,"Dish":"Moscow Mule","Price":3.79}

// ];

let menuJson;

function fetchJSON() {
    //console.log('fetched');
    // change to GetMenuFunction
    // https://b10bc-weu-httptriggerjustus-fa.azurewebsites.net/api/GetMenuFunction
    // "https://b10bc-weu-httptriggeranish-fa.azurewebsites.net/api/HelloWorld"
    fetch("https://b10bc-weu-httptriggerjustus-fa.azurewebsites.net/api/GetMenuFunction", {
        method: 'GET'        
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Succes: ', result);
        menuJson = result;
        createMenuInterface(menuJson);
    })
    .catch((error) => {
        console.log(error);
    });
}

let order = {
    "entries": [],
};

function updatePriceTotal(entries) {
    let total = 0; 
    entries.forEach((entry) => {
        total += entry[2];
    })
    return total;
}

function updateOrderList(item, price) {
    const orderElement = document.createElement("li");
    orderElement.innerHTML = `
        <div>
            <p>${item} - €${price}</p>
            <button>remove</button>
        </div>
    `;

    const orderList = document.getElementById("orderList");
    orderList.append(orderElement);
}

function addToOrder(id, item, price) {
    order.entries.push([id, item, price]);
    order.priceTotal = updatePriceTotal(order.entries).toFixed(2);

    //console.log(order.priceTotal)
    let receiptTotal = document.getElementById("total");
    receiptTotal.innerHTML = `
        <h3>Total €${order.priceTotal}</h3>
    `;

    updateOrderList(item, price);
}

function parseMenuItem(id, item, price) {
    const menuElement = document.createElement("li");
    menuElement.innerHTML = `
        <div id="${id}">
            <h3>${item}</h3>
            <p>€${price}</p>
        </div>
    `;

    menuElement.addEventListener("click",() => {
        addToOrder(id, item, price);
    });

    let renderHook = document.getElementById("menuList");
    renderHook.append(menuElement);
}

function createMenuInterface(file) {
    //fetchJSON();
    file.forEach(item => parseMenuItem(item.id, item.Dish, item.Price));
}