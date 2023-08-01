import "./App.css";
import Container from './components/container';
import classNames from "classnames";


function App() {

  const backgrounds = ['bg-bingus', 'bg-bongus', 'bg-dingus', 'bg-dongus', 'bg-plingus', 'bg-plongus', 'bg-tringus', 'bg-trongus']

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
