import { useEffect, useRef, useState } from 'react';
import { Refs } from './refs';
import Topbar from '../topbar';

const BubbleSort = () => {
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

    let i = 0;
    let j = 0;
    let widthFactor = canvasElement.width / arraySize;
    let itemWidth = (widthFactor * 3) / 4;


    for (let i = 0; i < arraySize; i++) {
      values.current.array.push(Math.round(Math.random() * (canvasElement.height - 70) + 30));

      ctx.fillStyle = "green";
      ctx.fillRect(
        i * widthFactor + 5,
        canvasElement.height - values.current.array[i],
        itemWidth,
        values.current.array[i]
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

    function sort() {

      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      if (values.current.array[j] > values.current.array[j + 1]) {
        let t = values.current.array[j];
        values.current.array[j] = values.current.array[j + 1];
        values.current.array[j + 1] = t;
      }

      j++;

      if (j > arraySize - i - 1) {
        i++;
        j = 0;
      }

      for (let k = 0; k < arraySize; k++) {
        ctx.strokeRect(
          k * widthFactor + 5,
          canvasElement.height - values.current.array[k],
          itemWidth, values.current.array[k]
        );

        if (itemWidth > label) {
          ctx.fillStyle = "red";
          ctx.font = `${(itemWidth * 2) / 3 - 1}px Arial`;
          ctx.fillText(
            (values.current.array[k] / dpr).toFixed(0),
            k * widthFactor + 5,
            canvasElement.height - values.current.array[k] - 2
          );
        }

        if (k === j) {
          ctx.fillStyle = "blue";
          ctx.fillRect(k * widthFactor + 5,
            canvasElement.height - values.current.array[k],
            itemWidth,
            values.current.array[k]
          );
        }
        if (k === j + 1) {
          ctx.fillStyle = "orange";
          ctx.fillRect(
            k * widthFactor + 5,
            canvasElement.height - values.current.array[k],
            itemWidth,
            values.current.array[k]
          );
        }
        if (k >= arraySize - i) {
          ctx.fillStyle = "green";
          ctx.fillRect(
            k * widthFactor + 5,
            canvasElement.height - values.current.array[k],
            itemWidth, values.current.array[k]
          );
        }
      }
      if (values.current.mounted)
        values.current.id = setTimeout(sort, values.current.speed);

      if (i >= arraySize && values.current.id !== null) {
        clearTimeout(values.current.id);
        if (values.current.mounted)
          setIsAnimationStarted(false);
      }
    }

    values.current.id = setTimeout(sort, values.current.speed);

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

export default BubbleSort;