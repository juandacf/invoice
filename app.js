const mainContainer = {}

function addProduct(products){
        const myTable = document.getElementById("productTable");
        const subTotal = products.quantity * products.unitValue;

        const newTableElement = document.createElement('tr');
        newTableElement.innerHTML = /*html*/`

            <td> ${products.productCode}</td>
            <td> ${products.productName}</td>
            <td> ${products.unitValue}</td>
            <td> ${products.quantity}</td>
            <td> ${subTotal}</td>
            <td class="bold deleteButton" id="${products.productCode}"> Delete</td>
        `
        myTable.append(newTableElement);
    }



const myForm = document.getElementById("form");
myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data= Object.fromEntries(new FormData(e.target));
    addProduct(data);
})
