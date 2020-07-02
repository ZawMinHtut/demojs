(function() {
	document.addEventListener("DOMContentLoaded", function(){
		// ========== products ==========
		let products = [
		{
			"name" : "pasta",
			"data" : [
			{
				"id" : "ps_s",
				"size": "small",
				"price": 8000
			},
			{
				"id" : "ps_m",
				"size": "medium",
				"price": 12000
			},
			{
				"id" : "ps_l",
				"size": "large",
				"price":15000
			}
			]
		},
		{
			"name" : "pizza",
			"data" : [
			{
				"id" : "pz_s",
				"size": "small",
				"price": 12000
			},
			{
				"id" : "pz_m",
				"size": "medium",
				"price": 15000
			},
			{
				"id" : "pz_l",
				"size": "large",
				"price": 18000
			}
			]
		}
		];

		// ========== render products in DOM ==========
		let productsDOM = document.querySelector(".products");

		products.forEach(function(product, index) {
			let div = document.createElement("div");
			let p = document.createElement("p");
			p.innerText = product.name;
			div.append(p);
			let ul = document.createElement("ul");
			ul.id = product.name;
			product.data.forEach(function(data) {
				let li = document.createElement("li");
				let size = document.createElement("span");
				size.innerText = data.size;
				size.style.textTransform = "capitalize";
				let price = document.createElement("span");
				price.innerText = data.price + " MMK";
				let button = document.createElement("button");
				button.innerText = "Add To Card";
				button.setAttribute("data-id", data.id);

				li.append(size, price, button);
				ul.append(li);
			})
			div.append(ul);

			productsDOM.append(div);

			if(index < products.length - 1) {
				productsDOM.append(document.createElement("hr"));
			}
		});

		// ========== adding to card ==========
		let cardDOM = document.querySelector(".card");
		let addButton = document.querySelectorAll(".products button");

		addButton.forEach(function(btn) {
			btn.addEventListener("click", function() {
				let name = this.parentElement.parentElement.id;
				let tmpProduct = products.filter(function(product) {
					return product.name == name;
				});
				let id = this.getAttribute("data-id");
				let productData = tmpProduct[0].data.filter(function(data) {
					return data.id === id;
				});

				AddToCard(tmpProduct[0].name, productData[0]);
			});
		});

		function AddToCard(name, product) {
			let card = JSON.parse(window.localStorage.getItem("card"));
			if(card !== null) {
				for(let i = 0; i < card.length; i++) {
					if(name in card[i]) {
						for(let j = 0; j < card[i][name].length; j++) {
							if(product.size in card[i][name][j]) {
								card[i][name][j][product.size] = {
									id: card[i][name][j][product.size].id,
									qty: card[i][name][j][product.size].qty + 1,
									price: card[i][name][j][product.size].price + card[i][name][j][product.size].price,
								}
							} else {
								card[i][name][j][product.size] = {
									id: product.id,
									qty: 1,
									price: product.price,
								}
							}
						}
					} else {
						let tmp = [];
						let item = new Object();
						item[product.size] = {
							id: product.id,
							qty: 1,
							price: product.price
						}
						tmp.push(item);
						card[i][name] = tmp;
					}
				}
				
				window.localStorage.setItem("card", JSON.stringify(card));
			} else {
				let data = new Object();
				data[name] = [];
				let item = new Object();
				item[product.size] = {
					id: product.id,
					qty: 1,
					price: product.price
				}
				data[name].push(item);

				window.localStorage.setItem("card", JSON.stringify([data]));
			}

			RenderCard();
		}

		// ========== render card in DOM ==========
		let trToRender = document.querySelector(".card table tr:first-child");
		let totalPrice = document.querySelector("#totalPrice");

		RenderCard();

		function RenderCard() {
			let olderTrs = document.querySelectorAll(".card table tr:not(:first-child):not(:last-child)");
			if(olderTrs.length) {
				olderTrs.forEach(function(tr) {
					tr.remove();
				});
			}
			totalPrice.innerHTML = "0";
			let card = JSON.parse(window.localStorage.getItem("card"));
			if(card !== null) {
				card.forEach(function(item) {
					let names = Object.keys(item);
					names.forEach(function(name) {
						let tr = document.createElement("tr");
						let pName = document.createElement("td");
						pName.innerText = name;
						pName.style.textAlign = "center";
						tr.append(pName);
						let pSize = document.createElement("td");
						let pQty = document.createElement("td");
						pQty.style.textAlign = "center";
						let pPrice = document.createElement("td");
						pPrice.style.textAlign = "right";
						item[name].forEach(function(data) {
							let dataKeys = Object.keys(data);
							dataKeys.forEach(function(key) {
								if(pSize.innerHTML) {
									pSize.innerHTML = pSize.innerHTML + "<br><hr>" + key;
								} else {
									pSize.innerHTML = key;
								}

								if(pQty.innerHTML) {
									pQty.innerHTML = pQty.innerHTML + "<br><hr>" + data[key].qty;
								} else {
									pQty.innerHTML = data[key].qty;
								}

								if(pPrice.innerHTML) {
									pPrice.innerHTML = pPrice.innerHTML + "<br><hr>" + data[key].price + " MMK";
								} else {
									pPrice.innerHTML = data[key].price + " MMK";
								}
								totalPrice.innerHTML = parseInt(totalPrice.innerHTML) + data[key].price;
								tr.append(pSize, pQty, pPrice);
							});
						});
						trToRender.parentNode.insertBefore(tr, trToRender.parentNode.lastElementChild);
					});
				});
			}
		}

		// ========== clear card ==========
		let clearCard = document.querySelector("#clearCard");
		clearCard.addEventListener("click", function() {
			window.localStorage.clear();
			totalPrice.innerHTML = "0";
			RenderCard();
		})
	});
})();