const mainContainer = {}

function addProduct(products){
        const myTable = document.getElementById("productTable");
        const subTotal = products.quantity * products.unitValue;
        const elementClass = new Date().getMilliseconds().toString(16)
        const newTableElement = document.createElement('tr');
        const Iva = document.getElementById("iva");
        const finalAmount = document.getElementById("finalAmount");

        newTableElement.classList.add(elementClass)
        newTableElement.innerHTML = /*html*/`

            <td> ${products.productCode}</td>
            <td> ${products.productName}</td>
            <td> ${products.unitValue}</td>
            <td> ${products.quantity}</td>
            <td class="subTotal" id="${elementClass}-subTotal"> ${subTotal}</td>
            <td class="bold deleteButton" id="${elementClass}"> X</td>
        `
        myTable.append(newTableElement);



        var subTotalCard = document.getElementById("subTotal");
        subTotalCard.innerHTML = parseInt(subTotalCard.innerHTML) + parseInt(subTotal);
        Iva.innerHTML = parseInt(subTotalCard.innerHTML) * 0.19;
        finalAmount.innerHTML= parseInt(subTotalCard.innerHTML)+ parseFloat(Iva.innerHTML);
        
        const deleteButton =  document.getElementById(elementClass)
        deleteButton.addEventListener("click", ()=>{
            subTotalCard.innerHTML = parseInt(subTotalCard.innerHTML) - parseInt(document.getElementById(`${elementClass}-subTotal`).innerHTML)
            Iva.innerHTML = parseInt(subTotalCard.innerHTML) * 0.19;
            finalAmount.innerHTML= parseInt(subTotalCard.innerHTML)+ parseFloat(Iva.innerHTML);
            newTableElement.remove();
        })

    
    }



const myForm = document.getElementById("form");
myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data= Object.fromEntries(new FormData(e.target));
    addProduct(data);
})




