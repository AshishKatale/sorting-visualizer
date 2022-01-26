import React, { FC } from 'react'
import { Refs } from './sorts/refs'
import './topbar.css'

interface Props {
  setIsAnimationStarted: (state: boolean) => void,
  setArraySize: (size: number) => void
  isAnimationStarted: boolean,
  values: Refs
}

const Topbar: FC<Props> = ({
  values,
  isAnimationStarted,
  setArraySize,
  setIsAnimationStarted
}) => {
  return (
    <div className="topbar">
      <div>
        <label>{'speed: '}
          <input
            id="speed"
            style={{ cursor: "pointer" }}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              values.speed = (100 - parseInt((e.target as HTMLInputElement).value));
            }}
            type="range"
            min="0"
            max="100"
            defaultValue={100 - values.speed}
          >
          </input>
        </label>
      </div>
      <button
        className="btn"
        disabled={isAnimationStarted}
        title={isAnimationStarted ? 'disabled' : ''}
        onClick={() => {
          let arraySize;
          if (window.innerWidth > 800) {

            arraySize = parseInt(prompt("Enter value Between 20 and 200")!);

            if (arraySize <= 200 && arraySize > 19) {
              setArraySize(arraySize);
            }

            else alert("Enter Valid Size. Enter value Between 20 and 200");

          } else {

            arraySize = parseInt(prompt("Enter value Between 10 and 80")!);

            if (arraySize <= 80 && arraySize > 9) {
              setArraySize(arraySize);
            }

            else alert("Enter Valid Size. Enter value Between 10 and 80");

          }
        }}
      >
        change array size
      </button>
      <button
        className="btn"
        disabled={isAnimationStarted}
        title={isAnimationStarted ? 'disabled' : ''}
        onClick={() => {
          values.array = [];
          setIsAnimationStarted(true);
        }}>
        Start Sorting
        </button>
    </div>
  )
}

export default Topbar;