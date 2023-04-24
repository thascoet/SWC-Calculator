
const data = new Map(dataText.map((item) => [item.id, item]));

function main() {
    const root = document.getElementById("root");
    data.forEach(item => {
        if (item.crafts.length>0) addMainPageItem(root, item);
    });
}

function addMainPageItem(htmlElement, item) {
    let e = document.createElement("div");
    e.className = "item-container";
    let f = document.createElement("img");
    f.src = `./img/${item.id}.png`;
    e.appendChild(f);
    f = document.createElement("p");
    f.innerHTML = item.name;
    e.appendChild(f);
    f = document.createElement("input");
    f.id = `input_${item.id}`;
    f.type = "number";
    f.value = 1;
    f.addEventListener("change", (e) => {if (e.target.value <= 0) e.target.value = 1;});
    e.appendChild(f);
    f = document.createElement("button");
    f.innerHTML = "Calcule";
    f.addEventListener("click", () => {
        let quantity = document.getElementById(`input_${item.id}`).value;
        cleanHtmlElement(htmlElement);
        let e = document.createElement("button");
        e.className = "go-back-button";
        e.innerHTML = "Retour à la liste";
        e.addEventListener('click', () => {
            cleanHtmlElement(htmlElement);
            data.forEach(item => {
                if (item.crafts.length>0) addMainPageItem(htmlElement, item);
            });
        });
        htmlElement.appendChild(e);
        addCalculePageItem(htmlElement, item.id, quantity);
    });
    e.appendChild(f);
    htmlElement.appendChild(e);
}

function addCalculePageItem(htmlElement, id, quantity) {

    let item = data.get(id);
    let e = document.createElement("div");
    e.className = "calcule-container";

    let f = document.createElement("div");
    f.className = "item-container";
    let g = document.createElement("img");
    g.src = `./img/${id}.png`;
    f.appendChild(g);
    g = document.createElement("p");
    g.innerHTML = item.name;
    f.appendChild(g);
    g = document.createElement("p");
    g.innerHTML = quantity;
    f.appendChild(g);
    e.appendChild(f);

    if (item.crafts.length > 0) {
        f = document.createElement("div");
        f.className = "child-container";
        item.crafts[0].items.forEach((craftItem) => {
            g = document.createElement("div");
            addCalculePageItem(g, craftItem.id, quantity*craftItem.quantity);
            f.appendChild(g);
        })
        e.appendChild(f);
    }
    
    htmlElement.appendChild(e);
}

function cleanHtmlElement(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
}

function totalCost(id, quantity, n) {
    let s = "";
    for (let i=0; i<n; i++){
        s += " "
    }
    console.log(`${s}- x${quantity} \"${data.get(id).name}\"`);
    if (data.get(id).crafts.length>0) {
        data.get(id).crafts[0].items.forEach((item) => totalCost(item.id, quantity*item.quantity, n+2));
    }
}

document.addEventListener("DOMContentLoaded", main);