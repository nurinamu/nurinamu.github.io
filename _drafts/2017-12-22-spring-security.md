---
title : [번역] Spring Security Architecture
layout : default
category : dev
description : Spring Security Architecture 문서를 번역하면서 정독
---

## Spring Security Architecture
원문 [https://spring.io/guides/topicals/spring-security-architecture/](https://spring.io/guides/topicals/spring-security-architecture/)

이 가이드는 프레임워크의 블럭들을 빌딩하고 디자인 하는데 영감을 제공하는 스프링 시큐리티 입문서입니다. 우리는 어플리케이션 보안에 관한 아주 기초들과 스프링 시큐리티를 사용하는 개발자들이 겪은 몇가지 헷갈리는 것들도 정리해 봅니다. 그러기위해 우리는 필터들과 많이들 사용하는 어노테이션들을 가지고 웹 어플리케이션에 보안을 적용하는 방법을 들여다봅니다. 보안 어플리케이션이 어떻게 동작하는지 그리고 이것을 어떻게 커스텀화할 수 있는지, 어플리케이션 보안에 관해 어떤 것을 고려해야할지 알고 싶을때 이 안내서를 사용하십시요.

이 가이드는 대부분의 기본적인 문제들 보다 더 어려운 문제들(이것들을 위해서는 다른 것들이 있습니다)을 해결하기위한 메뉴얼은 아닙니다. 하지만 초보자들과 전문가들에게 유용할 것입니다. 스프링 부트는 또한 많은 것들을 참조하고 있습니다. 왜냐하면 부트는 보안 어플리케이션을 위한 몇가지 기본 동작들을 제공합니다. 그리고 전체적인 아키텍쳐에 어떻게 사용되는지 이해하기에 유용할 것입니다. 모든 정책들은 스프링 부트를 사용하지 않은 어플리케이션들에도 동등하게 잘 적용됩니다.

### 인증과 접근 관리 - Authentication and Access Control

어플리케이션 보안은 2가지 정도의 독립적인 문제로 간추려 집니다 : 인증(너 누구야?)과 권한부여(너가 할 수 있는게 뭐야?). 가끔 사람들은 "권한부여(authorization)" 대신 접근 관리"라는 말을 헷갈리게 사용합니다. 하지만 "권한부여"가 여러 곳에서 
