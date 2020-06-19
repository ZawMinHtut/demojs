(function() {
	document.addEventListener("DOMContentLoaded", function(){
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

		let productsDOM = document.querySelector(".products");

		// render products in DOM
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
				let price = document.createElement("span");
				price.innerText = data.price;
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

		//adding to card
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
				card.forEach(function(items) {
					if(items[name].length) {
						console.log("here");
					}
				})
				// console.log(JSON.stringify(card));
				// window.localStorage.setItem("card", JSON.stringify(card));
			} else {
				let data = new Object();
				data[name] = [];
				let item = new Object();
				item[product.size] = {
					qty: 1,
					price: product.price
				}
				data[name].push(item);

				window.localStorage.setItem("card", JSON.stringify([data]));
			}
		}

		//render card in DOM
		// RenderCard();

		function RenderCard() {
			let card = JSON.parse(window.localStorage.getItem("card"));
			if(card !== null) {
				// console.log(card[0]);
			}
		}
	});
})();