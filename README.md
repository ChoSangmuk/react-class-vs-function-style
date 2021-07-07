# react-class-vs-function-style

- [인프런(생활코딩 - React class vs. function style coding)](https://www.inflearn.com/course/react-class-function-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/dashboard)
- [생활코딩 홈페이지](https://opentutorials.org/module/4600)
- [Youtube divide](https://www.youtube.com/watch?v=iY_vmP-Q3Ak&list=PLuHgQVnccGMCEfBwnNGsJCQDiqSWI-edj)
- [강사 github](https://github.com/egoing/react-function-vs-class-style)

## 섹션 0. 오리엔테이션
### 1. 수업 소개
- [이전 수업 정리](https://github.com/ChoSangmuk/opentutorials-react-app)
- React의 컴포넌트는 클래스와 함수 문법으로 작성될 수 있으며 각기 장단점이 있음
- 초기의 React에서 함수 컴포넌트는 State와 LifeCycle를 사용할 수 없었음. 함수 컴포넌트는 단순한 컴포넌트에서만 사용되었음
- Hook이 도입됨에 따라 함수 컴포넌트에서도 클래스 컴포넌트의 기능을 사용할 수 있게됨

### 2. 수업의 목표
- 개념 설명을 위한 예제 작성이 목표, 같은 기능을 수행하는 코드를 작성
- 3개의 컴포넌트로 app을 구성
  - 함수 스타일
  - 클래스 스타일
```bash
# Shell
npx create-react-app .
npm start
```
- index.css 내용 삭제
- App.js, App.css 수정
```js
// App.js
import { Component } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello, World !</h1>
      <FuncComp></FuncComp>
      <ClassComp></ClassComp>
    </div>
  );
}

function FuncComp() {
  return (
    <div className="container">
      <h2>function style component</h2>
    </div>
  );
}

class ClassComp extends Component {
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
      </div>
    );
  }
}

export default App;
```
```css
// App.css
.container{
    border:5px solid red;
    margin:5px;
    padding:5px;
}
```
- 함수 컴포넌트는 자기 자신이 render 메소드인 셈

## 섹션 1. React class vs. function style
### 3.1. 클래스에서 state 사용법
- 상위 Component는 하위 Component가 제공하는 속성(Props)를 통해 하위 컴포넌트를 이용
- 컴포넌트 내부에서는 State 라는 데이터를 통해 내부 작업을 진행
- Props는 두 스타일 모두에서 사용 가능
- State는 클래스 컴포넌트에서만 사용 가능 했었음
  - 따라서, 함수 컴포넌트는 Props로 전달 받아온 값을 나타내주는 용도에만 그쳤음

<br>

- State를 사용하기에 앞서 우선 각 스타일 컴포너트에서 props의 사용법 비교
  - 클래스 컴포넌트의 경우, {this.props.propsName} 를 이용하여 사용
  - 함수 컴포넌트의 경우, React가 함수 컴포넌트를 호출할 때 첫번째 파라미터에 값으로 Props를 전달
```js
// App.js ...
function App() {
  return (
    <div className="container">
      <h1>Hello, World !</h1>
      <FuncComp initNumber={2}></FuncComp> {/* FuncComp에 initNumber props에 2라는 값을 전달 */}
      <ClassComp initNumber={2}></ClassComp> {/* ClassComp에 initNumber props에 2라는 값을 전달 */}
    </div>
  );
}

function FuncComp(props) {
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {props.initNumber}</p> {/* 전달 받은 props 사용 */}
    </div>
  );
}

class ClassComp extends Component {
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.props.initNumber}</p> {/* 전달 받은 props 사용 */}
      </div>
    );
  }
}
```
- State는 결국 변수 임으로 사용하기위해서는 선언과 초기화를 해야함
  - 클래스 컴포넌트의 경우, 클래스 내부에서 선언과 초기화 
  - 위에서는 전달받은 Props를 바로 사용했다면, 이제는 Props를 State에 저장해 두었다가 사용
  - State가 변경될 때(setState)마다 render함수가 실행
```js
// App.js ...
class ClassComp extends Component {
  state = { number: this.props.initNumber } // State에 Props 값을 저장

  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p> {/* State를 사용 */}
        <input type="button" value="random" onClick={function () {
          this.setState({ number: Math.random() }) // State를 변경
        }.bind(this)} />
      </div>
    );
  }
}
```

### 3.2. 함수에서 state 사용법 hook
- [React Hook 공식 페이지](https://ko.reactjs.org/docs/hooks-intro.html)
- React 내장 Hook과 사용자가 만들어낸 Hook이 있으며, 내장 Hook의 이름은 use 로 시작함

<br>

- 함수 컴포넌트에서 State를 사용하기 위해 useState라는 함수를 사용
- useState(Parm)는 2개의 인자를 가진 배열을 반환
  - 배열의 0번째 값은 Parm이 되고 이 값을 State로 사용
  - 배열의 1번째 값이 Hook이 제공하는 State를 바꾸는 함수, 즉 클래스 컴포넌트에서의 setState와 같은 함수
- 날짜 출력도 진행
```js
// App.js
import React, { Component, useState } from 'react'; // useState 사용을 위한 선언
// ...
function FuncComp(props) {
  var [number, setNumber] = useState(props.initNumber);
  var [_date, setDate] = useState((new Date()).toString());
  return (
    <div className="container">
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

class ClassComp extends Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  render() {
    return (
      <div className="container">
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
```
- 클래스 컴포넌트는 State 안에 state를 정의, 함수 컴포넌트에선 State 별로 useState 함수 사용
- this는 클래스 안에서 사용함으로 bind가 필요 없음

### 4.1. 클래스에서 라이프 사이클 구현 하기
- [Life Cycle](https://ko.reactjs.org/docs/react-component.html) - 컴포넌트의 생성과 소멸에 관여하는 API로 정해진 순서에 의해 실행됨
- [이미지 참고](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- 클래스 컴포넌트에서 LifeCycle 구현
```js
// App.js ...
var classStyle = 'color:red';
var classId = 0;
class ClassComp extends Component {
  // ...

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
    return ({/* ... */});
  }
}
```

### 4.2.1. 함수에서 라이프 사이클 구현 하기 - 실습준비
- 로그에 색상 입히기
```js
// App.js ... 
var funcStyle = 'color:yellow';
var funcId = 0;
function FuncComp(props) {
  var [number, setNumber] = useState(props.initNumber);
  var [_date, setDate] = useState((new Date()).toString());

  console.log("%cfunc => return " + (++funcId), funcStyle);
  return (
    <div className="container">
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
```

### 4.2.2. 함수에서 라이프 사이클 구현 하기 - useEffect
- 클래스 컴포넌트에서 LifeCycle API을 사용, 함수 컴포넌트에서는 useEffect(function() {})를 사용
  - 파라미터로 입력된 함수는 해당 함수 컴포넌트의 return이 종료된 후에 실행되도록 약속됨
  - 따라서, LifeCycle API의 componentDidMount, componentDidUpdate와 같은 역활을 수행할 수 있음
- 함수 컴포넌트의 주된 목적은 화면을 그리는 것, render 임으로 그 이후에 발생하는 일은 side effect로 볼 수 있음
- useEffect는 여러 개를 동시에 설치 가능함
```js
// App.js
import React, { Component, useState, useEffect } from 'react'; // useEffect 사용을 위한 선언
// ...
var funcStyle = 'color:yellow';
var funcId = 0;
function FuncComp(props) {
  var [number, setNumber] = useState(props.initNumber);
  var [_date, setDate] = useState((new Date()).toString());

  useEffect(function () {
    console.log("%cfunc => useEffect (componentDidMount & componentDidUpdate)" + (++funcId), funcStyle);
  });

  console.log("%cfunc => return " + (++funcId), funcStyle);
  return (
    <div className="container">
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
```

### 4.2.3. 함수에서 라이프 사이클 구현 하기 - clean up
- LifeCycle API에서 컴포넌트의 소멸, 정리, 청산 componentWillUnmount의 구현을 통해 진행했었음
- React 내장 Hook에서는 effect의 반환 값(return)으로 clean up을 담당할 함수를 전달하고, effect가 다시 실행되어야할 때 먼저 실행됨
```js
// useEffect 자동 완성 폼
  useEffect(function () { // 이 함수 내에서 effect 구현
    // ...
    return function () { // 이 함수 내에서 clean up 구현
      // ...
    }
  }, [input])
```
```js
// App.js ...
  useEffect(function () {
    console.log("%cfunc => useEffect (componentDidMount & componentDidUpdate)" + (++funcId), funcStyle);
    return function(){
      console.log("%cfunc => useEffect return (componentDidMount & componentDidUpdate)" + (++funcId), funcStyle);
    }
  });
```

### 4.2.4. 함수에서 라이프 사이클 구현 하기 - skipping effect
- LifeCycle API에서 성능 저하를 막기위해 이전의 Props, State 값과 비교하여 진행 여부를 판단했음
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
- useEffect 에서는 두번째 인자로 배열을 전달하고, 배열 안의 인자가 변경되었을 때만 useEffect 실행하게끔 지원
```js
// App.js ... 
  useEffect(function () { // componentDidMount 와 같이 처음 한번만 실행됨
    console.log("%cfunc => useEffect [] " + (++funcId), funcStyle);
    return function () { // componentWillUnmount
      console.log("%cfunc => useEffect return [] " + (++funcId), funcStyle);
    }
  }, []);

  useEffect(function () { // number 가 변경되었을 때 실행
    console.log("%cfunc => useEffect [number] " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => useEffect return [number] " + (++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function () { // _date 가 변경되었을 때 실행
    console.log("%cfunc => useEffect [_date] " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => useEffect return [_date] " + (++funcId), funcStyle);
    }
  }, [_date]);

  useEffect(function () { // number 혹은 _date 가 변경되었을 때 실행
    console.log("%cfunc => useEffect [number, _date] " + (++funcId), funcStyle);
    return function () {
      console.log("%cfunc => useEffect return [number, _date] " + (++funcId), funcStyle);
    }
  }, [number, _date]);
```

## 섹션 2. 마무리
### 5. 총정리 겸 수업을 마치며