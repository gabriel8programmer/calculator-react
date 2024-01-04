//styles
import "./sass/App.sass";

//components
import Container from "./components/Container";
import Title from "./components/Title";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

//use states
import { useState } from "react";

//icon delete left
import { LuDelete } from "react-icons/lu";

function App() {

  //use state
  const [accumulator, setAccumulator] = useState("");
  const [expression, setExpression] = useState("0");

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

  class Calculator {

    accumulator;
    expression;
    currentValue: string | number;

    constructor(accumulator: string, expression: string) {
      this.accumulator = accumulator;
      this.expression = expression;
      this.currentValue = 0;
    }

    sum(n1: number, n2: number): number {
      return n1 + n2;
    }
  
    subtract(n1: number, n2: number): number {
      return n1 - n2;
    }
  
    multiply(n1: number, n2: number): number {
      return n1 * n2;
    }
  
    divide(n1: number, n2: number): number {
      return n2 != 0 ? n1 / n2 : 0;
    }

    updateDisplay(updAcc: boolean, updExp: boolean) {
      //test conditional redering
      if (updAcc) {
        setAccumulator(this.accumulator);
      }
      if (updExp) {
        setExpression(this.expression ?? "0");
      }
    }

    addDigit(text: string) {

      const alredyExistsAComma = text == "," && this.expression.includes(",");
      const expressionEqualsZero = this.expression == "0";
      const textIsNotEqualsComma = text != ",";

      if (alredyExistsAComma) {
        return;
      }

      if (expressionEqualsZero && textIsNotEqualsComma) {
        this.expression = text
      } else {
        this.expression += text;
      }

      this.updateDisplay(false, true);
    }

    clearCurrentExpression() {
      this.expression = "0";
      this.updateDisplay(false, true);
    }

    clearAll() {
      this.expression = "0";
      this.accumulator = "";
      this.updateDisplay(true, true);
    }

    clearLastCharInExpression() {
      if (this.expression.length == 1) {
        this.expression = "0";
        this.updateDisplay(false, true);
        return;
      }
      this.expression = this.expression.slice(0, -1);
      this.updateDisplay(false, true);
    }

    operateNow(v1: number, v2: number, opt: string){
      
      switch(opt){
        case "+":
          this.currentValue = this.sum(v1, v2);
          break;
        case "-":
          this.currentValue = this.subtract(v1, v2);
          break;
        case "\u00d7":
          this.currentValue = this.multiply(v1, v2);
          break;
        case "\u00f7":
          this.currentValue = this.divide(v1, v2);
          break;
      }

      return this.currentValue.toString().replace(".", ",");
    }

    showResult(){

      if (this.accumulator == ""){
        return;
      }

      const currentValue = this.operateNow(
        +this.accumulator.slice(0, -2).replace(",", "."),
        +this.expression.replace(",", "."),
        this.accumulator.slice(-1)
      );

      this.accumulator = "";
      this.expression = currentValue;
      this.updateDisplay(true, true);
    }

    executeMathOperation(text: string) {

      if (this.accumulator == ""){
        this.accumulator = `${expression} ${text}`;
        this.expression = "0";
      } else {
        if (expression == "0"){
          this.accumulator = `${this.accumulator.slice(0, -2)} ${text}`
        } else {
          const currentValue = this.operateNow(
            +this.accumulator.slice(0, -2).replace(",", "."),
            +this.expression.replace(",", "."), 
            text
          );

          this.accumulator = `${currentValue} ${text}`;
          this.expression = "0";
        }
      }

      this.updateDisplay(true, true);

    }

    operate(text: string) {

      //calculator operations
      switch (text.toLowerCase()) {
        case "ce":
          this.clearCurrentExpression();
          break;
        case "c":
          this.clearAll();
          break;
        case "":
          this.clearLastCharInExpression();
          break;
        case "=":
          this.showResult();
          break;
        default:
          this.executeMathOperation(text);
          break;
      }
    }
  }

  function handleClick(e: any) {
    //object for to control of the calculator
    const calc = new Calculator(accumulator, expression);
    const text = e.target.innerText;
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
        <Buttons
          buttons={buttons}
          onClick={handleClick}
        />
      </Container>
    </Container>
  )
}

export default App;