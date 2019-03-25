---
title : WebFlux 알아보기
layout : default
category : dev
tags : webflux, async, functional, reactive
description : functional programming에 관심을 가지게되어 자연스럽게 Reactive programming에도 관심을 가지게되었고 서버개발자로써 결국 Webflux에 왔다. WebFlux가 어떤 방식으로 동작하는 것이고 기존의 Servlet 방식보다 좋은 점은 무엇인지 공부할거다.
---

### WebFlux???
- [Spring](spring.io) 5가 나오면서 추가된 request 비동기 처리 방식.
- functional programming에 관심을 가지게되어 자연스럽게 Reactive programming에도 관심을 가지게되었고 Spring stack으로 먹고 살다보니 결국 WebFux에 왔다.
WebFlux가 어떤 방식으로 동작하는 것이고 기존의 Servlet 방식보다 좋은 점은 무엇인지 공부할거다.
- 그 기초 지식을 학습하기위해 찾아보면서 자료들을 정리한다.

### 공부하면서 본 것들

#### Blogs
- [Spring WebFlux and rxjava2-jdbc](https://medium.com/netifi/spring-webflux-and-rxjava2-jdbc-83a94e71ba04) : 비동기 처리를 지원하지 않는 JDBC가 WebFlux의 성능에 어떤 영향을 줄지 궁금해서 찾다가 보게되는 자료.

- [Spring HATEOAS 1.0 m1 released](https://spring.io/blog/2019/03/05/spring-hateoas-1-0-m1-released) : WebFlux 정보를 보다가 알게된 것. Spring HATEOAS가 나오는구나. 이건 따로 공부하고 글로 남겨보자. 안그래도 WebFlux 내부에서 비동기 호출 부분들이 HATEOAS 방식과 유사하다고 생각했었는데 관련이 있네.

- [Web on Reactive Stack](https://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web-reactive.html) : Spring Framework 공식 문서. 일단 공식문서는 닥치고 읽어본다. 만든 곳이 제일 잘아는거니까.

- [Reactive History](https://ahea.wordpress.com/2017/02/03/reactive-history/) : Reactive 탄생설화 같은 이야기. 교양으로 읽기 좋음.

- [Reactor Core 3.0 becomes a unified Reactive Foundation on Java 8](https://spring.io/blog/2016/03/11/reactor-core-3-0-becomes-a-unified-reactive-foundation-on-java-8)

- [Understanding Reactive types](https://spring.io/blog/2016/04/19/understanding-reactive-types) : 

- [사용하면서 알게된 Reactor, 예제 코드로 살펴보기](http://tech.kakao.com/2018/05/29/reactor-programming/?fbclid=IwAR3CkPJwATnTJeM0NIlu02D-WaJtJHmWqhfxaW0gK6fd9_pGCNaIt5wGFNg) : 실제 사용중인 패턴을 익혀볼 찬스!

- [Project Reactor](https://projectreactor.io/learn) : Reactor 공식페이지에서 제공하는 스터디 페이지. 뭐든 공식이 좋음. Reactor를 공부해보자.

- [Spring WebFlux 기반 서버리스 애플리케이션 만들어보기](https://github.com/arawn/building-serverless-application-with-spring-webflux/blob/master/README.md)

#### Youtube
- [What is Spring Webflux and when to use it?](https://www.youtube.com/watch?v=M3jNn3HMeWg) : 짧게 요점 정리된 자료를 찾다가 본 영상.
- [스프링캠프 2017[Day1 A3]:Spring Web Flux](https://www.youtube.com/watch?v=2E_1yb8iLKk) : 토비님의 발표자료. 조금 outdated 된 것이 있지만 소중한 한국어 설명자료
- [스프링 부트 2.0 Day 23. 스프링 웹플럭스](https://www.youtube.com/watch?v=j6SFTTxGCK4&index=23&list=PLfI752FpVCS8tDT1QEYwcXmkKDz-_6nm3) : 스프링 하면 토비님과 항상 쌍으로 나오는 백기선님 유툽채널. 스프링 공식 문서를 같이 보는 느낌이라 혼자 공부하는 느낌이 안들어서 좋다.

#### Github
- [AoJ: ADBA over JDBC](https://github.com/oracle/oracle-db-examples/tree/master/java/AoJ) : Oracle이 JavaOne에서 발표했던 New Asynchronous DB Connections에 대한 샘플 코드 - [first commit](https://github.com/jasync-sql/jasync-sql/commit/1285964117aac6618bf0a2064cdcb5a60068a136)이 2012년 부터. 처음시작때는 kotlin이 아니고 scala네 ㅋ

- [jasync sql](https://github.com/jasync-sql/jasync-sql) : Kotlin!으로 작성된 Async Mysql driver. Kotlin 코드 샘플을 구경할겸. 겸사겸사. 실제 이걸로 작업을 안해봐서 동작이나 성능이 어떤지는 모름.

- [MiXiT](https://github.com/mixitconf/mixit?fbclid=IwAR2h4Jf0gigt7xhBlJCgt_MYgt0XUtBiCjX8E25kFuJ9Ah3kyxeZjA8uIWY) : Spring Boot 2 + WebFlux + Kotlin 데모 사이트 코드!

- [Lite Rx API Hands-on](https://github.com/reactor/lite-rx-api-hands-on) : Reactor Java 연습용 코드 예제

- [Lite Reactor API and Reactor Kotlin Extensions Hands-on](https://github.com/eddumelendez/reactor-kotlin-workshop) : Reactor Kotlin 연습용 코드 예제

#### stack overflow 
stack overflow를 뒤져보면 내가 궁금해했던 것들이 많아서 이것들이 정답일지 아닌지는 모르지만 참고용.
- [Spring MVC (async) vs Spring WebFlux](https://stackoverflow.com/questions/46606246/spring-mvc-async-vs-spring-webflux) : 이것이 WebFlux 공부한다면 찾아보는 제일 첫번째 질문 ㅋ 뭐가 다른거야? 뭐가 좋은거야?

- [Is asynchronous jdbc call possible](https://stackoverflow.com/questions/4087696/is-asynchronous-jdbc-call-possible) : 2011년에 질문한 자료. 현재 상황과는 다르게 절망적인 상황을 자체 라이브러리로 해결하겠다는 작성자의 이야기와 달려있는 댓글들을 보면 이 모든 것들이 신규 개념이 아닌 오래된 것들이 근래에 구체화되어 나오고 있다는 것이란 것을 다시 깨닫게함.

#### 인간레퍼런스
- WebFlux 뽐뿌를 넣어준 사람 : Thanks to [김기현](https://www.facebook.com/enki.heart.kim)


### 공부하면서 궁금해진 것들. (답을 찾으면 업데이트)
- DB Connection 숫자는 어떻게 되는지? Event loop안에서 사용하는 Worker 별로 생기는 것인지 해당 Worker들도 DB Connection Pool로 한번 더 감싸진 것인지?

- repository async로 인해서 request의 thread 점유 시간이 줄어든다면 서버 운용 측면에서 thread 자원을 아낄 수 있게 되어 서버 instance 숫자를 줄 일 수 있을 것 같은데, thread 자원을 아끼는 대신 추가로 cpu 사용률이 높아져서 scale out이 되지는 않을지?

- 설명들을 보면 아직 aync rdb jdbc가 없다는데, 우린 적용하기 힘든건가?
    - async JDBC spec은 발표되었는데, 아직 지원되는 상용드라이버는 안보인다. 하지만 몇몇 github driver들이 찾아지긴함.
