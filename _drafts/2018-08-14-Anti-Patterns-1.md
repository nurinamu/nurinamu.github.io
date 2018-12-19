---
title : Anti-Patterns #1
layout : default
category : dev
description : 그간 등한시 해왔던 디자인 패턴 공부의 시작을 Anti-Pattern을 확인하는 것으로 해보려고 합니다.
---

## Why?
개발생활을 한지 오래는 되었지만 체계적인 디자인패턴은 공부하지 않고 경험적 코딩을 일삼아 오다보니, 누적되는 기술부채의 가장 큰 이유는 아무래도 패턴에 대한 나의 무지에서 오는 것 같아 이것을 고치고자 구글링을 해보았다. 디자인패턴이란 것은 상황마다 너무 다양하고 많은 것들이 존재하기 때문에 모든 것을 익히는 것이 어렵다고 판단되어 잘못된 디자인을 피하는 쪽으로 학습하기로 결정하고 위키피디아에 정리된 [안티패턴](https://en.wikipedia.org/wiki/Anti-pattern)들을 우선 학습 하기로 한다. 이미 슬쩍 읽어본 결과, 아니나 다를까 이미 저지르고 있는 범죄(?)들이 많이 보인다. 나뿐만 아니라 패턴의 체득 미흡으로 실수하는 동료들을 위해서라도 정리를 해보자.

## Anti-Patterns?
말그대로 안티 디자인 패턴이다. 프로그래밍에서 디자인 패턴이란 것은 이미 경험적으로나 통계적으로 효율성과 생산성이 보장된 것들이다. 반대상황인 비효율성과 비생산성을 증대하는 코드들을 안티 패턴이라고 한다. 위키의 안티 패턴 케이스들을 보면 해당 패턴을 교체할만한 추천 패턴들이 잘 정리되어있으니 하나씩 짚어보며 나의 코드들을 반성해보자.

## For Object-oriented programming - [[link]](https://en.wikipedia.org/wiki/Anti-pattern#Object-oriented_programming)

[Anemic Domain Model](https://en.wikipedia.org/wiki/Anemic_domain_model) : Business로직이 빠진 pojo들을 안티패턴으로 분류한다는 것이다. 이것은 사실 논쟁거리가 다분한데, value의 validation이 modeling 바깥으로 위임 해버리는 것은 해당 모델에 대한 validation 코드가 분산되어 생산성과 효율성을 저하된다는 것이 포인트.

[Call super](https://en.wikipedia.org/wiki/Call_super) : 상위 클래스의 메소드를 overriding하면서 상위 클래스의 필수 호출파트가 누락되는 경우 때문에 지목되는 안티 디자인 패턴. 이런 패턴을 해결하기 위한 패턴으로는 [Template method pattern](https://en.wikipedia.org/wiki/Template_method_pattern)이다. 하위 클래스에게 abstract interface를 열어주고 해당 함수를 구현하게 하고 상위 클래스가 해당 interface를 내부호출 하는 형태.

[Circle-ellipse problem](https://en.wikipedia.org/wiki/Circle-ellipse_problem) : 잘못된 상속관계로 인한 패턴 이슈다. 워딩만 보고 타원을 원의 하위 클래스로 구현한 것이 언뜻보기에 맞는 것 같지만 실제로는 맞지 않다는 것이다. 타원이 원의 하위 클래스라면 원의 속성인 반지름에 맞는 구현이 존재해야하지만 타원은 반지름이란 것이 없다. 만약 타원이 원의 하위 클래스로 원보다 속성이 추가된 것으로 생각된다지만 원의 속성을 구현할 수 없다면, 별개의 클래스로 봐야한다는 것이다. 원과 타원처럼 자세히 들여다 보지 않으면 구분하기 힘든 개체들에 대해 조심해야겠다.

[Circular Dependency](https://en.wikipedia.org/wiki/Circular_dependency) : 흔히 볼 수 있는 순환 의존성 이슈다. 이것 또한 말이 많을 수 있는 부분이다. 과연 이게 안티패턴일까? 해석의 차이에 따라 이슈가 있을 수 있는 이 문제는 정확한 의존성 관계에 대한 이해없이 무분별한 의존성 연결에 대한 경각심을 두고 코딩하자는 정도로 생각하면 되지 않을까 한다. 문서에 나온 가장 큰 문제점으로는 재사용을 위해 분리해둔 모듈들이 순환 의존성 문제로인해 모듈화하기 어려워져 처음 목적과는 다르게 재사용이 불가해지는 경우다. 재귀도 순환 의존성에 포함이 되기 때문에 재귀에 의한 호출 부분은 안티패턴으로 보지않아야할 것 같고, 스프링 같이 DI가 활발한 아키텍쳐에서 무분별한 의존성 추가는 조심해야할 것 같다.

[Constant interface](https://en.wikipedia.org/wiki/Constant_interface) : 상수 선언을 interface에 하는 것은 좋지 않은 OOP 디자인으로 만들게 한다. java에서 interface는 명세만을 담기위해 만들어진 것인데 상수로써 사용을 위해 그안에 변수를 선언하는 것은 구현체가 만들어진 것과 동일한 일이 된것이기에 좋지않은 OOP 디자인을 가져가게된다. 그리고 상수란 것은 한번 선언되면 변경이 되지 않도록 만들어야하고 변하지 않을 값으로 생각하고 사용하게되는데, interface에 선언된 상수는 구현체의 상수선언으로 덮어져써질 수 있다. 이렇게되면 같은 interface의 상수를 사용한다 하더라도 구현체마다 다른 값을 가진 괴상한 상수(이미 값이 달라서 상수가 아닌 변수)가 되버린다. 이런 패턴을 대체하는 방법으로는 class에서 final과 static을 사용하는 것을 권장한다.

[God Object](https://en.wikipedia.org/wiki/God_object) : 하나의 클래스에 너무 많은 기능을 집어넣은 경우를 지칭한다. 이런 상황이되면 해당클래스는 시스템 전반적으로 사용되는 클래스가 된고 해당 클래스에서 문제가 발생시 시스템 전반적인 문제로 번지는 일이 발생 할 수 있다. 이러한 불상사를 피하기 위해서라도 기능을 분산하여 문제의 크기도 줄이고 분산될 수 있도록 구현하는 것을 권장한다.