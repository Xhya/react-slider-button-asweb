import { useCallback, useEffect, useRef, useState } from "react";
import "./slider.style.css";
import * as React from "react";
import {
  getElementLeftPositionOnScreen,
  getElementRightPositionOnScreen,
} from "./slider.utils";

interface SliderState {
  content: String;
  image: string;
  onSlide: () => void;
}

export default function Slider({ content, image, onSlide }: SliderState) {
  const sliderRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pictureRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [dragHorizontalPosition, setDragHorizontalPosition] = useState(0);
  const [mouseInitialPosition, setMouseInitialPosition] = useState(0);
  const [isDragStarted, setIsDragStarted] = useState(false);
  const [isSecondDisplayed, setIsSecondDisplayed] = useState(false);

  function onDragStart(event: any) {
    const touch = event.touches[0] || event.changedTouches[0];
    const mousePosition = touch.pageX;
    setMouseInitialPosition(mousePosition);
    setIsDragStarted(true);
  }

  function onDragEnd() {
    setIsDragStarted(false);
    setDragHorizontalPosition(0);
  }

  const handleWindowTouchMove = useCallback(
    (event: any) => {
      const touch = event.touches[0] || event.changedTouches[0];

      let sliderRightPosition = getElementRightPositionOnScreen(
        sliderRef.current
      );
      let sliderLeftPosition = getElementLeftPositionOnScreen(
        sliderRef.current
      );
      let pictureRightPosition = getElementRightPositionOnScreen(
        pictureRef.current
      );
      let pictureLeftPosition = getElementLeftPositionOnScreen(
        pictureRef.current
      );

      const isLimitedByLeft = () => {
        if (touch.pageX > mouseInitialPosition) {
          return false;
        }

        if (
          touch.pageX > sliderLeftPosition &&
          pictureLeftPosition < sliderLeftPosition
        ) {
          return true;
        }

        if (pictureLeftPosition < sliderLeftPosition) {
          return true;
        }

        return false;
      };

      if (pictureRightPosition > sliderRightPosition) {
        setTimeout(() => {
          onSlide();
        }, 500);
      }

      if (isLimitedByLeft()) {
        setDragHorizontalPosition(-1);
      } else if (pictureRightPosition < sliderRightPosition) {
        setDragHorizontalPosition(touch.pageX - mouseInitialPosition);
      }
    },
    [mouseInitialPosition, onSlide]
  );

  useEffect(() => {
    if (isDragStarted && dragHorizontalPosition > 100) {
      setIsSecondDisplayed(true);
    } else {
      setIsSecondDisplayed(false);
    }

    if (isDragStarted) {
      window.addEventListener("touchmove", handleWindowTouchMove);
    } else {
      window.removeEventListener("touchmove", handleWindowTouchMove);
    }
  }, [isDragStarted, handleWindowTouchMove, dragHorizontalPosition]);

  return (
    <div ref={sliderRef} className="bottom-slider">
      {isSecondDisplayed && (
        <div className="second-display">
          <p>Have a great day !</p>
        </div>
      )}

      <div
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        ref={pictureRef}
        className="first-display"
        style={{
          left: dragHorizontalPosition,
        }}
      >
        <img className="butt-wrapper" src={image} width={150} height={100} />
      </div>
      {!isSecondDisplayed && (
        <div className="content">
          <p>Slide to discover</p>
        </div>
      )}
    </div>
  );
}
