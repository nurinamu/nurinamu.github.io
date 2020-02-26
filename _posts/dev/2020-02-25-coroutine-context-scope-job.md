---
title : CoroutineScope, CoroutineText, Job
layout : default
category : dev
tags : jekyll
description : 사내 프로젝트를 진행하면서 cache 갱신 부분을 coroutine을 통한 비동기 동시 처리를 하고 싶었는데 coroutine의 동작이 생각했던 방향과 차이가 좀 있어서 이유를 확인하려고보니 CoroutineContext와 Scope에 대한 이해가 좀 부족한 것 같아 이부분에 대한 이해가 좀 더 명쾌해지도록 공부하고 기록합니다.
---

## CoroutineScope, CoroutineText, Job 공부해보자

사내 프로젝트를 진행하면서 cache 갱신 부분을 coroutine을 통한 비동기 동시 처리를 하고 싶었는데 coroutine의 동작이 생각했던 방향과 차이가 좀 있어서 이유를 확인하려고보니 CoroutineContext와 Scope에 대한 이해가 좀 부족한 것 같아 이부분에 대한 이해가 좀 더 명쾌해지도록 공부하고 기록합니다.

## 학습 목표

- CoroutineContext, CoroutineScope, Job 간의 관계에 대한 이해
- Coroutine의 내부 동작에 대한 이해
- 서버사이드 Coroutine 사용시 주의해야 할 것들에 대한 정리
- 실제 kotlinx.coroutines github repo의 코드 Tour

## 학습 자료

### [Coroutine Context and Scope](https://medium.com/@elizarov/coroutine-context-and-scope-c8b255d59055)

- 뭐든 만든사람의 이야기와 동작 구조 이해하는게 우선
- "비슷한 형태의 것들에게 사용 의도가 다르다면 그 다름을 강조하기위해 명명을 달리준다."
- CoroutineContext
    - 모든 Coroutine은 context를 가지게되고 해당 context는 CoroutineContext의 구현체다.
    - context는 엘리먼트들의 세트고 coroutineContext property를 통해 현재 coroutine context에 접근 가능하다.
    - coroutine context는 immutable이다.
    - 하지만 plus op를 통해서 엘리먼트들을 추가가 가능하고 이로인해 새로운 context 객체가 생성된다.
- Job
    - 우리가 말하는 coroutine은 Job으로 표현된다.
    - coroutine의 생명 주기, 취소, 부모자식관계 등을 책임진다.
    - 현재 Job은 현재 coroutine context에서 접근가능하다.
- CoroutineScope
    - coroutineContext property 하나만 가지고 있다.
    - context를 제외하고는 아무것도 가진것이 없다. - 여기서 문제. 왜 CoroutineContext와 CoroutineScope 명칭을 달리 존재하는 걸까!?
    - context와 scope는 `의도하는 목적(intented purpose)`이 다르다

<img src="https://miro.medium.com/max/4596/1*zuX5Ozc2TwofXlmDajxpzg.png" width="600" style="align:center">

- coroutine은 launch함수를 통해 생성이 되는데 launch함수는 context를 가진 CoroutineScope의 extension 함수로 제공된다. 그리고 launch는 CoroutineContext를 parameter로 넘겨 받는다 결국 launch함수를 통해 두개의 CoroutineContext를 핸들링하게 되는데 그 이유는 새로 생성되는 Job(=coroutine)에 child context를 전달해주기 위함이다.
    - 내가 그래서 context와 scope의 이해하기로는 scope은 본인이 가지고 있는 하나의 context가 영향을 주는 범위를 한정하기 위해 정의된 것으로 보인다. launch함수 호출시 새로운 context 첨부하지 않으면 EmptyCoroutineContext가 기본으로 설정되는데 그말은 새로운 CoroutineContext추가 없이 현재 launch함수의 scope에서 해당 coroutine을 수행하겠다는 뜻이된다. 
    - context가 plus되어 부모/자식 관계가 생기는 시점에 context가 합쳐지는 것은 context가 가진 엘리먼트들이 합쳐진다는 것이다. 이때 scope context의 엘리먼트보다 parameter context의 엘리먼트가 우선시된다.고 써있다.(It merges them using plus operator, producing a set-union of their elements, so that the elements in context parameter are taking precedence over the elements from the scope.)
    - 그리고 scope context에 포함된 엘리먼트들은 parent로서 새로 생성되는 child context에 상속되어 사용할 수 있게된다.
    - 결국 scope는 context영역의 한정과 새로운 context에게 상위 엘리먼트의 상속을 가능하게 하기위한 의도(intended purpose)로 만들어진 것이다.
    - 이것을 보고 이해가 되기 시작했는데 궁금점이 생긴다. 그럼 CoroutineContext가 가지고 있는 `엘리먼트들?은 과연 어떤 것들일까?`(나중에 코드 까보면서 확인해보자)
- 함수 반환 이후에도 백그라운드에서 동작하는 coroutine을 수행하고 싶다면 CoroutineScope에 확장함수를 만들어서 수행하거나 CoroutineScope을 넘겨 받아 수행하도록 하면 된다. 해당 함수는 suspend로 만들어선 안된다.

```kotlin
fun CoroutineScope.doThis() {
    launch { println("I'm fine") }
}

fun doThatIn(scope: CoroutineScope) {
    scope.launch { println("I'm fine, too") }
}
```

### [The reason to avoid GlobalScope](https://medium.com/@elizarov/the-reason-to-avoid-globalscope-835337445abc)

- GlobalScope가 백그라운드 작업 수행을 위해 서버사이드에서는 간편한 기능으로 쓰고 싶은데, 담당 개발자가 떡하니 이런 글을 써놓았으니 읽어봐야겠다.
- GlobalScope의 Dispatcher와 launch 기본 Dispatcher는 Dispatchers.Default로 동일 해서 마치 두개의 launch 함수 동작은 동일 할 것 같지만 실제로 runBlocking 하위에서 동작해보면 둘의 동작이 다르다.
- 결국 Scope의 lifetime 관리를 쉽게할 수 있느냐의 여부. GlobalScope를 사용하면 이전 scope 연계를 무시하고 바로 global coroutine에서 동작하기 때문에 해당 coroutine으로 생성된 job으로 lifetime 관리를 해주지 않으면 원하는 동작결과를 얻을 수 없다.
- 하지만!! 굳이 job control이 필요 없다면 쓸 수 있지 않을까?
    - App 개발자인 경우 Coroutine에서 UI resource release등의 작업을 처리하는 일이 있어 해당 작업이 leakage를 일으킬 가능성 때문에 중요하지만 서버사이드 작업에 resource release같은 작업이 없다면 문제 없을(question) 것 같다.
    - 테스트를 좀 해보자.


## 코드 Tour
- CoroutineScope.launch - ([Builders.common.kt](https://github.com/Kotlin/kotlinx.coroutines/blob/master/kotlinx-coroutines-core/common/src/Builders.common.kt))
    - 로만 블로그에서 설명하는 Scope, Context 구분 통합의 중요한 함수 코드
    - CoroutineScope.newCoroutineContext - ([jvm/src/CoroutineContext.kt](https://github.com/Kotlin/kotlinx.coroutines/blob/master/kotlinx-coroutines-core/jvm/src/CoroutineContext.kt)) 
        - 실제로 context를 합치는 동작을 하는 곳
        - multi platform 지원을 위해 js/jvm/native 로 분리 구현되어있다. 일단 jvm만 먼저 보자.
    - CoroutineContext.plus operator - ([stdlib/CoroutineContext.kt](https://github.com/JetBrains/kotlin/blob/1e5d973bb16c841e090cc643f845f679af7be2ff/libraries/stdlib/src/kotlin/coroutines/CoroutineContext.kt))
        - 실제 Context 통합 코드. Element interface도 가지고 있음.
        - CoroutineContext iterface 파일은 stdlib에 들어있고 op를 제외한 CoroutineContext의 실제 구현 함수들은 모두 kotlinx.coroutine에 들어있다. 라이브러리 의존성 이슈 때문에 이렇게 해놓은 것 같다. 신기한 패턴이다. 참고
        - 그래서 CoroutineContext.kt 가 kotlinx에도 있는데 이건 actual 구현만 있음.
- [interface Element](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.coroutines/-coroutine-context/-element/index.html)
    - context가 들고 있는 것들.
    - Element도 CoroutineContext interface를 상속했음.
    - 코드를 찾아보니 아래의 것들이 Element를 상속해서 만들어짐
        - ThreadContextElement
        - AbstractCoroutineContextElement


## 사용시 주의 사항
- 아직 확인 못함 ㅋ (TBD)

## 결론
원래 하고자 했던 작업은 stale cache의 refresh를 서버 request/response latency loss 없이 백그라운드에서 처리하는 거였다. GlobalScope는 kotlin에서 predefined된 Scope여서 나 말고도 여기저기서 쓸 수 있다는 가능성이 있어보여 결국 Cache 서비스만의 Scope를 object로 생성해서 사용하는 방법을 채택해 테스트 해보려고 한다. 하지만 위에서 살펴본 것처럼 해당 Scope로 만들어지는 coroutine들에 대해서 job 처리를 따로 해줘야하는데 refresh에 대한 것이 fail over 로직도 따로 있고 loss가 있는 부분이 없어보여 job처리는 skip한다. 아직 필요성을 못찾음.