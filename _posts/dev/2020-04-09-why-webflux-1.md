---
title : Webflux 공부하자 #1
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

결국 원하는 것은 Webflux의 제대로된 이해를 통해 프로젝트에 적용 필요 기술인지 확인하고, 어떻게 잘 녹여낼 수 있을지를 알아내는 것이다. 그래서 그 코어기술인 Reactor를 들여다 본다.

### Mono / Flux

Reactor 관련된 여러 글들을 보면 [Mono](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html) / [Flux] (https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html)가 가장 중요한 컴포넌트로 나온다. Reactive Stream은 기본적으로 비동기 프로그래밍 표준을 목표로하고 있기 때문에 그 구현체인 Reactor는 비동기 지원을 위해 대부분 함수형 프로그래밍 형태로 구현이 되어있다. Mono / Flux를 처음 만났을때 FP의 Functor와 비슷하다고 생각들었다. 그래서 Reactor에서 FP의 향기가 진하게 난다. 

- Mono : 0..1 의 데이터를 만들어내는 Publisher
- Flux : 0..N 의 데이터를 만들어내는 Publisher

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