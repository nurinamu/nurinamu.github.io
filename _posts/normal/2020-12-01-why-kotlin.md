---
title : Why Kotlin?
layout : default
category : normal
description : 왜 Kotlin을 써야하지? 에 대한 물음을 나에게 던져서 그 썰을 풀어본다.
---
## Why [Kotlin](https://kotlinlang.org/)?

지난 [Kotlin 컨퍼런스](https://www.nurinamu.com/dev/2019/12/08/recap-kotlinconf-2019/)에서 정말 [Kotlin](https://kotlinlang.org/)의 기능적으로 환상적인 이야기들과 젯브레인이 그리는 Kotlin에 대한 거대한 야망들을 들을 수 있었지만, 발표자들이 이구동성으로 이야기하는 why kotlin? 에 대한 이야기는 다들 `Joyful`, `Fun Fun Fun` 이었다. 한 마디로 `즐겁다`라는 것. 그래서 글을 써본다. 이 글을 보고 Kotlin을 쓰고 안쓰고는 상관없다. 우리에게 개발 언어란 어떤 존재이고 나는 왜 Kotlin을 사용하고, 많은 분들이 썼으면 좋겠다라고 생각하는지 이야기를 해보겠다. 마지막에 그래서 나에게 맞는 언어가 무엇인지 한 번 고민해보면 그거대로 좋은 타임킬링이 되지 않을까 생각한다.

그럼 이제 `약`을 팔아보자.

이야기의 시작으로 나는 이제 개발자의 입장, 코드를 작성해가는 우리는 모두가 `코드소설가`라는 입장에서 이야기 해보려고 한다. 두 직업 모두 타이핑을 하고 창작의 고통을 가지는 점에서 비슷하니까 ㅋ

S/W Engineer, 소프트웨어 개발자인 우리는 `입력 받은 Data`를 `다른 Data로 변경`하고 관리하는 각종 작업, 즉 Data 입출력을 코드로 작성하는 일을 한다. 정말 다양한 형태와 목적을 가지는 Data는 우리가 작성하는 이야기의 소재가 되고 그 목적이 된다. Data를 이리 저리 다루고 그 인과관계, 서사시를 써나가는게 코딩이 된다.

우리는 직업이 코드쟁이, 즉 이야기꾼이다보니, 이야기를 잘 쓰고 싶어한다. 이야기를 잘 쓴다는 것은 결국 좋은 코드를 만든다는 것과 같다.

### 좋은 코드는 뭐라고 정의해야할까..

성능이 좋고 버그 없는 코드도 당연히 좋은 코드이지만, 오랜 경험 바탕의 내 라떼 발언을 하자면 여러명이 참여하는 프로젝트에서는 한 명이 작성하는 코드 보다 다양한 사람들이 만질 수 있는 코드, `유지보수 가능한 코드`가 제일 좋은 코드라고 생각한다.

그래서 나에게 좋은 코드가 무어냐라고 한다면, 누가 보더라도 이해가 쉽고 어떤 이야기를 하려는지가 명확하게 나타나는 코드를 말한다.

나는 오랜 기간 `java`라는 언어를 사용해왔다. 사실 java를 처음 접한 것은 특별한 이유없이 처음 월급받게 해줄 수 있는 언어라서였다. 마치 소설가로 등단하려면 모두 경어체로 써야한다며, 나에게 글을 쓰려면 경어체로 써 라고 주입된 것 처럼. 내가 선택한 것이 아니라 주변의 권유로 사용하게 되었고. 그냥 그 문체를 잘 사용하는 법, 익숙해지는 법을 학습하며 오랜 기간 지내왔다. 연차가 쌓이고 다양한 경험을 해나가면서, 글쓰는데 다양한 문체가 있다는 것을 알았고 내가 쓸 이야기, 나의 이야기를 잘 풀어나갈 수 있을 것 같은 스타일의 언어가 Kotlin이 된 것이다. 이제서야 내가 처음 주도적으로 직접 선택한 언어인 것이다.

### 그래서 어떤점이? 왜?

Kotlin은 이야기를 더 즐겁고 이해하기 쉽게 만드는 장치가 많이 있다.

내가 좋아하는 이야기(코딩) 스타일은 체인형태로의 작성, 함수형의 형태로 작성하는 것이다. java에서 stream을 처음 써보고 빨리 모던 코딩 스타일을 써보고 싶었던 상태에 Kotlin의 [Scope function](https://kotlinlang.org/docs/reference/scope-functions.html)들은 너무 맘에드는 기능들이었다. 내가 코드를 써내려가는데 막힘이 없이 줄줄 써내려가도 코드 이해도가 그렇게 떨어지지 않는 장점이 있다. 물론 체이닝을 너무 남발하면 그거 자체로 이해도가 떨어지기 때문에 적절하게 끊어서 사용해야하는데, 앞서 이야기했듯이 우리는 Data의 서사시를 쓰고 있기 때문에 독자가 그 이야기 흐름(컨텍스트)를 놓치지 않도록 잘 유지해야한다. 

이에 필요한 장치가 내가 보기에는 Data 무결성 유지인데. Data가 막 바뀌거나, 그 상태가 보이지 않는 곳에서 바뀌거나 해버리면 이야기의 흐름이 끊어져 버리기 쉽다.이놈이 이놈이고 저놈이 저놈이고 이야기 속 등장인물들의 캐릭터가 휙휙 바뀌어버리면 이야기가 복잡해지고 독자가 읽다지쳐 떠나가게 된다. Kotlin은 `한번 선언으로 무결성을 강제할 수 있고 유지할 수 있는 기능들이 있다`. 코드 이해도를 더 높일 수 있게 도와주고, 함수형 프로그래밍 지원에 적극적이라 순수 함수 작성을 해나가기 편해서 Data의 State처리가 밖으로 드러나도록, 즉 함수의 역할 이해가 잘 되도록 설계할 수 있게 해준다.(왜 함수형 프로그래밍 작성이 좋은지는 [why funtional matter?](https://www2.slideshare.net/nurinamu/why-functional-programming-matters-82560104) 참고)

그리고 Kotlin은 `그 지긋지긋한 Null과 멀어질 수 있다`. 이야기의 문맥을 잘라먹는 null check를 정말 많이많이 지울 수 있다, 그래서 스토리라인에 NPE의 불안감 따위는 없다. **[Null Safety](https://kotlinlang.org/docs/reference/null-safety.html) 만세!!**

Kotlin은 코드 라인수도 java보다 확연히 줄일 수 있어 내가 하고자하는 이야기를 한 눈에 들어올 수 있게 이야기를 쓸 수 있다.

마지막으로 이제는 Kotlin 이야기에서 뺴놓을 수 없는 `코루틴`도 좋은 코드 작성을 위한, 내가 이야기하는 글쓰기 관점으로 좋은 장치 중 하나라고 생각한다. 비동기 프로그래밍을 하는데 있어 가장 핫한 [RX](http://reactivex.io/)는 RX에 대한 기초 지식이 적은 독자들의 이해를 어렵게 만든다. 체이닝이란 관점에서는 정말 강력한 기능들을 제공하지만 그간 나에게 익숙했던 구조형 데이터들을 처리하는게 아니라 데이터 흐름을 이해하고 그 수많은 편의 함수들을 학습하는 시간이 필요하다([참고 - 비동기 프로그래밍 테크닉](https://www.nurinamu.com/trans/2019/02/01/asynchronous-programming-techniques/)). 하지만 코루틴은 간단한 예약어의 추가만으로 기존 코드를 그대로 사용할 수 있어. 쉽게 이해하고 쉽게 비동기 프로그래밍을 할 수 있다. 화려한 미사어구로 보기에는 멋있지만 내용을 어렵게 만드느냐, 아니면 이해하기 쉽게 간결한 말로 이야기를 써내려가느냐의 관점에서, 성능을 떠나 코루틴이 더 나에게 좋은 코드 문법이라고 생각된다.

이 외에도 다양한 이유가 있지만 위의 장점이 내가 Kotlin을 선택한데 가장 큰 영향을 준 부분이라 할 수 있겠다.

### Kotlin 쓰세요 두 번 쓰세요

내가 써내려가는 이야기(=코드)를 많은 사람들이 쉽게 공감하고, 이해할 수 있게하고, 내가 쓴 이야기를 모티브로 또 많은 이야기들이 파생되는 것을 상상하면 너무 즐겁다. 좋은 코드 작성을 위한 방법이 언어의 특징만으로 되는 것은 아니고 추가적인 패턴이나 경험의 부분도 크지만, 언어의 장치들도 무시할 수 없기에 Kotlin의 언어적 장치는 내가 글쓰기 편하게 하고 타이핑을 즐겁게 할거라 생각한다. 즐거운 마음으로 만들어야 내가 전달하는 내용도 즐거운 결과를 만들어 낼 수 있지 않을까? 

Kotlin은 아직도 계속 발전 중이기에 코드로 이야기를 써내려가는 많은 개발자분들이 나에게 맞는 방식은 무엇이지 라고 고민할 때, 나는 감히 Kotlin을 추천한다. 

```
즐겁게 쓰자 Kotlin. 즐거운 개발 생활을 위해.
```

여기까지 Kotlin 헌정 팬레터겸 홍보 였습니다. :-)