import "./App.css";
import Slider from "./lib/components/slider/slider.component";
import NeonImage from "./assets/neon.jpg";

function App() {
  function onSlide() {}
  return (
    <>
      <div className="app">
        <Slider
          content={"Slide pour découvrir"}
          onSlide={onSlide}
          image={NeonImage}
        />
      </div>
    </>
  );
}

export default App;
