---
title : Domain-Driven-Design을 익혀보자
layout : default
category : dev
tags : ddd, domain-driven-design, eric-evans, domain, cqrs
description : 도메인 기반의 프로젝트 설계 방법에 대해 학습하면서 정리하는 포스트입니다.
---

### DDD?
누가 아재 개그로 예전 노래 "DDD"를 이야기했지만 그것이 아니다, 그리고 TDD와 같은 개발방법론도 아니다 이것은!
Domain-Driven-*Design* 즉, 설계방법론이다.

DDD의 목적은 프로젝트 스택홀더간 모두의 프로젝트 이해와 커뮤니케이션 수단의 통일성을 만들어 기획자부터 개발자까지 프로젝트 커뮤니케이션 코스트 낭비를 최소화하기 위한 설계방법론이다.
조금 더 풀어말하면, 기획자는 개발자들이 고민하는 설계 모듈화와 설계시 고민들에 대해 이해하고 개발자는 기획자들이 생각하는 서비스 도메인과 코어 도메인을 이해하여 어느 부분이 프로젝트의 핵심 가치인지를 분간하고 개발하게된다. 이 과정으로 프로젝트의 Goal을 모두가 동일하게 이해하게된다. 이로인해 프로젝트는 기획에서 설계까지 원하는 방향으로 잘나갈 것을 기대하는 설계 방법론이다.

*그렇다면!*

과연 이게 잘될까? 어떻게하면 저런 멋진 일이 일어날 수 있을까? 결국 공부해서 적용해보고 시행착오를 겪어봐야할 것이다. 다행히도 새로 합류하게된 팀에서는 몇 개의 프로젝트를 DDD로 수행하고 시행착오 중에 있다. 팀원들이 겪은 시행착오를 빨리 이해하고 앞으로 개선 점들을 같이 고민하기 위해 DDD에 대한 나의 지식을 빨리 끌어올리기위해 학습해보자.

## 알고 싶은 것들 목록
- 우선 DDD 방법과 순서

- DDD로 했을 때 좋은 선례의 package structure들. 

    장단점 왜 알고 싶냐? - 개발자이다보니 프로젝트 설계 후 구현시의 고민도 된다. 잘 만들어 놓은 design은 프로젝트 구조까지 만드는 것은 아니기에 이부분도 궁금하다. 첫 구조는 차후 바뀌기 힘들고 단순히 묶음 편의성만으로 만든 구조도는 항상 원하는 결과물의 장애가 되었기 때문에, DDD로 했다면 구조 역시 그에 맞는 구조가 있을거라 생각.

- Event Storming 이후의 개발 프로세스

    신규 개발, 유지보수 시에 개발하는 프로세스들 - 역시 개발자 관점에서 DDD 사후 프로세스의 관심이 있다. DDD는 처음 시작때만 적용되는 것이 아니라 유지보수 시에도 적용된다. 이때도 신규 개발시와 동일하게 적용될지 수정되는 모듈 파트만 진행될지 궁금하다.

- DDD가 적용되는 범위가 프로젝트 단위인지 아니면 서비스 전체 아키텍쳐인지에 따라서도 고려 사항들이 다를 듯.

    DDD로 만들어질 결과물의 범주가 대/중/소에 따라 개발자들이 고려할 부분이 달라질 것 같다. 프로젝트 크기별로 고민해야할 부분들이 어떻게 다를지 알고 싶다. 예를 들어 프로젝트 별로 라면 DDD package sturcture 설계등의 작은 단위로안에서 고려, 전체 서비스에 대한 아키텍쳐라면 전체 서비스의 환경 구성에 대한 고려 처럼.


## 학습 참고 자료들
- [Domain Modeling Made Functional - F#](https://www.amazon.com/Domain-Modeling-Made-Functional-Domain-Driven-ebook/dp/B07B44BPFB)
    - 팀에서 스터디로 사용한 책. 이제 읽기 시작....책이 두껍다. 영어다...(ㅠ.ㅠ)

- [Event Storming and Spring with a Splash of DDD](https://spring.io/blog/2018/04/11/event-storming-and-spring-with-a-splash-of-ddd)

    - DDD 경험이 많다는 Pivotal Advocator가 쓴 글로 DDD에 대해 짧게 오버뷰 한 글. 내용이 좋다. Sample : https://github.com/ddd-by-examples

- [Domain Driven Design - Modeling](https://bcho.tistory.com/360)

    대협님의 글. 개인적인 요점을 잘 정리해놓으셔서, 개념파악 후 내 생각과 비교해서 읽어보기 좋다. 특히 모델링에 관한 부분이 이해하기 좋게 써주셔서 많은 도움이 된다. DDD에서 제일 중요한 것은 결국 도메인 분석과 모델링!

- [Domain Driven Design and package organization](https://codeforfunandmoney.wordpress.com/2016/07/13/domain-driven-design-and-package-organization/)

    - DDD에서의 패키지 구조 관련 글, 알고 싶었던 고민 사항에 대해서 어느 정도 해소시켜주는 글이다.
    - 여기서 나오는 구조도
        - 하나의 도메인 패키지 내부에 관련 모든 코드를 한방에 떄려넣기
            - 도메인 관련 코드를 한눈에 볼 수 있어 좋음.
            - 인프라 관련 클래스들이 코어 도메인과 같이 있으면 의존성 관점에서 올바른 설계가 어렵다.
                - 어떤 점이 어려운지 궁금. 생각해보자 - 글에서는 클린 아키텍쳐나 육방(hexagonal) 아키텍쳐설계를 시도하고 싶을때, 도메인로직을 모든 인프라와 의존성 없이 pure하게 만들기가 어렵다는 점을 들었다.
                - clean, hexagonal이 중요하게 생각하는 점이 core logic의 pure 함인지 또 공부 필요
            - 결국 이 글에서는 한방에 떄려 넣는 것 보다는 인프라와 도메인은 패키지 레벨에서 분리해야한다고 주장.
        - First DDD approach : 4 Layers - UI, Application, Domain and Infrastructure (하지만 infra는 설계상 crosscutting concerns에 대한 것 때문에 3개의 기타 레이어에 묶어야함)
            - 패키지 최상단은 4개이지만 Infra하위로 다시 UI, Application, Domain이 만들어지는 구조
            - 장점 : 정적 분석을 통해서 기대하는 의존성을 쉽게 강제화할 수 있다. 기능의 entry point가 Application layer로 모여있다.
                - 찾고 싶은 로직을 관련 기능 코드에서 시작해서 따라 보면 쭉 볼 수 있다.
                - 근데 이건 패키지와 관련이 없어도 볼 수 있는 것 아닐까? 어떤 점이 나은 점인지 잘 모르겠네...
            - 단점 : Verbose(워딩이 길다 정도의 의미), Infra가 너무 내재화되고 직관적이지 않다.
                - 내재화는 많은 고민거리들을 만들어 내는 요인이된다. 
                    - 모든 3layer의 로직인 infra에 투영(mirroring)이 되어 코드 과부하(복붙같은 느낌?)를 만든다.
                    - 투영되는 것은 직관의 문제와도 배치된다. db의 adapter들이 infra의 sub package로 events 하위에 만들어지게 되면 어느 순간 adapter를 찾는 것이 db자체를 찾는 일이된다.
                        - 음..이건 무슨 말인지 좀 와닿지가 않네..
        - Second DDD approach
첫 패키징에서 infra쪽 이슈를 해결하기 위한 접근.
            - infra 하위의 각 3layers의 sub 패키징을 제외하고 인프라 기능으로 구분하여 3 layer에 제공하는 형태로 수정
                - 우리가 흔히 작성하는 common 패키지 형식이 됨

- [Java Spring DDD (Domain Driven Design) 설계 방법론 (2) – Project Packaging](https://kuleeblog.wordpress.com/2017/01/19/java-spring-ddd-domain-driven-design-%EC%84%A4%EA%B3%84-%EB%B0%A9%EB%B2%95%EB%A1%A0-2-project-packaging/)

    - 여기도 동일한 4 layers.
    - 첫 글의 결론 DDD approach와 동일
    - 하지만 application에 포함되는 비즈로직과 domain에 포함되는 비즈로직의 차이가 뭘까 고민했었는데 그 내용이 살짝 언급되었다. 이걸로 pivotal글과 엮어 생각하면 application은 결국 기타 서비스와 차별점이 되는 application의 주요 비즈로직이 들어가는 곳 정도로 이해가 된다.

- DDD에 구조도를 찾는 나의 태도에 대한 다른 의견 : https://stackoverflow.com/questions/540130/where-do-i-find-some-good-examples-for-ddd
    - DDD는 코드 결과물에 대한 것이 중요한게 아니고 접근 그 자체에 대한 과정이 중요하다는 것.
    - 구조도는 캐바캐이기 때문에 뭐가 좋다라는 것이 어려운 것임.
    - 그나마 추천한 것은 DDD 책 저자가 만든 샘플 코드 : https://github.com/citerus/dddsample-core

- DDD on MSA
    - https://medium.com/design-and-tech-co/implementing-domain-driven-design-for-microservice-architecture-26eb0333d72e

- [CQRS FAQ](http://cqrs.nu/Faq)
    - 팀원에게 추천 받은 post
    - 내가 할 법한 질문거리들에 대한 답들이 간결하게 되어있어서, 이해되는 것도 있고 추가로 찾아야할 포인팅으로 접근하기 좋게 정리됨.
    - 덤으로 CQRS관련 질답도 보게됨


- Wikipedia
    - DDD : https://en.wikipedia.org/wiki/Domain-driven_design
    - Event Storming : https://en.wikipedia.org/wiki/Event_storming

- Youtube
    - Domain Driven Design - Eric Evans
    - What I've learned about DDD since the book - Eric Evans
    - DDD & Microservices: At Last, Some Boundaries - Eric Evans

- PDF
    - https://www.infoq.com/minibooks/domain-driven-design-quickly/


## 이해한 것들과 궁금증....and ONE MORE THING!

팀의 결과물에 대한 이야기와 위의 내용들을 접하면서 알게된 점은 그동안 프로젝트를 해오면서 느꼈던 기획과 결과물의 괴리감. 그리고 서로의 상황에 대한 설득의 피로도. 이런 부분들이 많이 개선될 걸로 생각된다. 프로젝트 자체의 완성도에 대한 기대도 당연히 크지만 이런 방법론은 잘 운영이 된다면 팀간의 불화(?)와 불신 등 업무상에 불필요하게 얻게되는 스트레스를 줄여주어 좋은 회사문화를 가꾸는 초석이 될 것이란 생각이다. 항상 개발방법론을 무엇으로 하느냐에 많이 고민을 해왔었는데. 이제서야...DDD란 것을 보고 적용해볼 생각을 하니 기대가 크다. 너무 기대하면 실망도 크다지만 나이들고 나서 보는 팀운영 관점과 프로젝트 운영관점에서 너무 매력적이다. 기대해 보고 싶다. 

그리고 *One More Thing!*

DDD문서들을 접하면 같이 나오는 것이 CQRS다. 이전에 CQRS만 따로 학습해서 알고 있었는데 DDD가 결국 설계시 Command와 Query가 구분이 되기 때문에 자연스럽게 CQRS에 대한 적용이 용이하고 필요하다. 단지 Event Sourcing의 장점을 필두로한 CQRS로만 알고 있다가 DDD 설계 장점을 녹여낼 수 있다는 것을 알게되니 CQRS에 대한 framework들과 library들을 추가로 또 학습해보자!

## 끝.....이고 싶지만.
앞으로의 시행착오도 쭈욱 남겨보자.
