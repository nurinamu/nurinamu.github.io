---
title : 비동기 프로그래밍 테크닉
layout : default
category : trans
tags : async, kotlin, coroutines
description : kotlin 코루틴에 대한 좀 더 정확한 이해와 학습을 위해 kotlin 사이트에 개시된 튜토리얼을 번역하며 공부해본다.
---

# 비동기 프로그래밍 테크닉 (Asynchronous Programming Techniques)

> #### 번역
해당 번역은 정식 번역이 아닌 학습을 위한 개인 번역입니다. 참고 부탁드립니다. **nurinamu**

원문 [Asynchronous Programming Techniques](http://kotlinlang.org/docs/tutorials/coroutines/async-programming.html)

이 튜토리얼은 비동기 프로그래밍의 다른 접근 방법을 설명한다.

수십년간, 우리 같은 개발자들은 앱이 블럭킹되는 것을 어떻게 방지할 것인지에 대한 문제를 맞닥드리고 있다. 데스크탑, 모바일, 심지어 서버사이드 앱들을 개발할 때에도 우리는 사용자가 대기하거나 앱이 버틀넥 이슈로 나빠지는 것을 방지하기 위해 스케일링 되는 것을 피하고 싶어한다.

여기 이런 문제를 해결하기 위한 다양한 접근 법들이 있다 :

- Threading
- Callbacks
- Futures, Promises et al.
- Reactive Extensions
- Coroutines

코루틴(Coroutines)이 무엇인지에 대하여 설명하기 이전에 몇가지 다른 솔루션들을 간단하게 짚어보자.

### Threading

쓰레드는 아마도 가장 잘 알려진 블러킹 회피 방법일 것이다.

```kotlin
fun postItem(item: Item) {
    val token = preparePost()
    val post = submitPost(token, item)
    processPost(post)
}
​
fun preparePost(): Token {
    // makes a request and consequently blocks the main thread
    return token
}
```

위의 코드에서 preparePost는 처리가 오래걸리고 사용자 인터페이스가 블럭된다고 가정하자. 이것은 쓰레드를 분리하여 실행 시킬 수 있다. 이것은 UI가 블럭킹되는 것을 회피할 수 있게한다. 매우 일반 적인 방법이지만 문제점들을 가지고 있다 :

- 싸지가 않다. 쓰레드는 고비용의 context 변경을 필요로 한다.
- 한계가 있다. OS가 정한 한계 숫자 안에서만 실행 가능하다. 서버 영역에서는 이 것이 주요 병목 원인이 될 수 있다.
- 항상 가능한 것이 아니다. 자바스크립트 같은 몇몇 플랫폼에서는 쓰레드를 지원조차 하지 않는다. 
- 쉽지가 않다. 경쟁 상황을 피하기 위한 쓰레드들을 디버깅 하는 것은 멀티 쓰레드 프로그램에서 자주 겪는 힘든 일이다.

###Callbacks

콜백(callbacks)은 하나의 함수를 다른 함수로 파라미터로 전달하는 것이다. 이것은 완료시점에 한번만 호출된다.

```kotlin
fun postItem(item: Item) {
    preparePostAsync { token -> 
        submitPostAsync(token, item) { post -> 
            processPost(post)
        }
    }
}
​
fun preparePostAsync(callback: (Token) -> Unit) {
    // make request and return immediately 
    // arrange callback to be invoked later
}
```

이 원리는 아주 우아한 해결책으로 느껴진다 하지만 이것도 몇가지 문제가 있다:

- 내부 콜백의 어려움. 보통 콜백으로 사용되는 함수는 결국 자체 콜백을 필요로 하게된다. 이것은 이해하기 어려운 코드를 만들어 내는 연쇄 내부 콜백을 야기하게된다. 이 패턴은 종종 크리스마스 트리라는 이름으로 언급이 된다. 

- 애러처리가 복잡하다. 내제 모델은 애러 처리와 애러 처리 전파를 더 복잡하게 한다.

콜백은 자바스크립트와 같은 이벤트 루프 아키텍쳐에서는 매우 일반적인 것이다. 하지만 자바스크립트에서 조차도 보통 프로미스나 리액티브 익스텐션 같은 다른 접근 법을 사용하려고 옮겨간다.

###Futures, Promises 등과 나머지

futures나 promises(언어/플랫폼에 따라 불리우는 다른 단어들도 있다)의 아이디어 배경은 호출했을 때, 특정 시점에 Promise로 불리는 처리가능한 객체를 반환하게다고 보장하는 것이다.

```kotlin
fun postItem(item: Item) {
    preparePostAsync() 
        .thenCompose { token -> 
            submitPostAsync(token, item)
        }
        .thenAccept { post -> 
            processPost(post)
        }
         
}
​
fun preparePostAsync(): Promise<Token> {
    // makes request an returns a promise that is completed later
    return promise 
}
```

이 접근은 프로그래밍 방법의 몇가지 변화가 필요하다. 특히.

- 다른 프로그래밍 모델. 콜백과 같은 프로그래밍 모델은 폭포수 접근법을 떠나 연쇄 호출과 합성 모델로 이동한다. 반복문, 예외처리 등 같은 전통적인 프로그래밍 구조체는 더이상 이러한 모델에 맞지가 않는다.

- 다른 API. 플랫폼 별로 다양한 thenCompose, thenAccept 같은 완전히 새로운 API를 학습해야한다.

- 명시된 반환 type. 반환 타입은 우리가 필요로하는 실제 데이터 대신에 값을 내재한 새로운 타입인 `Promise`로 반환한다.

- 오류 처리가 복잡해질 것이다. 애러의 전파와 처리가 항상 직접적이지가 않다.

###Reactive Extensions

리덱티브 익세텐션(Rx)는 [Erik Meijer](https://en.wikipedia.org/wiki/Erik_Meijer_(computer_scientist))에 의해 C#에서 소개되었다. 한동안 .NET 플랫폼 에서만 사용되어지고, Netflix가 RxJava라는 이름으로 Java에 포팅하기 전까지는 딱히 주류가 되지는 않았었다. 이후 자바스크립트 - RxJS 를 포함하여 다양한 플랫폼을 위해 여러 경로들이 제공되어졌다.

Rx의 아이디어 배경은 데이터를 이제는 `스트림`(무한한 양의 데이터)으로 고려하고 이 `스트림`은 관찰되어질 수 있다는 것이다 그리고 `observable streams`라 불리는 것을 어딘가로 전달하는 것이다. 실제 항목으로 Rx는 간단히 데이터 처리를 위해 몇가지 확장들을 포함한 [관찰자(Observer) 패턴](https://en.wikipedia.org/wiki/Observer_pattern)이다.

접근 방법으로 보면 Future와 매우 유사하지만 Future는 단일 데이터를 반환하고 Rx는 스트림을 반환한다. 또한 프로그래밍 모델에 대하여 완전히 새로운 사고 방식을 제시한다. 유명한 문구로

"모든 것은 스트림이고 관찰 가능하다."

문제들을 접근하는 다른 방법과 우리가 사용하는 것에서 동기화 코드를 작성하는 시점으로 매우 중요한 변화가 있다는 것을 의미한다. `Futures`와 반대로 한가지 장점은 여러 플랫폼에 포팅되어있다는 것이다. C#, Java, JavaScript나 Rx가 가능한 다른 어떤 언어를 사용하던 간에 일관된 API 경험을 할 수 있다.

게다가, Rx는 애러 핸들링에 대한 좋은 접근을 소개한다.

###Coroutines

비동기 코드를 작성하기 위한 코틀린의 접근은 연기 가능한(suspendable) 연산들의 아이디어(함수가 특정 포인트에서 실행을 연기할 수 있고 이후 다시 실행할 수 있는 아이디어)인 코루틴을 사용하는 것이다. 

개발자들에게 코틀린이 등장하였을 때 가장 좋은 장점은 논블럭킹 코드를 작성하는 것이 블럭킹 코드 작성하는 것과 동일하다는 것이다. 프로그래밍 모델 자체는 크게 바뀌지 않는다.

다음의 코드는 객체를 가져오는 것이다.

```kotlin
fun postItem(item: Item) {
    launch {
        val token = preparePost()
        val post = submitPost(token, item)
        processPost(post)
    }
}
​
suspend fun preparePost(): Token {
    // makes a request and suspends the coroutine
    return suspendCoroutine { /* ... */ } 
}
```

이 코드는 메인 쓰레드가 블럭킹 되지 않고 오랬동안 동작할 것이다. `preparePost`는 연기 가능한 함수(suspendable function)이라 불린다. 그래서 `suspend` 머릿말을 붙였다. 위에서 의미하는 것은 함수가 특정 시점마다 실행되고 실행이 멈추고 재시작 된다는 것이다.

함수 표현형태는 기존과 동일하다. 다른 점 한가지는 suspend가 추가된 것이다. 반환 type은 요구하는 형태 그대로이다. 코루틴(다른 챕터에서 확인할)을 시작하는 launch라는 함수를 사용한 것 이외에는 코드가 특별한 문법이 필요하지 않고 여전히 동기화 코드를 사용하는 것처럼 작성된다. 
프로그래밍 모델과 API는 동일하다. 반복문, 예외처리 등을 계속 사용할 수 있다. 그리고 새로운 API 세트를 학습할 필요가 없다.
코루틴은 플랫폼 독립적이다. JVM, Javascript 또는 어떤 플랫폼위에 있더라도, 코드는 동일하게 작성된다. 내부적으로 컴파일러가 각 플랫폼에 맞춰 처리한다.
코루틴은 새로운 컨셉도 아니고 코틀린에서 단독으로 발명한 것도 아니다. 코루틴은 수십년동안 존재해왔고 Go와 같은 다른 여러 언어에서 인기가 있다. 코틀린으로 구현 된 것을 주목해야할 것은 대부분의 기능들이 라이르러리로 되어졌다는 것이다. 사실 `suspend` 키워드 이외의 추가된 키워드가 없다. async, await 같은 문법을 가진 C#과 같은 언어들과의 차이이다. 코틀린에서는 단지 라이브러리 함수일 뿐이다.

코루틴과 다른 가능성들에 관한 추가 정보는 레퍼런스 문서를 참고해라 