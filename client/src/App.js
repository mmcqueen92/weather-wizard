import "./App.css";
import Container from './components/container';
import classNames from "classnames";


function App() {

  const backgrounds = ['bg-lake-island', 'bg-forest-green', 'bg-mountain-cottage', 'bg-clouds', 'bg-northern-lights', 'bg-mountain-lake', 'bg-northern-lights-2', 'bg-forest-light']

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randBg = backgrounds[getRandomInt(8)]

  const appClassNames = classNames('App', randBg, 'bg-cover', 'h-screen', 'p-10')

  return (
    <div className={appClassNames}>
      <Container/>
    </div>
  );
}

export default App;
