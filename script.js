
const data = new Map(dataText.map((item) => [item.id, item]));
var root = null;

function main() {
    root = document.getElementById("root");
    displayMainPage();
}

function sortItem(item1, item2) {
    if (item1.rarity < item2.rarity) return -1;
    if (item1.rarity > item2.rarity) return 1;
    if (item1.name < item2.name) return -1;
    if (item1.name > item2.name) return 1;
    return 0;
}

function displayMainPage() {
    const categories = [
        {title: "Matériaux brutes", name: "raw"},
        {title: "Façonnage", name: "processing"},
        {title: "Cuisine", name: "cooking"},
        {title: "Alchimie", name: "alchemy"}
    ];
    cleanHtmlElement(root);
    categories.forEach((category) => {
        let e = document.createElement("div");
        e.className = "category-container";
        let f = document.createElement("div");
        f.className = "category-title";
        f.innerHTML = category.title;
        e.appendChild(f);
        Array.from(data.values()).filter((value) => value.category === category.name).sort(sortItem).forEach((value) => addMainPageItem(e, value));
        root.appendChild(e);
    })
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
        cleanHtmlElement(root);
        let e = document.createElement("button");
        e.className = "go-back-button";
        e.innerHTML = "Retour à la liste";
        e.addEventListener('click', () => {
            displayMainPage();
        });
        root.appendChild(e);
        addCalculePageItem(root, item.id, quantity);
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