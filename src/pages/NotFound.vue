<template>
   
	<section class="py-1">
		<div class="d-flex justify-content-center 
					align-items-center flex-column 
					text-center w-100">
			<div class="bg_img w-80">
			</div>
			<div>
				<p class="display-2">Looks Like You're Lost</p>
				<p>The page you are looking for not available...</p>
				<router-link to="/"
				class="text-red shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Go to Home
				</router-link>
			</div>
		</div>
	</section>

</template>
<style>

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: "poppins";
		}

		.bg_img {
			background: url(
'https://media.geeksforgeeks.org/wp-content/uploads/20240226131034/2142357.jpg');
			height: 400px;
			width: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
		}

	
</style>