
![그림판](https://user-images.githubusercontent.com/68775082/138700438-0e3ed67c-fb11-4cdd-9925-f466a0014e0c.png)



>더 다양한 메소드와 자바스크립트 동작을 익히기 위해 바닐라 자바스크립트로 프로젝트를 진행해보기로 하였다

## 🔮진행상황
---

### 📃기간은? 3일
### 💫 목표는? 
 - 바닐라자바스크립트로 프로젝트를 진행하면서 다양한 메서드들을 익히고 함수 작동 방식을 공부할 수 있다. 또 익숙한 그림판을 구현하면 더 재밌게 코딩할 수 있다고 생각했다!
 
 
### ⚙ 무엇을 구현하였나?
- 캔버스에 `선`이 그려지고 전체 `채우기`를 할 수 있다.
- 팔레트를 이용하여 다양한 색상을 사용할 수 있다.
- brush의 두께를 조절할 수 있다. 

<br>


## ✅ 구현상황
---
  


### 1) 캔버스에 선을 그려보자

먼저 js에서 html의 `canvas`에 접근하여 `getContext()`라는 메서드를 사용한다. 이 메서드는 드로잉 컨텍스트를 반환한다. 

파라미터로 **contextType**이 들어올 수 있는데 여기에 **2d**객체를 생성하였다.

```js
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;

```


<br>

다음, 캔버스 위에서 마우스를 움직일 때, 클릭을 하면서 그려질 떄를  **(true)**,
마우스가 캔버스 위에서 벗어날 때, 클릭한 마우스에서 손을 뗐을 때 **(false)**를 설정한다고 생각하고 이벤트와 함수를 설정해주었다. 




```js

let painting = false;



function startPainting() {
  painting = true;
  //z클릭했을때
}

function stopPainting() {
  painting = false;
  ///클릭 손을 떼었을때, 캔버스밖을나갔을때
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
```


<br>

변수 `painting`에 `false`로 초기값을 지정해주었다. 이 변수는 **그려지는 선**을 감지하기 위해 설정해주었다. 

**startPainting**은 클릭을 한 상태로 그려질 때를 생각하여 **painting**에 **true**가 할당된다.
그리고 canvas의 이벤트 리스너에 **mousedown**이 된다면 실행되는 함수로 추가하였다. 

**stopPainting**은 클릭을 한 상태가 멈춰지거나 캔버스 밖을 벗어났을 때를 생각하여 **painting**에 **false**가 할당된다. 그리고 이 함수를 **mouseup**과**mouseleave** 의 이벤트가 일어날 때 실행되는 함수로 추가하였다. 

하지만 이 상태에서는 캔버스에 어떠한 변화도 없다. 

캔버스 위에서 마우스를 감지하기 위해서 이벤트리스너 **mousemove**가 실행될 때 **mouseMove** 함수가 실행된다.


<br>


마우스 좌표를 설정하기 위해 `event.offsetX`와 `offsetY` 메서드를 각 변수에 할당한다.
 
 
```js
ctx.strokeStyle = "#2c2c2c";
 
function mouseMove(event) {

  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    //새로운선을 그리겠다고 선언함
    ctx.moveTo(x, y);
    ///시작좌표를 시작점나타냄
   
  } else {
    ctx.lineTo(x, y);
    // 좌표로 어디까지 그리는지 나타낸다
    ctx.stroke();
  }

}

```




- console을 확인하면? ![](https://images.velog.io/images/duswn38/post/f0bc8388-2187-486a-b27e-7f5cdffceced/11.PNG)


캔버스 위에 x,y좌표가 마구 찍힌다!

<br>


그리고 여기서 if문 실행=> 
만약에 **painting이 false**라면 `ctx.beginPath()`메서드와 `ctx.moveTo()` 메서드가 실행된다. if가 실행되면 화면에 선이 그려지는 것이 아니고 계속해서 좌표를 인식만 하고 있는 상태다! 

그리고 **painting이 true**라면 `ctx.lineTo()`메서드와 `ctx.stroke()` 메서드가 실행된다. 여기서 **stroke** 메서드로 인하여 화면에 그려지는데 그려지는 선의 색상을 초기값을 설정해주었다.

<br>

> 
beginPath() 
- 새 경로를 만드는 메서드

>lineTo()
- 지정된 (x,y) 좌표로 선을 연결하는 메서드

> stroke()
- 윤곽을 그려주는 메서드


- 구현
![](https://images.velog.io/images/duswn38/post/511f5c02-6458-480f-9427-5ae58959d386/22.PNG)


<br>


### 2) 팔레트의 색상과 브러쉬크기를 바꿔보자

<br>


먼저 html에서 설정한 팔레트와 range타입으로 설정한 input의 class명을 가져온다
![](https://images.velog.io/images/duswn38/post/27c27206-b4ff-4ae1-a140-c930df121f05/33.PNG)


- js
```js

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");


ctx.lineWidth = 2.5;
//그리는 붓의 너비 2.5로 설정

```

<br>


- 그리고 html에서 가져온 클래스를 담은 변수 **colors**를 콘솔로 확인해 본다면?

![](https://images.velog.io/images/duswn38/post/26990fc0-dca2-4498-91bf-6bdebf595cc2/44.PNG)

<br>


**HTML Collection**으로 가져온다. 이것을 array로 만들기 위해서 **array.from()**메서드는 사용한다.  


- console.log(Array.from(colors)) 을 확인해본다면?
![](https://images.velog.io/images/duswn38/post/311cf961-00cc-4d95-8246-02b640432d5c/55.PNG)
<br>


위 메서드는 **obeject**를 **array**로 만든다 
만든 배열을 **forEach()** 메서드를 사용하여 배열 요소 각각에 대해 `click`이벤트가 일어나면 `changeColor`가 실행되는 함수를 추가해주었다




```js
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

```

<br>



**클릭 이벤트**가 일어나 **chageColor()**가 실행된다면?


```jsx
function changeColor(event) {
  /// console.log(event.target.style.backgroundColor); 
  ////컬러 코드가 나온다!
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

```


클릭한 테그의 **event.target.style.backgroundColor**를 변수에 저장해준다. 
그리고 그 변수를 **strokeStyle** 캔버스의 strokeStyle에 할당한다.
그러면 팔레트를 활용하여 색을 바꿀 수 있다!

<br>

**브러쉬의 경우,** if문을 실행하여 이벤트와 실행될 함수를 설정해준다.

```js

function rangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}


if (range) {
  range.addEventListener("input", rangeChange);
}
```

input에서 선택된 **target의 value**가 **size**변수에 저장되고 저장된 변수는 **ctx.lineWidth** 캔버스에 그려지는 선의 두께에 저장된다! 

**Brush**의 경우 최솟값, 최대값, 조절되는 값 자체를 **html**에서 설정할 수 있다. 

<br>





 


### 3) 🎨'그리기'모드와 '채우기'모드를 설정해보자

```js
function modeChange(event) {

  if (filling === true) {
    filling = false;
    mode[0].innerText = "FILL";
    console.log("if실행");
    ///PAINT상태 true
  } else {
    filling = true;
    mode[0].innerText = "Paint";
    console.log("else실행");
    ////FILL상태 false
  }
}
```


if문을 실행되면(PAINT버튼을 눌럿을 때) paint상태로 선을 사용하여 캔버스에 그려지면서 
**fillng상태를 false로 변경하고 버튼의 텍스트를 "FILL"로 변경한다.** 

else가 실행되면(FILL버튼을 눌렀을 때) 캔버스 전체를 채울 수 있는 상태가 되면서 **filling상태를 true로 변경하고 버튼의텍스트를 "PAINT"로 변경한다**. 

현재 두 상태에서는 선만 사용할 수 있다.(**mouseMove**함수만 실행되고 있는 상태!) 캔버스를 채우기 위해선 `filling `상태를 사용하면 가능하다.


```js
function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 600, 600);
    console.log("gd");
    ///캔버스 전체 채움
  }
  // ctx.fillRect(0, 0, 600, 600);
}

```

`canvasClick`이라는 함수에 click이벤트리스너를 걸어주고, if문을 작성하는데 **filling이 true일때, 이 상태는 버튼이 PAINT로 변경되면서 "채우기"를 할 수 있는 상태이다.** 그리고 ``canvas2d.fillRect()`` 메서드를 사용하여 x,y좌표와 캔버스전체(width,height)크기를 설정해주면 캔버스채우기가 가능하다! 
