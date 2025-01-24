const receiptID = Date.now().toString(16);
document.getElementById("receiptCode").innerHTML =receiptID; //cuando se cree la función final, añadir estas lineas     

var mainContainer = []
mainContainer.push(       {
    [receiptID] : {
        header:{
        },
        products:[],
        summary:{
            subTotal: 0,
            iva:0,
            total:0,

        }
    }
})

 function addProduct(products){
    //crear elementos dentro de la tabla (visualmente)
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


        // Añadir elementos al listado
        var subTotalCard = document.getElementById("subTotal");
        subTotalCard.innerHTML = parseInt(subTotalCard.innerHTML) + parseInt(subTotal);
        mainContainer[0][receiptID].summary.subTotal= subTotalCard.innerHTML
        Iva.innerHTML = parseInt(subTotalCard.innerHTML) * 0.19;
        mainContainer[0][receiptID].summary.iva = Iva.innerHTML
        finalAmount.innerHTML= parseInt(subTotalCard.innerHTML)+ parseFloat(Iva.innerHTML);
        mainContainer[0][receiptID].summary.total = finalAmount.innerHTML
        var purchase = {
            'purchaseID': elementClass,
            'productCode': products.productCode,
            'productName': products.productName,
            'quantity': products.quantity,
            'unitValue': products.unitValue
        }
        mainContainer[0][receiptID].products.push(purchase);

        //Borrar elementos de la lista
        const deleteButton =  document.getElementById(elementClass)
        deleteButton.addEventListener("click", (e)=>{
            const eraser = e.target.id
            subTotalCard.innerHTML = parseInt(subTotalCard.innerHTML) - parseInt(document.getElementById(`${elementClass}-subTotal`).innerHTML)
            mainContainer[0][receiptID].summary.subTotal= subTotalCard.innerHTML
            Iva.innerHTML = parseInt(subTotalCard.innerHTML) * 0.19;
            mainContainer[0][receiptID].summary.iva = Iva.innerHTML
            finalAmount.innerHTML= parseInt(subTotalCard.innerHTML)+ parseFloat(Iva.innerHTML);
            mainContainer[0][receiptID].summary.total = finalAmount.innerHTML
            newTableElement.remove();
            
            for(var element in mainContainer[0][receiptID].products){
                if(mainContainer[0][receiptID].products[element].purchaseID===eraser){
                    mainContainer[0][receiptID].products.splice(element,1);
                }
            }
        })    
    }

//Recoger  de la información del form
const myForm = document.getElementById("form");
myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    var data= Object.fromEntries(new FormData(e.target));
    addProduct(data);
    var personalInfo = {
        'personAdress': data.personAddress,
        'personEmail': data.personEmail,
        'personID': data.personID,
        'personLastName': data.personLastname,
        'personName': data.personName
    }
    Object.assign(mainContainer[0][receiptID].header, personalInfo)
    
    const payButton = document.getElementById("payButton")
    payButton.addEventListener("click", ()=>{
        const finalReceipt = JSON.stringify(mainContainer);
        window.alert(`La información final del recibo es: ${finalReceipt}`)
        console.log(finalReceipt)
        location.reload()
    })
})
    





