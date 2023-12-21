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
  const [expression, setExpression] = useState("0");
  const [currentOperator, setCurrentOperator] = useState("");

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
    { text: ",", className: "btn-number" },
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

  function divide(n1: number, n2: number): number | string {
    return n2 != 0 ? n1 / n2 : "Não é possível dividir por 0.";
  }

  class Calculator {

    accumulator;
    expression;
    operator;
    totalCharAllowed;

    constructor(accumulator: string, expression: string, operator: string){
      this.accumulator = accumulator;
      this.expression = expression;
      this.operator = operator;
      this.totalCharAllowed = 20;
    }

    updateDisplay(){
      setAccumulator(this.accumulator);
      setExpression(this.expression? this.expression: "0");
    }

    addDigit(text: string){
      
      const exceededNumberCharAllowed = this.expression.length >= this.totalCharAllowed;
      const alredyExistsAComma = text == "," && this.expression.includes(",");
      const expressionEqualsZero = this.expression == "0";
      const textIsNotEqualsComma = text != ",";

      if (exceededNumberCharAllowed ||
        alredyExistsAComma){
        return;
      }

      if (expressionEqualsZero && textIsNotEqualsComma){
        this.expression = text;
      } else {
        this.expression += text;
      }

      this.updateDisplay();
    }

    clearCurrentExpression(){
      this.expression = "0";
    }

    clearAll(){
      this.expression = "0";
      this.accumulator = "";
    }

    clearLastCharInExpression(){
      if (this.expression === "0"){
        return;
      }
      this.expression = this.expression.slice(0, -1);
    }

    operate(text: string){

      //calculator operations
      switch(text.toLowerCase()){
        case "ce":
          this.clearCurrentExpression();
          break;
        case "c":
          this.clearAll();
          break;
        case "":
          this.clearLastCharInExpression();
          break;
      }

      this.updateDisplay();
    }

  }

  //object for to control of the calculator
  const calc = new Calculator(accumulator, expression);

  function handleClick(e: any) {
    const text: string = e.target.innerText;
    //add digit for the numbers
    const isNumberOrDot = (text == "," || +text >= 0 && text != "");
    if (isNumberOrDot) {
      calc.addDigit(text);
    } else {
      calc.operate(text);
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