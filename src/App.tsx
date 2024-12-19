import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const trimmedExpression = expression.trim();

  const isOperator = (symbol: string) => /[*/+-]/.test(symbol);

  const buttonPress = (symbol: string) => {
    switch (symbol) {
      case "clear":
        setAnswer("");
        setExpression("0");
        break;
      case "negative":
        if (answer === "") return;
        setAnswer(answer.charAt(0) === "-" ? answer.slice(1) : "-" + answer);
        break;
      case "percent":
        if (answer === "") return;
        setAnswer((parseFloat(answer) / 100).toString());
        break;
      case "=":
        calculate();
        break;
      case "0":
        if (expression.charAt(0) !== "0") {
          setExpression(expression + symbol);
        }
        break;
      case ".":
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if (!lastNumber || lastNumber.includes(".")) return;
        setExpression(expression + symbol);
        break;
      default:
        if (isOperator(symbol)) {
          setExpression(trimmedExpression + " " + symbol + " ");
        } else {
          setExpression(
            expression.charAt(0) === "0" ? expression.slice(1) + symbol : expression + symbol
          );
        }
    }
  };

  const calculate = () => {
    if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) return;

    const parts = trimmedExpression.split(" ");
    const rearrangedParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        rearrangedParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        rearrangedParts.unshift(parts[i]);
      }
    }

    const newExpression = rearrangedParts.join(" ");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }

    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() => buttonPress("clear")} className="gray">C</button>
          <button id="negative" onClick={() => buttonPress("negative")} className="gray">+/-</button>
          <button id="percentage" onClick={() => buttonPress("percent")} className="gray">%</button>
          <button id="divide" onClick={() => buttonPress("/")} className="white">/</button>

          <button id="seven" onClick={() => buttonPress("7")} className="black">7</button>
          <button id="eight" onClick={() => buttonPress("8")} className="black">8</button>
          <button id="nine" onClick={() => buttonPress("9")} className="black">9</button>
          <button id="multiply" onClick={() => buttonPress("*")} className="white">*</button>

          <button id="four" onClick={() => buttonPress("4")} className="black">4</button>
          <button id="five" onClick={() => buttonPress("5")} className="black">5</button>
          <button id="six" onClick={() => buttonPress("6")} className="black">6</button>
          <button id="subtract" onClick={() => buttonPress("-")} className="white">-</button>

          <button id="one" onClick={() => buttonPress("1")} className="black">1</button>
          <button id="two" onClick={() => buttonPress("2")} className="black">2</button>
          <button id="three" onClick={() => buttonPress("3")} className="black">3</button>
          <button id="add" onClick={() => buttonPress("+")} className="white">+</button>

          <button id="zero" onClick={() => buttonPress("0")} className="black">0</button>
          <button id="decimal" onClick={() => buttonPress(".")} className="black">.</button>
          <button id="equals" onClick={() => buttonPress("=")} className="white">=</button>
        </div>
      </div>
    </>
  );
}

export default App;

