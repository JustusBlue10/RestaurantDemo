let menuJson;

// HTTP requests
function postOrder(orderData) {
    fetch("https://b10bc-weu-httptriggerjustus-fa.azurewebsites.net/api/TableFunction", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(orderData)
    })
    .then((response) => response.text())
    .then((data) => {
        console.log('Succes: ', data);
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

    order = {
        "entries": [],
        "Name": "Marijn den Haan",
        "Quantity": 0,
        "Sale": true,
    };
}
// 

function fetchJSON() {
    fetch("https://b10bc-weu-httptriggerjustus-fa.azurewebsites.net/api/GetMenuFunction", {
        method: 'GET'        
    })
    .then((response) => response.json())
    .then((result) => {
        // console.log('Succes: ', result);
        menuJson = result;
        createMenuInterface(menuJson);
    })
    .catch((error) => {
        console.log(error);
    });
}


// Order data
let order = {
    "entries": [],
    "Name": "Marijn den Haan",
    "Quantity": 0,
    "Sale": true,
};

function updatePriceTotal(entries) {
    let total = 0; 
    entries.forEach((entry) => {
        total += entry[2];
    });
    order.Quantity = total;
    return total;
}

// Order interface
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

// Menu interface
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

function moneyMaker() {
    if (order.Quantity === 0) {
        alert("Your order is empty :( please buy something.");
    } else {
        postOrder(order);
        document.getElementById("orderList").innerHTML = "";
        document.getElementById("total").innerHTML = "";
    }
}