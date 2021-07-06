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
### 3.2. 함수에서 state 사용법 hook
### 4.1. 클래스에서 라이프 사이클 구현 하기
### 4.2.1. 함수에서 라이프 사이클 구현 하기 - 실습준비
### 4.2.2. 함수에서 라이프 사이클 구현 하기 - useEffect
### 4.2.3. 함수에서 라이프 사이클 구현 하기 - clean up
### 4.2.4. 함수에서 라이프 사이클 구현 하기 - skipping effect

## 섹션 2. 마무리
### 5. 총정리 겸 수업을 마치며