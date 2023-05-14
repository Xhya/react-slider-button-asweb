import "./App.css";
import Slider from "./lib/components/slider/slider.component";

function App() {
  function onSlide() {}
  return (
    <>
      <div className="app">
        <Slider
          content={"Slide pour découvrir"}
          contentAfterSlide={"Bienvenue !"}
          onSlide={onSlide}
        />
      </div>
    </>
  );
}

export default App;
