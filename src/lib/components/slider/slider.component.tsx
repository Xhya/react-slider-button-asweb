import { useCallback, useEffect, useRef, useState } from "react";
import "./slider.style.css";
import * as React from "react";
import {
  getElementLeftPositionOnScreen,
  getElementRightPositionOnScreen,
} from "./slider.utils";

interface SliderState {
  content: String;
  contentAfterSlide: String;
  imageSrc: string;
  onSlide: () => void;
}

export default function Slider({
  content,
  contentAfterSlide,
  imageSrc,
  onSlide,
}: SliderState) {
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

  function onMouseDragStart(event: any) {
    if (!isDragStarted) {
      event.preventDefault()
      const mousePosition = event.pageX;
      setMouseInitialPosition(mousePosition);
      setIsDragStarted(true);
    }
  }

  function onDragEnd() {
    setIsDragStarted(false);
    setDragHorizontalPosition(0);
  }

  const handleWindowTouchMove = useCallback(
    (event: TouchEvent) => {
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

  const handleWindowMouseMove = useCallback(
    (event: MouseEvent) => {
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
        if (event.clientX > mouseInitialPosition) {
          return false;
        }

        if (
          event.clientX > sliderLeftPosition &&
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
        setDragHorizontalPosition(event.clientX - mouseInitialPosition);
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
      window.addEventListener("mousemove", handleWindowMouseMove);
    } else {
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    }
  }, [
    isDragStarted,
    handleWindowTouchMove,
    handleWindowMouseMove,
    dragHorizontalPosition,
  ]);

  return (
    <div ref={sliderRef} className="bottom-slider">
      {isSecondDisplayed && (
        <div className="second-display">
          <p>{contentAfterSlide}</p>
        </div>
      )}

      <div
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        onMouseDown={onMouseDragStart}
        onMouseUp={onDragEnd}
        ref={pictureRef}
        className="first-display"
        style={{
          left: dragHorizontalPosition,
        }}
      >
        <img
          className="butt-wrapper"
          src="../../assets/neon.jpg"
          alt={"slider"}
          width={150}
          height={100}
        />
      </div>
      {!isSecondDisplayed && (
        <div className="content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
