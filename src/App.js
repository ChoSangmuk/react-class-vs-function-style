import React, { Component, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="hello_container">
      <h1>Hello, World !</h1>
      <input type="button" value="FuncComp Toggle" onClick={function () {
        setFuncShow(!funcShow);
      }} />
      <input type="button" value="ClassComp Toggle" onClick={function () {
        setClassShow(!classShow);
      }} />
      {funcShow ? <FuncComp initNumber={2} /> : null}
      {classShow ? <ClassComp initNumber={2} /> : null}
    </div>
  );
}

var funcStyle = 'color:yellow';
var funcId = 0;
function FuncComp(props) {
  var [number, setNumber] = useState(props.initNumber);
  var [_date, setDate] = useState((new Date()).toString());

  useEffect(function () {
    console.log("%cfunc => SideEffect " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => CleanUp " + (++funcId), funcStyle);
    }
  });
  useEffect(function () {
    console.log("%cfunc => SideEffect [] (componentDidMount) " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => CleanUp [] (componentWillUnmount) " + (++funcId), funcStyle);
    }
  }, []);
  useEffect(function () {
    console.log("%cfunc => SideEffect [number, _date] " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => CleanUp [number, _date] " + (++funcId), funcStyle);
    }
  }, [number, _date]);

  console.log("%cfunc => return (render) " + (++funcId), funcStyle);
  return (
    <div className="function_container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={function () {
        setNumber(Math.random());
      }} />
      <input type="button" value="date" onClick={function () {
        setDate((new Date()).toString());
      }} />
    </div>
  );
}

var classStyle = 'color:red';
var classId = 0;
class ClassComp extends Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }

  // componentWillMount() { // 사용이 금지됨
  //   console.log("%cclass => componentWillMount "+(++classId), classStyle);
  // }
  componentDidMount() {
    console.log("%cclass => componentDidMount " + (++classId), classStyle);
  }
  shouldComponentUpdate(newProps, newState) {
    console.log("%cclass => shouldComponentUpdate " + (++classId), classStyle);
    return true;
  }
  // componentWillUpdate(newProps, newState) { // 사용이 금지됨
  //   console.log("%cclass => componentWillUpdate", classStyle);
  // }
  componentDidUpdate(newProps, newState) {
    console.log("%cclass => componentDidUpdate " + (++classId), classStyle);
  }
  componentWillUnmount() {
    console.log("%cclass => componentWillUnmount " + (++classId), classStyle);
  }

  render() {
    console.log("%cclass => render " + (++classId), classStyle);
    return (
      <div className="class_container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={function () {
          this.setState({ number: Math.random() })
        }.bind(this)} />
        <input type="button" value="date" onClick={function () {
          this.setState({ date: (new Date()).toString() })
        }.bind(this)} />
      </div>
    );
  }
}

export default App;