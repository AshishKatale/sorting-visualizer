import { useEffect, useRef, useState } from 'react';
import { Refs } from './refs';
import Topbar from '../topbar';

const QuickSort = () => {

	let canvas = useRef<HTMLCanvasElement>(null);
	let [arraySize, setArraySize] = useState(() => Math.floor(window.innerWidth / 20));
	let [isAnimationStarted, setIsAnimationStarted] = useState(false);
	let values = useRef<Refs>({
		speed: 100,
		id: null,
		array: [],
		mounted: true
	});


	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			values.current.mounted = false;
		}
	}, []);

	useEffect(() => {
		values.current.array = [];
	}, [arraySize]);

	useEffect(() => {

		let canvasElement = canvas.current!;
		let ctx = canvasElement.getContext("2d")!;
		let label = 9;
		canvasElement.scrollIntoView({
			behavior: 'smooth'
		})
		let dpr = devicePixelRatio > 1.5 ? devicePixelRatio : 2;

		canvasElement.height = window.innerHeight * 0.8 * dpr;
		canvasElement.width = window.innerWidth * dpr;
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);


		let widthFactor = canvasElement.width / arraySize;
		let itemWidth = (widthFactor * 3) / 4;


		for (let i = 0; i < arraySize; i++) {
			values.current.array.push(Math.round(Math.random() * (canvasElement.height - 70) + 30));

			ctx.fillStyle = "green";
			ctx.fillRect(i * widthFactor + 5,
				canvasElement.height - values.current.array[i],
				itemWidth, values.current.array[i]
			);

			if (itemWidth > label) {
				ctx.fillStyle = "red";
				ctx.font = `${(itemWidth * 2) / 3 - 1}px Arial`;
				ctx.fillText(
					(values.current.array[i] / dpr).toFixed(0),
					i * widthFactor + 5,
					canvasElement.height - values.current.array[i] - 2
				);
			}

		}

		if (!isAnimationStarted) return;
		function delay() {
			return new Promise((res, rej) => {
				setTimeout(res, values.current.speed);
			});
		}

		async function swap(i: number, j: number) {
			let t = values.current.array[i];
			values.current.array[i] = values.current.array[j];
			values.current.array[j] = t;

			await delay();

			ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

			for (let k = 0; k < arraySize; k++) {

				if (itemWidth > label) {
					ctx.fillStyle = "red";
					ctx.font = `${(itemWidth * 2) / 3 - 1}px Arial`;
					ctx.fillText(
						(values.current.array[k] / dpr).toFixed(0),
						k * widthFactor + 2,
						canvasElement.height - values.current.array[k] - 2
					);
				}

				ctx.fillStyle = "green";

				if (k >= i && k <= j) ctx.fillStyle = "blue";

				ctx.fillRect(
					k * widthFactor + 2,
					canvasElement.height - values.current.array[k],
					itemWidth, values.current.array[k]
				);
			}
		}

		async function partition(left: number, right: number) {
			var pivot = values.current.array[Math.floor((right + left) / 2)], //middle element
				i = left,
				j = right;
			while (i <= j) {
				while (values.current.array[i] < pivot) {
					i++;
				}
				while (values.current.array[j] > pivot) {
					j--;
				}
				if (i <= j) {
					await swap(i, j); //swap two elements
					i++;
					j--;
				}
			}
			return i;
		}

		async function qsort(left: number, right: number) {
			var index;
			if (values.current.array.length > 1 && values.current.mounted) {
				index = await partition(left, right); //index returned from partition
				if (left < index - 1) {
					//more elements on the left side of the pivot
					await qsort(left, index - 1);
				}
				if (index < right) {
					//more elements on the right side of the pivot
					await qsort(index, right);
				}
			}
		}

		qsort(0, values.current.array.length - 1).then(() => {
			if (values.current.mounted)
				setIsAnimationStarted(false);
		});

	}, [arraySize, isAnimationStarted]);

	return (
		<>
			<Topbar
				isAnimationStarted={isAnimationStarted}
				values={values.current}
				setArraySize={setArraySize}
				setIsAnimationStarted={setIsAnimationStarted}
			/>
			<div>
				<canvas ref={canvas} className="canvas"></canvas>
			</div>
		</>
	);

}

export default QuickSort;