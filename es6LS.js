let arrayOfTotal = [];
let arrayofTaxTotal = [];

class calcItem{
  constructor(item, price,amount, tax, overallTaxTotal, overallTotal){
    this.item = item;
    this.price = price;
    this.amount = amount
    this.tax = tax;
    this.overallTaxTotal = overallTaxTotal;
    this.overallTotal = overallTotal;

  }
}

class UI{

  addItemToList(newCalcItem){
    const list = document.getElementById("book-list");
  // 9 create taberow element
  const row = document.createElement("tr");
  // 10 insert columns into row
  row.innerHTML = `
  <td>${newCalcItem.item}</td>
  <td>${newCalcItem.price}</td>
  <td>${newCalcItem.amount}</td>
  <td>${newCalcItem.tax}</td>
  <td>${newCalcItem.overallTaxTotal}</td>
  <td>${newCalcItem.overallTotal}</td>
  <td><a href"#" class="delete">X</a></td>
  `;

  // 11
  list.appendChild(row);
  }
/************** */
  clearFields(){
  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("tax").value = "";
  }
/************** */
  deleteBook(target){
    console.log('THIS' + arrayOfTotal);
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
    
  }
}



/******************* */
// 3Create event listeners for adding book
document.getElementById("calc-form").addEventListener("submit", function(e) {
  // 4 the 3 consts get form values
  const item = document.getElementById("item").value;
  const price = document.getElementById("price").value;
  const amount = document.getElementById("amount").value;
  let tax = document.getElementById("tax").value;

  const priceTotal = parseInt(price);
  const amountTotal = parseInt(amount);

  let overallTotal = Math.round((priceTotal * amountTotal) * 1.13 * 100) / 100 ;
  let overallTaxTotal = Math.round((price * amountTotal)* 0.13 * 100) / 100;
  tax = overallTaxTotal;
  // console.log(tax);
  // console.log(overallTotal);
  // console.log(overallTaxTotal);
  arrayOfTotal.push(overallTotal);
  arrayofTaxTotal.push(tax);
  console.log(arrayOfTotal);

  let sum = 0;
  for (i = 0; i < arrayOfTotal.length; i++) {
    sum += arrayOfTotal[i];
  }

  let sum2 = 0;
  for(i = 0; i< arrayofTaxTotal.length; i++){
    sum2 += arrayofTaxTotal[i];
  }
  overallTotal = sum;
  overallTaxTotal = sum2
  console.log("the sum is" + sum);
  console.log("the tax sum is" + sum2);

  // 5 instantiate item constructor
  const newCalcItem = new calcItem(item, price, amount, tax, overallTaxTotal, overallTotal);

  // 6 instantiate new ui constructor
  const ui = new UI();

  //
 

  if (item === "" || price === "" || amount === '' || tax === "") {
  } else {
    // 7b add book to list
    // ui.calculateTax(newTotal);
    ui.addItemToList(newCalcItem);
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  e.preventDefault();
});
