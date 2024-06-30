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
let ball;
let rect;
let margin;
let circle;
let player1;
let player2;
let keys = {};
let speed = 4.5;
let dir_x = 1;
let dir_y = (function () { return ((Math.random() * 2.0) - 1.0); })();

let count = 0;

function keyUp (e) {
	// console.log(e.keyCode);
	keys[e.keyCode] = false;
}		

function keyDown (e) {
	// console.log(e.keyCode);
	keys[e.keyCode] = true;
}

function resizeGame() { 
	const originalWidth = app.view.width;
	const originalHeight = app.view.height;

	app.resize();

	const newWidth = app.view.width;
	const newHeight = app.view.height;

	const scaleX = newWidth / originalWidth;
	const scaleY = newHeight / originalHeight;

	player2.x *= scaleX;
	player1.x *= scaleX;
	ball.x *= scaleX;

	player2.y *= scaleY;
	player1.y *= scaleY;
	ball.y *= scaleY;
}

function gameLoop () {
	moveBall();
	let yCheck1Min = player1.y - (player1.height / 2) - 5 < 0;
	let yCheck2Min = player2.y - (player2.height / 2) - 5 < 0;
	let yCheck1Max = player1.y + (player1.height / 2) + 5 >= margin * 6;
	let yCheck2Max = player2.y + (player2.height / 2) + 5 >= margin * 6;
	if (keys["87"] && !yCheck1Min)
		player1.y -= 4;
	if (keys["83"] && !yCheck1Max)
		player1.y += 4;
	if (keys["38"] && !yCheck2Min)
		player2.y -= 4;
	if (keys["40"] && !yCheck2Max)
		player2.y += 4;
}

function moveBall() {
	if (!checkGoal())
	{
		// count++;
		checkCollisionWall();
		checkCollisionPlayer();
		ball.x += (dir_x * speed);
		ball.y += (dir_y * speed);
		// console.log("X: " + ball.x + " Y: " + ball.y);
	}
}

function checkCollisionWall () {
	if ((ball.y - 16) <= 0) {
		dir_y = Math.abs(dir_y);
		// speed += 1.25;
	}
	else if ((ball.y + 16) >= (margin * 6)) {
		dir_y = Math.abs(dir_y) * -1;
		// console.log("New value: " + (Math.abs(dir_y * 100) / 100) + " " + (Math.abs(dir_y * 100) / -100));
		// speed += 1.25;
	}
}

function checkCollisionPlayer() {
	if (ball.x <= (player1.x + 16) && (ball.y <= player1.y + (player1.height / 2) && ball.y >= player1.y - (player1.height / 2))) {
		dir_x = 1;
	// speed += 1.25;
	}
	else if (ball.x >= (player2.x - 16) && (ball.y <= player2.y + (player2.height / 2) && ball.y >= player2.y - (player2.height / 2))) {
		dir_x = -1;
		// speed += 1.25;
	}
}

function checkGoal(){
	if ((ball.x - 16) < player1.x - 21 || (ball.x + 16) > player2.x + 21)
		return true;
	return (false);
}

async function setup () {
	// Create a new application

	app = new PIXI.Application();

	// Initialize the application
	await app.init({ background: '#aaaaaa', resizeTo: window });
	// Append the application canvas to the document body
	document.body.appendChild(app.canvas);
	rect = await PIXI.Assets.load("images/rect.png");
	circle = await PIXI.Assets.load("images/ball.png");
};

function main () {
	const container = new PIXI.Container();

	margin = app.view.height / 8;
	const top = new PIXI.Graphics().rect(0, 0, app.view.width, margin).fill({ color: 0x333FFF });
	const left = new PIXI.Graphics().rect(0, margin, app.view.width / 4 - 15, margin * 6).fill({ color: 0x333FFF });
	const right = new PIXI.Graphics().rect((app.view.width / 4 * 3) + 15, margin, app.view.width / 4, margin * 6).fill({ color: 0x333FFF });
	const bottom = new PIXI.Graphics().rect(0, margin * 7, app.view.width, margin).fill({ color: 0x333FFF });

	container.x = 0;
	container.y = margin;

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
	ball = new PIXI.Sprite(circle);
	ball.anchor.set(0.5);
	ball.x = app.view.width / 2;
	ball.y = (app.view.height - (margin * 2)) / 2;

	container.addChild(player1);
	container.addChild(player2);
	container.addChild(ball);

	window.addEventListener("keyup", keyUp);
	window.addEventListener("keydown", keyDown);
	window.addEventListener("resize", resizeGame);
	app.stage.addChild(top);
	app.stage.addChild(left);
	app.stage.addChild(right);
	app.stage.addChild(bottom);
	app.stage.addChild(container);

	app.ticker.add(gameLoop);
	// app.stage.interactive = true;
	// app.stage.on("pointermove", movePlayer);
}

await setup();
main();