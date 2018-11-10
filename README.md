# chrome-extension-saramin

saramin의 버그를 수정하고, 필요시 기능을 확장하기 위한 chrome extension 이다.

## 기능
### 조회를 원하는 사람의 개인정보를 불러오지 못하는 버그 극복 (**#B1**)
* 단축키: `Ctrl+Shift+Z`(windows, linux), `Command+Shift+Z`(mac)
* 설명: 2018.11.10 기준, saramin은 chrome 등 IE 이외의 브라우저에서 조회를 원하는 사람의 개인정보를 불러오지 못하는 버그가 존재한다. 이 기능은 해당 버그를 해결한다.
* 기술적 접근: DOM 에서 `usemandb(candidateId)` 를 찾는다. `usemandb` 함수는 saramin 의 context 에 등록된 함수이므로 extension 에서는 직접 실행하지 못한다. 그러나 DOM 에는 접근이 가능하므로, extension에서는 `<body>` 에 보이지 않는 버튼(`onclick` 핸들러로 `usemandb(candidateId)`을 등록)을 추가하고 `click` 이벤트를 발생시켜 함수를 실행한다.

## 클립보드에 이메일 복사 (**#I1**)
* 단축키: `Ctrl+Shift+S`(windows, linux), `Command+Shift+S`(mac)
* 기술적 접근: DOM에 `<textarea>` 를 만들고 value 를 이메일로 설정한다. 이후 해당 `<textarea>` 를 `select()` 하고 `document.execCommand('copy');` 를 실행한다.

## 클립보드에 전화번호 복사 (**#I2**)
* 단축키: `Ctrl+Shift+X`(windows, linux), `Command+Shift+X`(mac)
* 기술적 접근: **#I1** 과 같다.