import { useEffect, useRef, useState } from 'react';
import { Refs } from './refs';
import Topbar from '../topbar';

const MergeSort = () => {

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
        ctx.fillText((values.current.array[i] / dpr).toFixed(0),
          i * widthFactor + 5,
          canvasElement.height - values.current.array[i] - 2
        );
      }

    }


    if (!isAnimationStarted) return;
    function paint(t: number | undefined) {
      return new Promise((res, rej) => {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        for (let k = 0; k < arraySize; k++) {
          if (itemWidth > label) {
            ctx.fillStyle = "red";
            ctx.font = `${(itemWidth * 2) / 3 - 1}px Arial`;
            ctx.fillText((
              values.current.array[k] / dpr).toFixed(0),
              k * widthFactor + 2,
              canvasElement.height - values.current.array[k] - 2
            );
          }

          ctx.fillStyle = "green";
          if (t === k) ctx.fillStyle = "blue";
          ctx.fillRect(k * widthFactor + 2,
            canvasElement.height - values.current.array[k],
            itemWidth, values.current.array[k]
          );
        }
        setTimeout(res, values.current.speed);
      });
    }

    async function merge(l: number, m: number, r: number) {
      if (!values.current.mounted) return;
      let n1 = m - l + 1;
      let n2 = r - m;

      let L = [];
      let R = [];

      for (let i = 0; i < n1; ++i) L[i] = values.current.array[l + i];
      for (let j = 0; j < n2; ++j) R[j] = values.current.array[m + 1 + j];

      let i = 0,
        j = 0;

      let k = l;
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          values.current.array[k] = L[i];
          await paint(k);
          i++;
        } else {
          values.current.array[k] = R[j];
          await paint(k);
          j++;
        }
        k++;
      }

      while (i < n1) {
        values.current.array[k] = L[i];
        await paint(k);
        i++;
        k++;
      }

      while (j < n2) {
        values.current.array[k] = R[j];
        await paint(undefined);
        j++;
        k++;
      }
    }

    async function sort(l: number, r: number) {
      if (l < r && values.current.mounted) {
        let m = Math.floor((l + r) / 2);

        await sort(l, m);
        await sort(m + 1, r);

        await merge(l, m, r);
      }
    }

    sort(0, values.current.array.length - 1).then(() => {
      if (values.current.mounted)
        setIsAnimationStarted(false);
    })

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

export default MergeSort;