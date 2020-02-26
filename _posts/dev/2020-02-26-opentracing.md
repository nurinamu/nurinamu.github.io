---
title : OpenTracing? OpenTracing!
layout : default
category : dev
tags : jekyll
description : 이제는 대부분 서비스들에게 분산 인프라 환경이 보편화되면서 복잡도를 가지게된 인프라 환경의 모니터링과 운영 이슈 처리에 관심을 많이 가진다. 그래서 분산 환경에서의 디버깅용 로깅을 어떻게 하면 좋을까 찾다가 알게된 OpenTracing에 대해 정리해보았다.
---

## OpenTracing? 넌 누구니. 왜 필요하니.

```
이 글은 팀에 OpenTracing을 소개하기 위해 작성했던 글로 일부 내용 수정해서 블로그로 옮겨왔습니다. 
```

이제는 대부분 서비스들에게 분산 인프라 환경이 보편화되면서 복잡도를 가지게된 인프라 환경의 모니터링과 운영 이슈 처리에 관심을 많이 가진다. 그래서 분산 환경에서의 디버깅용 로깅을 어떻게 하면 좋을까 찾다가 알게된 OpenTracing에 대해 정리해보았다.

### OpenTracing이란

이 공유에서 언급될 [OpenTracing](https://opentracing.io/)은 [CNCF](https://www.cncf.io/) 산하의 프로젝트로 단어 그자체 처럼 하나의 흐름을 공개적으로 추적하기 위한 기능을 표준화하는 프로젝트입니다. 아직 공식적인 OpenTracing의 표준은 존재하지 않고 CNCF가 가장 큰 기구이기 떄문에 Cloud환경의 입김(question)이 쎄서 주목받는 비공인 표준 입니다. 현재 해당 OpenTracing spec을 [기준으로 만들어지는 Tracer들](https://opentracing.io/docs/supported-tracers/)로는 [Zipkin](https://zipkin.io/), [Jaeger](https://www.jaegertracing.io/), [Lightstep](https://lightstep.com/)등 다양하게 존재합니다. (CNCF사이트 supported tracer목록에 zipkin이 빠져있는건 왜 그런지 궁금하네요)

이제는 서비스를 운영하는 대부분의 서버 개발자들에게 MSA가 보편화되고 여러 효율성 관점에서 도입되고 있을 때, 이런 분산 환경의 로깅이 주목을 받으며 OpenTracing이 그 방안으로 나오고 있습니다. 사실 OpenTracing은 분산 환경의 로깅을 목적으로 만들어진 것이 아니고 하나의 request에서 response를 반환 할 때까지 거치는 서버의 연결 점들을 추적하기 위한 시스템으로 시작된 것이었습니다. 이 서버 연결을 추적하다보니 자연스럽게 해당 서버들의 req/res latency를 확인할 수 있게되어 bottleneck check가 가능하게 되고 그 서버 안의 로그까지 합쳐져 코드레벨의 디버깅도 할 수 있는 기능들도 들어가게되었습니다. 

<img src="https://opentracing.io/img/overview-intro/tracing2_0.png" width="694">

표준화를 시도하는 이유는 [OpenTracing Big Piceces](https://opentracing.io/docs/overview/)(위 그림)에도 설명되어있지만 OpenTracing이 표준화된다면 우리 서비스의 분산 로깅만 가능한 것이 아니라 우리 서비스에서 외부서비스로 연결시 최초 요청의 trace id로 연결되어 모든 연결 구조의 추적이 가능하게 됩니다. 예를 들어 빌링 서비스도 우리가와 모두 같은 tracer 기준으로 opentracing 을 설정한다면 장애발생시 좀 더 빠르게 확인이 가능하곘죠? :-)

### 왜 OpenTracing을 갑자기?

현재 (회사)팀의 환경에서 운영중인 서버가 단일 서버군을 참조하는 것이 아니고 요청에 따라 복수개의 서버군을 거치게 됩니다. 이럴 때 서버간 로그가 통합관리되는 것이 아니라 문제에 대한 디버깅시 로그를 각자 찾거나 bottleneck을 찾기하는 활동을 할때 각 서버의 로그들을 따로 뒤져봐야하는 불편함이 있습니다. 거기에다 각 서버별 로그를 연결된 reqeust/response를 찾아서 보는 것이 정말 쉽지 않은 일입니다. 앞으로 팀에서 관리하는 서버군의 복잡도가 올라가고 분산 환경이 더 커지게 될 수록 디버깅 작업의 난이도가 올라가고 개발자의 피로도가 올라갈 것이 예상되기 때문에 이러한 작업이 진행되면 차후 편안한 디버깅 생활을 할 수 있을 것 같아 도입검토가 필요합니다. 물론 디버깅할 일이 없게 코딩을 잘하면 좋겠지만 현실은....ㅋ. 최근 팀에서 검토중인 [istio](https://istio.io/)가 팀에 녹아들거나 한다면 더욱 편하게 OpenTracing환경을 도입할 수 있게됩니다.

### [OpenTracing Overview](https://opentracing.io/docs/overview/)

OpenTracing spec에 대해서 간단하게 오버뷰를 해봅니다. 우선 OpenTracing에서 사용하는 Data Model들을 먼저 이해하면 관련 문서를 참조시 도움이 될거라 간단하게 짚어봅니다.

<img src="https://opentracing.io/img/overview-intro/tracing1_0.png" width="694">

- Span
    - OpenTracing Data Model의 기초 단위로 시작과 끝을 가지는 Timeline block입니다. 다시 말해 시간을 측정하게되는 모든 단위를 뜻 합니다. 시간을 측정한다는 것은 측정 시작 지점과 종료 지점이 있으니 그것이 하나의 Span이 됩니다. Span은 Parent / Child 구조를 가지고 있는데 이것은 우리가 흔히알고있는 Tree Node의 Parent Child와는 조금 다르게 하나의 Span을 세부로 나누었을 때의 전체가 Parent, 하부에 포함되어있는 Span이 Child Span이 됩니다. 예를 들어 하나의 api reqeust/response가 하나의 Span이라면 그 reqeust를 처리하는 내부 코드 method call 하나하나를 Span으로 생성시 method Span은 Child Span이 됩니다.
    - Span은 하위의 attribute들을 들고 다닙니다.
        - Operation Name
        - start / finish timestamp
        - Tags
            - key/value 구조의 사용자정의 필터 값들
        - Logs
            - key/value 구조의 정보 메세지
        - SpanContext
            - 각 Tracing 구현체에 따라 달라지는 내용. 기본적으로 trace id와 span id등이 포함됩니다.
- Tracer
    - 위 Span들에게 특정 id를 부여하여 발송하고 저장하는 시스템을 말합니다. Zipkin, Jaeger 와 같은 것들을 지칭합니다.

### 동작 원리
동작 원리는 의외로 간단합니다. 위에서 설명한 Span단위의 정보들을 특정 Storage서버에 전달하면 해당 시스템은 그 Span들을 Trace ID, Span ID별로 Timestamp 정렬하게 됩니다. Tracer 별로 SpanContext 구조나 형태가 다를 수 있어 Tracer별로 서로 Span을 공유하지는 못하고 컨버터들이 존재는 합니다

Zipkin Example Flow - [https://zipkin.io/pages/architecture.html](https://zipkin.io/pages/architecture.html) 

### OepnTracing을 통해 우리팀이 얻을 수 있는 것
- 위에서도 언급하였지만 결국 빠른 이슈 원인 파악이 최고의 장점입니다. OpenTracing은 단순히 reqeust/response network 연결에 대한 것만 추적이 가능한 것이 아니라 Redis / MySql 과 같은 외부 캐싱서비스나 데이터베이스의 연결 까지도 추적할 수 있어 문제가 발생한 호툴이 어디까지 진입하였고 어디에서 문제가 발생하였는지 빠르게 확인 가능하게 됩니다. 장애 발생시 로그 수집 서버에 Trace ID만 찍어주면 불편하게 키바나에서 이리저리 쿼리 날리면서 로그 찾기 안해도 됩니다.
- 팀에서 OpenTracing의 성숙도를 올리고 다른 팀에 전파가 가능하다면 타팀과의 api 협업시 이슈 해결에 더더욱 효과적이 될 것입니다. 이슈에 대한 해결 능력이 좋아지면 서로서로 윈윈이겠죠?

### OpenTracing을 통해 해야할 일
이렇게 좋은 것을 왜 이제야! 그리고 왜 다른 곳은 안하지? 에 대해 고민해보면 답은 사실 간단합니다. 인프라 구조가 복잡도 + 디버깅의 어려움 vs 환경 구성에 대한 불편함 의 내적 대결 구조가 있기 때문입니다. OpenTracing 환경 구성을 위해서는 처음 설정에 노오오오력이 들어갑니다. 세상에 쉬운일은 없습니다. 하지만 조금 노오오오오력 해서 구성하면 후세에 편안함이 올거라 생각됩니다. 그래서 할일을 나열해보면...

- OpenTracing 기술 스택 선정 - Tracer 선정
- Tracer Server 설치
- 각 서버군별 적합한 Tracer Library 설치 / 설정
        - Spring인 경우 Sleuth + Sl4j로 떙이지만... play+jdk7, ruby..는..;;; 좀 더 찾아봐야함.

끗