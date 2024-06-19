// import * as pixi from './pixi.min.js';

// const app = new PIXI.Application(
// 	{
// 		width: 800,
// 		height: 600,
// 		backgroundColor: 0xAAAAAA
// 	}
// );
// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

// let x = canvas.width / 2;
// let y = canvas.height / 2;
// let dx = 0.5;
// let dy = -0.5;

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill()
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill()
// ctx.closePath();	

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgb(0 0 255 50%)";
// ctx.stroke()
// ctx.closePath();

// function draw () {
// 	ctx.beginPath();
// 	ctx.arc(x, y, 2, 0, Math.PI * 2, false);
// 	ctx.fillStyle = "#0095DD";
// 	ctx.fill()
// 	ctx.closePath();
// 	x += dx;
// 	y += dy;
// }

// setInterval(draw, 10);

// import { Application, Assets, Container, Sprite } from './pixi.min.js';
// import * as PIXI from "./pixi.min.js";

let app;
let player1;
let player2;
let keys = {};
let margin;

(async () => {
	// Create a new application

	app = new PIXI.Application();

	// Initialize the application
	await app.init({ background: '#aaaaaa', resizeTo: window });

	// Append the application canvas to the document body
	document.body.appendChild(app.canvas);

	const container = new PIXI.Container();

	margin = app.view.height / 4;
	const top = new PIXI.Graphics().rect(0, 0, app.view.width, margin).fill({ color: 0x0 });
	const bottom = new PIXI.Graphics().rect(0, margin * 3, app.view.width, margin).fill({ color: 0x0 });

	container.x = 0;
	container.y = margin;

	let rect = await PIXI.Assets.load("images/rect.png");
	player1 = new PIXI.Sprite(rect);
	player1.anchor.set(0.5);
	player1.x = app.view.width / 4;
	player1.y = (app.view.height - (margin * 2)) / 2;
	player1.height = 80;
	player2 = new PIXI.Sprite(rect);
	player2.anchor.set(0.5);
	player2.x = app.view.width / 4 * 3;
	player2.y = (app.view.height - (margin * 2)) / 2;
	player2.height = 80;

	container.addChild(player1);
	container.addChild(player2);

	app.stage.addChild(top);
	app.stage.addChild(bottom);
	app.stage.addChild(container);
	// app.stage.addChild(player1);
	// app.stage.addChild(player2);

	window.addEventListener("keyup", keyUp);
	window.addEventListener("keydown", keyDown);

	app.ticker.add(gameLoop);
	// app.stage.interactive = true;
	// app.stage.on("pointermove", movePlayer);
})();

function keyUp (e) {
	console.log(e.keyCode);
	keys[e.keyCode] = false;
}

function keyDown (e) {
	console.log(e.keyCode);
	keys[e.keyCode] = true;
}

function gameLoop () {
	let yCheck1Min = player1.y - (player1.height / 2) - 5 < 0;
	let yCheck2Min = player2.y - (player2.height / 2) - 5 < 0;
	let yCheck1Max = player1.y + (player1.height / 2) + 5 >= margin * 2;
	let yCheck2Max = player2.y + (player2.height / 2) + 5 >= margin * 2;
	if (keys["87"] && !yCheck1Min)
		player1.y -= 5;
	if (keys["83"] && !yCheck1Max)
		player1.y += 5;
	if (keys["38"] && !yCheck2Min)
		player2.y -= 5;
	if (keys["40"] && !yCheck2Max)
		player2.y += 5;
}

// function movePlayer (e) {
// 	let pos = e.data.global;
// }