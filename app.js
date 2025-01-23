const mainContainer = {}

function addProduct(products){
        const myTable = document.getElementById("productTable");
        const subTotal = products.quantity * products.unitValue;
        const elementClass = new Date().getMilliseconds().toString(16)
        const newTableElement = document.createElement('tr');

        newTableElement.classList.add(elementClass)
        newTableElement.innerHTML = /*html*/`

            <td> ${products.productCode}</td>
            <td> ${products.productName}</td>
            <td> ${products.unitValue}</td>
            <td> ${products.quantity}</td>
            <td> ${subTotal}</td>
            <td class="bold deleteButton" id="${elementClass}"> X</td>
        `
        myTable.append(newTableElement);

        const deleteButton =  document.getElementById(elementClass)
        deleteButton.addEventListener("click", ()=>{
            newTableElement.remove()
            console.log(`El elemento con la clase ${elementClass} ha sido eliminado`)
        })

        var subTotalCard = parseInt(document.getElementById("subTotal").innerHTML);
        document.getElementById("subTotal").innerHTML = subTotalCard + subTotal;
        
    }



const myForm = document.getElementById("form");
myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data= Object.fromEntries(new FormData(e.target));
    addProduct(data);
})




