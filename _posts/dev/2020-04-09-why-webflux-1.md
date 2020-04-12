---
title : Webflux 공부하자 1편
layout : default
category : dev
tags : webflux, async, functional, reactive, reactor, reactive-stream
description : functional programming에 관심을 가지게되어 자연스럽게 Reactive programming에도 관심을 가지게되었고 서버개발자로써 결국 Webflux에 왔다. WebFlux가 어떤 방식으로 동작하는 것이고 기존의 Servlet 방식보다 좋은 점은 무엇인지 공부할거다.
---

## 또 Webflux 공부?

[지난 글](https://www.nurinamu.com/dev/2019/03/22/understand-what-is-webflux/)을 쓰고 무려 1년 동안 제대로 보지 못하다가 다시 공부하면서 그 내용을 정리한다. 이전에는 정리 없이 우수수 글만 읽고 써보지를 않아 금방 잊었지만 이번에는 좀 더 부분부분 찾아서 이해하며 정리해보자. 

### Webflux와 Reactive Streams

[Spring Webflux](https://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web-reactive.html#webflux) 문서를 보면 Reactive Stream에 대한 이야기가 나온다. 이 둘의 관계가 무엇인지 알아보자면, Spring의 Webflux에서 사용하는 reactive library가 [Reactor](https://github.com/reactor/reactor)이고 Reactor가 [Reactive Streams](https://www.reactive-streams.org/)의 구현체이다. 그래서 Webflux 문서에 Reactive Streams가 언급되는 것이고 그거와 같이 Reactor가 나오고 주요 객체인 Mono / Flux가 나오는 것이다. 결국 Webflux의 동작 구조를 이해하는 기본에는 Mono / Flux의 이해가 필요하고 그 이해를 위해 Reactive Streams에 대한 이해가 필요하다. 줄줄이 사탕이다.

## Reactive Streams?

[Reactive Streams](https://www.reactive-streams.org/) 공식 문서에 정의된 문장을 그대로 본다면 Reactive Streams은 논블럭킹 백프레셔(non-blocking backpressure)를 통한 비동기 스트림 처리 표준을 제공하기 위한 명세이다. 이 영어같은 한국어에 대한 내용은 [라인 엔지니어링 블로그](https://engineering.linecorp.com/ko/blog/reactive-streams-with-armeria-1/)에 너무나 잘 설명되어있다. 그 중 backpressure가 중요한 개념으로 이해가 꼭 필요하다. 이 철학적이면서 사명감을 가진 비동기 스트림 처리를 위한 명세는 의외로 매우 간단하게 [4개로만 정의](https://github.com/reactive-streams/reactive-streams-jvm/blob/v1.0.1/README.md#specification)되어있다.

- Publisher : 경계가 미확정된 순차적 데이터들을 생성하는 컴포넌트
    - Publisher는 Subscriber의 onNext호출 토탈 횟수는 반드시 Subscription의 request 횟수를 초과해서는 안된다. (#제1번 룰)
        - 이것이 어떻게 지켜지는지에 대해서는 실제로 코딩을 해보면서 확인해야할 것 같다.
- Subscriber : 순차적 데이터를 받아서 처리하는 컴포넌트
    - onSubscriber -> onNext* -> (onError | onComplete)? 순서로 시그널을 받게된다.
- Subscription : Publisher에 의해 발행되는 구독 정보 컴포넌트
    -  request에 의해 backpressure가 가능.
- Processor : Publisher/Subscriber Stream의 미들웨어. Publisher이면서 Subscriber
    - [다양한 Processor들](https://projectreactor.io/docs/core/release/reference/#processor-overview)이 Reactor에서 제공된다. 

기본적인 Observable 패턴과 유사해 이해가 어렵지 않다. 차이가 있다면 Subscription의 request메소드를 통해 backpressure 기능이 탑재되어 있다는 것이다. 탑재라기보다는 backpressure가 가능하게 interface가 있고 우리가 사용하게될 Reactor에서 구현이 되어있다. Reactive Streams 다 봤다. 참쉽죠잉(!?) 막말. 일단 넘어가자 갈길이 멀다.

## Reactor

결국 원하는 것은 Webflux의 제대로된 이해를 통해 프로젝트에 적용 필요 기술인지 확인하고, 어떻게 잘 녹여낼 수 있을지를 알아내는 것이다. 그래서 그 코어기술인 Reactor를 들여다 본다. 참고자료에 [링크](https://tech.io/playgrounds/929/reactive-programming-with-reactor-3/Intro)된 튜토리얼 강좌를 따라해보자.

### Flux / Mono

Reactor 관련된 여러 글들을 보면 [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) / [Mono](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html)가 가장 중요한 컴포넌트로 나온다. Reactive Stream은 기본적으로 비동기 프로그래밍 표준을 목표로하고 있기 때문에 그 구현체인 Reactor는 비동기 지원을 위해 대부분 함수형 프로그래밍 형태로 구현이 되어있다. Mono / Flux를 처음 만났을때 FP의 Functor와 비슷하다고 생각들었다. 그래서 Reactor에서 FP의 향기가 진하게 난다. 

- [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) 
    - 0..N 의 데이터를 만들어내는 Publisher, 생성데이터가 0개 또는 1개로 명확하게 구분되는 것은 Mono로 사용되어야한다.
    - Data의 흐름 단위, Complete / Error가 되기전까지는 무한 생성 가능한 Stream으로 생각해야함.
    - javadoc에 보면 모든 함수 동작들이 그림으로 설명되어있어 더욱 이해가 쉽다.
    - static 메소드는 소스 생성에 관련된 것들이고, instance 메소드들은 비동기 파이프라인 처리를 위한 것들로 구분되어있다.
    - 메소드가 너무 많기 때문에 나에게 필요한 것을 찾기위한 문서도 존재. 개발하면서 method 찾기 entry로 javadoc에서도 이걸로 접근하길 추천함
        - [Which operator do I need?](https://projectreactor.io/docs/core/release/reference/index.html#which-operator)
    - 주의할 점 : 기존 동기 코드에서는 애러처리가 try/catch 등으로 간단히 처리되었지만 비동기 코드에서의 애러처리는 Error event를 받아서 처리해야한다. 이게 데이터 흐름 중 애러가 발생하면 해당 Flux는 종료되는 것이기 때문에 이전에 받은 데이터들에 대한 처리등을 생각해야하기에 처음 설계시 애러처리도 정확히 고민되어야한다.

- [Mono](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html)
    - 0..1 의 데이터를 만들어내는 Publisher
    - 1개의 데이터를 처리하는 Flux를 Mono로 변경이 가능하고 Mono 역시 1개 초과로 처리시 Flux로 변경이 가능하다.

### StepVerifier

[StepVerifier](https://javadoc.io/static/io.projectreactor.addons/reactor-test/3.0.7.RELEASE/reactor/test/StepVerifier.html)는 `react-test`에 포함된 테스트용 클래스다. 이것을 이용해서 Publisher가 우리가 원하는 형태로 동작하는지 테스트 가능하다. 지원되는 기능이 매우 다양한데 그 중에 가장 마음에 드는 것은 VirtualTimeScheduler 기능인데 이것을 이용하면 긴시간의 주기로 동작하는 Publisher를 주기변경해서 테스트 가능하다. 다시말해 하루에 한번 배치동작하는 것을 설정을 통해 시간을 무시하고 동작하게 해서 테스트 가능하다. 과거에 테스트를 위해 실제 코드에 주기 변경하는 코드를 넣고 테스트를 했었는데 그럴 필요가 없다!

- [FirstStep](https://javadoc.io/static/io.projectreactor.addons/reactor-test/3.0.7.RELEASE/reactor/test/StepVerifier.FirstStep.html), [Step](https://javadoc.io/static/io.projectreactor.addons/reactor-test/3.0.7.RELEASE/reactor/test/StepVerifier.Step.html), [LastStep](https://javadoc.io/static/io.projectreactor.addons/reactor-test/3.0.7.RELEASE/reactor/test/StepVerifier.LastStep.html)으로 각 Step별로 제공 함수가 구분되어있다.

### Transform / Merge

개발자들이 하는 것은 결국 데이터를 입력 받고 원하는 형태로 전달하고 가공하는 것이다. 여기서 전달을 위한 입출력 pipeline은 구축이 되었고 이제 가공하는 것들이 필요하다. fp에서 자주 접하게되는 map/flatMap가 Mono/Flux에서 제공이 되고 merge, concat등의 merge operation도 제공이 된다.

### Request

서두에 이야기했던 Reactor가 단순 pub/sub과 다른 점. 바로 요 backpressure 기능이다. Subscriber는 Publisher에게 현재 처리할 수 있는 data 갯수를 알려줘서 해당하는 만큼만 받아올 수 있다. 이것은 Subscriber의 부하가 몰리는 것을 방지할 수 있다.

### Error

Reactor에서 Error 역시 Event로 Signal을 받아 처리가능하다. onErrorReturn, onErrorResume등의 메소드로 Error Signal을 받았을 때 처리하거나 propagate를 사용해 stream 내부 map에서 처리하던 것을 상위로 전달 할 수 도 있다.

## techio 후기

아주 간단한 code snippet들을 짜보면서 기능들을 익히는 것에 도움이 되었고, 일부러 javadoc을 찾아보게 해주는 점이 좋았다. 하지만 방대한 api 중에 일부만 다루다보니 결국 Reactor적응을 위해서는 작업하면서 다양한 상황을 경험하며 함수들을 써봐야할 것 같다. 그리고 Flux, Mono javadoc에 나온 그림 기호들에 빨리 익숙해지는 것이 나중에 메소드 찾기에 도움이 될 것 같다. 이제 Reactor Tutorial이 끝났으니 Webflux로 돌아가보자.

## 참고자료

- [https://tech.io/playgrounds/929/reactive-programming-with-reactor-3/Intro](https://tech.io/playgrounds/929/reactive-programming-with-reactor-3/Intro)
    - Reactor 3에 대한 학습 사이트 : 무려 3년된 자료지만 혼자 공부하기 힘들때 도움이 된다.
- [https://www.youtube.com/watch?v=eZbssAcTem4](https://www.youtube.com/watch?v=eZbssAcTem4)
    - 백기선님 유투브. 2년전 자료로 위 techio 학습 영상 - backpressure 내용이 나옴.
- [https://medium.com/@jayphelps/backpressure-explained-the-flow-of-data-through-software-2350b3e77ce7](https://medium.com/@jayphelps/backpressure-explained-the-flow-of-data-through-software-2350b3e77ce7)
    - backpressure에 대한 설명
- [https://github.com/reactive-streams/reactive-streams-jvm/tree/master/tck](https://github.com/reactive-streams/reactive-streams-jvm/tree/master/tck)
    - reactive stream 하위 호환을 위한 라이브러리. 이걸 왜 썼냐하면 문서에 TCK란 단어가 뭐지 하면서 찾게된것. TCK == Technology Compatibility Kit. 결국 하위 호환 지원 키트란 뜻.
- [https://projectreactor.io/docs/core/release/reference/](https://projectreactor.io/docs/core/release/reference/)
    - Reactor 공식 문서