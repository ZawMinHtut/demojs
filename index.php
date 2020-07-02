<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Shop</title>
	<link rel="stylesheet" href="style.css" />
</head>
<body>
	<main>
		<div class="container">
			<div class="products"></div>

			<div class="card">
				<h3>My Card</h3>
				<table>
					<tr>
						<th>Products</th>
						<th>Size</th>
						<th>Qty</th>
						<th>Price</th>
					</tr>
					<tr>
						<td colspan="3">Total</td>
						<td><span id="totalPrice">0</span> MMK</td>
					</tr>
				</table>
				<button id="clearCard">Clear Card</button>
			</div>
		</div>
	</main>

	<script src="core.js"></script>
</body>
</html>