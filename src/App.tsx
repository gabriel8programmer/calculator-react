//styles
import "./sass/App.sass";

//components
import Container from "./components/Container";
import Title from "./components/Title";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import Button from "./components/Button";

//use states
import { useState } from "react";

//icon delete left
import { LuDelete } from "react-icons/lu";

function App() {

  //use state
  const [accumulator, setAccumulator] = useState("");
  const [expression, setExpression] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [currentValue, setCurrentValue] = useState(0);

  //list buttons
  const buttons = [
    //row 1 
    { text: "CE", className: "btn-operation" },
    { text: "C", className: "btn-operation" },
    { text: <LuDelete />, className: "btn-operation" },
    { text: <>&divide;</>, className: "btn-operation" },
    //row 2 
    { text: "7", className: "btn-number" },
    { text: "8", className: "btn-number" },
    { text: "9", className: "btn-number" },
    { text: <>&times;</>, className: "btn-operation" },
    //row 3 
    { text: "4", className: "btn-number" },
    { text: "5", className: "btn-number" },
    { text: "6", className: "btn-number" },
    { text: "-", className: "btn-operation" },
    //row 4 
    { text: "1", className: "btn-number" },
    { text: "2", className: "btn-number" },
    { text: "3", className: "btn-number" },
    { text: "+", className: "btn-operation" },
    //row 5
    { text: ".", className: "btn-number" },
    { text: "0", className: "btn-number" },
    { text: "=", className: "btn-operation", id: "equal" },
  ];

  function sum(n1: number, n2: number): number {
    return n1 + n2;
  }

  function subtract(n1: number, n2: number): number {
    return n1 - n2;
  }

  function multiply(n1: number, n2: number): number {
    return n1 * n2;
  }

  function divide(n1: number, n2: number): number {
    return n2 != 0 ? n1 / n2 : 0;
  }

  function addDigit(text: string) {
    const alreayHasADotInExpression = text == "." && expression.includes(".");
    if (alreayHasADotInExpression) {
      return;
    }

    setExpression(expression + text);
  }

  function clearExpression() {
    setExpression("");
  }

  function clearAll() {
    setExpression("");
    setAccumulator("");
  }

  function clearLastDigit() {
    setExpression(expression.slice(0, -1));
  }

  function calculateResult(currentOperador: string, n1: number, n2: number) {
    switch (currentOperador) {
      case "+":
        setCurrentValue(sum(n1, n2));
        break;
      case "-":
        setCurrentValue(subtract(n1, n2));
        break;
      case "×":
        setCurrentValue(multiply(n1, n2));
        break;
      case "÷":
        setCurrentValue(divide(n1, n2));
        break;
    }
  }

  function OperateInCurrentExpression(text: string) {
    setAccumulator(`${expression} ${currentOperator}`);
  }

  function showResult() {
    setAccumulator("");
    setExpression(`${currentValue || ""}`);
  }

  function Operate(text: string) {

    switch (text) {
      case "CE":
        clearExpression();
        break;
      case "C":
        clearAll();
        break;
      case "":
        clearLastDigit();
        break;
      case "=":
        showResult();
        break;
      default:
        OperateInCurrentExpression(text);
        break;
    }
  }

  function handleClick(e: any) {
    const text: string = e.target.innerText;
    //add digit for the numbers
    const isNumberOrDot = (text == "." || +text >= 0 && text != "");
    if (isNumberOrDot) {
      addDigit(text);
    } else {
      Operate(text)
    }
  }

  return (
    <Container id="mainContainer">
      <Container id="calculator">
        <Title>Calculadora</Title>
        <Display
          accumulator={accumulator}
          expression={expression}
        />
        <Buttons>
          {
            buttons.map((btnIndex: any, index: number) => {
              return <Button className={`btn ${btnIndex.className}`}
                id={btnIndex.id ?? `btn${index + 1}`}
                key={index}
                onClick={(e: any) => { handleClick(e) }}
              >
                {btnIndex.text}
              </Button>
            })
          }
        </Buttons>
      </Container>
    </Container>
  )
}

export default App;