//styles
import "./sass/App.sass";

//components
import Container from "./components/Container";
import Title from "./components/Title";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

//icons
import { LuDelete } from "react-icons/lu";

function App(){

  interface button {
    text: string,
    type: string,
    id?: string | number
    symbol?: any
  }

  const buttons: button[] = [
    {text: "CE", type: "operation"},
    {text: "C", type: "operation"},
    {text: "del", type: "operation", id: "del", symbol: LuDelete},
    {text: "/", type: "operation"},
    {text: "7", type: "number"},
    {text: "8", type: "number"},
    {text: "9", type: "number"},
    {text: "*", type: "operation"},
    {text: "4", type: "number"},
    {text: "5", type: "number"},
    {text: "6", type: "number"},
    {text: "-", type: "operation"},
    {text: "1", type: "number"},
    {text: "2", type: "number"},
    {text: "3", type: "number"},
    {text: "+", type: "operation"},
    {text: ".", type: "number"},
    {text: "0", type: "number"},
    {text: "=", type: "operation", id: "equal"}
  ];

  return (
    <Container id="mainContainer">
      <Container id="calculator">
        <Title>Calculadora</Title>
        <Display />
        <Buttons buttons={buttons}/>
      </Container>
    </Container>

    
  )
}

export default App;