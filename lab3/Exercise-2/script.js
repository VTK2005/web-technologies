const products = [
  { name:"Laptop", price:60000, category:"electronics", quantity:0 },
  { name:"Headphones", price:2000, category:"electronics", quantity:0 },
  { name:"Apples", price:120, category:"grocery", quantity:0 }
];

let couponDiscount = 0;

function addProduct(index){
  products[index].quantity++;
  renderCart();
}

function changeQty(index,delta){
  products[index].quantity += delta;
  if(products[index].quantity < 0) products[index].quantity = 0;
  renderCart();
}

function removeItem(index){
  products[index].quantity = 0;
  renderCart();
}

function applyCoupon(){
  const code = document.getElementById("coupon").value.trim().toUpperCase();

  couponDiscount = 0;

  if(code.startsWith("SAVE")){
    const num = parseInt(code.slice(4));
    if(!isNaN(num)) couponDiscount = num;
  }

  renderCart();
}

function calculateDiscount(total){
  let discount = 0;
  let info = [];

  // Bulk discount
  products.forEach(p=>{
    if(p.quantity >= 3){
      discount += p.price * p.quantity * 0.1;
      info.push(`Bulk 10% on ${p.name}`);
    }
  });

  // Category discount
  const electronicsTotal = products
    .filter(p=>p.category==="electronics")
    .reduce((s,p)=>s+p.price*p.quantity,0);

  if(electronicsTotal >= 50000){
    discount += electronicsTotal * 0.05;
    info.push("5% Electronics Discount");
  }

  // Time discount
  const hour = new Date().getHours();
  if(hour >= 13 && hour <= 21){
    discount += total * 0.05;
    info.push("Evening Sale 5%");
  }

  // Coupon
  if(couponDiscount>0){
    discount += couponDiscount;
    info.push(`Coupon ₹${couponDiscount}`);
  }

  return {discount, info};
}

function renderCart(){
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  let total = 0;

  products.forEach((p,i)=>{
    if(p.quantity>0){
      total += p.price * p.quantity;

      cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${p.name} (₹${p.price})</span>
        <span>
          <button class="qty-btn" onclick="changeQty(${i},-1)">-</button>
          ${p.quantity}
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
          <button class="qty-btn remove" onclick="removeItem(${i})">x</button>
        </span>
      </div>`;
    }
  });

  const {discount, info} = calculateDiscount(total);
  const finalTotal = Math.max(total - discount,0);

  document.getElementById("total").innerText = finalTotal.toFixed(2);
  document.getElementById("discountInfo").innerText = info.join(" | ");
}

renderCart();
