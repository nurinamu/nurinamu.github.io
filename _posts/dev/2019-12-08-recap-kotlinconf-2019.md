---
title : Review the KotlinConf 2019 Cophenhagen
layout : default
category : dev
description : 2019년 첫 참석한 KotlinConf에 대한 후기를 남겨봅니다.
---

## KotlinConf 2019 Copenhagen 되돌아보기

작년 겨울 지인을 통해서 알게된 [KotlinConf](https://kotlinconf.com/). 호기심으로 신청해서 참석한 이번 행사의 후기를 남겨보자. Kotlin에 대한 애정(?)을 더욱 키워주고 흥미로운 내용들이 많았다. 참관기를 크게 내가 배운 내용들과 행사에서 느낀 분위기들. 그리고 꼭 다른 분들에게 전달해주고 싶었던 나의 생각들 정도로 나누어서 줄줄이 써보자. 세션의 주제별로 정리는 따로 글을 남기겠다.

## 분위기

기존에 다녀왔던 해외 컨퍼런스가 구글 I/O와 JavaOne 두 가지 뿐이기 때문에 비교하기에 무리가 있지만, 유럽에서 열리는 해외컨퍼런스라 그런지 유럼(?)이라는 독특한 분위기가 있었다. 미국의 행사보다는 좀 차분하다는 느낌? 어쩌면 대부분의 참석자가 백인들로 인종 다양성이 떨어지다보니 다양함이 좀 부족해서 그런 것이거나, 날씨가 춥고 비가오는 날씨여서 그런지 행사가 막 흥이나고 신나는 분위기 보다는 차분하게 세션을 열심히 들어야하는 다큐적인 컨퍼런스였다. 외부 참여 부스 수는 좀 적었지만, Jetbrains, Google, Gradle 3 부스만으로 일당백 ㅋ. 참석자 성비는 남성이 압도적이었다. 사실 구글 I/O에서는 매년 참석할 수 록 성비가 평준화 되는 느낌이었는데, Kotlin관련 기술에 집중된 컨퍼런스라 그런지 남성이 대부분. 해외도 아직 기술직군이 남성편향인 것이 체감 되었다. 그리고 여기도 역시 개발자들이라, 아니면 유럽이라 그런지 세션 끝나고 질문하는 사람이 많이 없다. 모국어가 아니라서 그런지 역시 ㅎㅎ. 아 그리고 인종 다양성중에서 아시아쪽 참여는 느낌이 1%도 안되는 것 같았다. 한국인 개발자는 같이간 7명이 전부인 듯 했고, 일본인 개발자, 베트남 개발자 분들 좀 보이고 중국인 개발자도 안보였었다. 아직 행사의 Name value가 거리의 문제와 언어의 장벽을 넘을 정도로 높지 않아서일 것 같다. 그래서 뭔가 개척하는 느낌은 나쁘지 않았다.

## KotlinConf Hot Keywords

### Why Kotlin?

이번 행사에서 내가 들었던 세션 슬라이드 초입에 언제나 Why Kotlin? 이란 내용이 들어있었다. 아직 Kotlin이 더 확대되기 위해? 개발자들에게 어필하기위해? 발표자들이 이번 행사에서 본인의 이야기를 첨언하여 참석자들에게 약을 파는 내용으로도 느껴졌다. 대부분 Kotlin을 사용하는 이유로 Kotlin 언어의 Null safety, Concise를 들었고 흥미로웠던 이유는 Sexy, Pleasure. 이중에서 내가 가장 공감이 되었던 것은 단연 Pleasure였다. 뭐든 재미가 있어야 한줄이라도 더 짜게되고, 이해도 더 잘되는 것 같다. 나에게 있어 호기심 지속의 기반은 역시 흥미와 재미이다.

### Multiplatform - Default language in everywhere

[Jetbrains에서 생각하는 Kotlin의 비전으로 Multiplatform을 이번 행사 내내 강조했다.](https://www.youtube.com/watch?v=0xKTM0A8gdI&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=3&t=0s) Jetbrains 부스에서 진행된 Kotlin Locator라는 행사용 게임앱 역시 Kotlin Native의 샘플앱으로 iOS, Watch용을 제공했다. 여담이지만 11등을 해서 10등까지주는 RasberryPi4를 못받았다 ㅠㅠ. Kotlin이 모든 분야의 Default Language가 된다면 한 분야에서 Kotlin에 익숙해진 개발자는 다른 분야의 접근시 언어 습득의 장벽을 최소화하고 코드 리딩의 어려움을 줄여줄 수 있다. 거기에 한프로젝트안에 포함된 여러 platform에서 모든 코드부분을 공유할 수는 없겠지만, 비즈로직을 포함한 라이브러리를 공유하는 방식도 가능해진다. Jetbrains가 원하는 Kotlin의 미래는 요런 상황인 것 같다. 그래서 Jetbrains는 이 비전 달성의 로드맵에 중요한 요소로 개발자 생태계를 꼽았다. 많은 사용이 있는 것이 좋은 것이고, 좋은 것은 많이 사용할 것이라는 선순환을 만들기 위해 모든 채널로 Kotlin의 홍보와 외부 Feedback을 받을 것이라한다. Jetbrains의 Kotlin팀이 Devrel 팀과 월드투어를 한다는데 이것이 그 액션의 일환일거다. Multiplatform을 지원하는 언어의 시도는 많이 있어왔지만 실패한 역사들을 많이 봐왔다. 하지만 Android를 넘어 이제 Server side에 깊숙히 침투 했으며, Web front로 확장중이다. 그러면서 iOS도 발걸음을 때었다. 하나의 비전안에서 차곡차곡 미션을 해쳐나가는 Kotlin의 앞길이 기대되고 Kotlin이 좋은 개발자로서 잘되기를 기원하는 중이다. 

### Coroutines - Flow

이제는 [Kotlin == Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html)인 느낌이다. lightweight한 비동기 동시성 기능을 엄청 강조한다. 컨퍼런스의 세션중에 코루틴 기능 하나로 여러개의 세션이 만들어진 것만으로도 이 기술이 얼마나 관심을 받고있는 것인지 느껴진다. [Reactive 개발](https://www.reactivemanifesto.org/)에 대한 관심도가 높은 근래에 계속 비동기 구현을 위한 기능들이 추가되는데 기존 코루틴에서 evaluated된 값을 전달하던 코루틴용 Stream인 [Channel](https://kotlinlang.org/docs/reference/coroutines/channels.html#channels)말고 추가로 비동기 객체 전달이 가능하고 코루틴에서 사용가능한 Stream인 [Flow](https://kotlinlang.org/docs/reference/coroutines/flow.html#asynchronous-flow)를 내놓았다. 이제 비즈로직에 코루틴을 활용한 한층 더 강화된 비동기 프로그래밍이 가능하게 되었다. 이것의 내용은 아직 블로그에 작성완료 못한 비동기 프로그래밍 2탄과 함께 다뤄서 작성하겠다.

### DSL

개인적으로 코틀린하면서 코드 간결성의 끝판왕으로 느껴진 것은 brace만으로 코딩가능하게 해주는 DSL이었다. 기존에도 마지막 함수 인자를 함수로 받게 함수들을 구성하면 나만의 DSL을 만들어 주요 로직을 그 DSL로 만들 수 있었다. 하지만 그 파일 역시 코틀린 문법을 따라서 작성해야했기 때문에 뭔가 반쪽짜리 DSL이었는데, 나만의 확장자를 만들고 DSL정의 후 해당 DSL을 파싱할 수 있는 컴파일러 객체와 [KotlinScript Annotation](https://github.com/Kotlin/KEEP/blob/master/proposals/scripting-support.md) 기능을 이용해 연결하면 내 DSL파일이 Kotlin코드에서 사용가능한 객체로 전환이 가능하다. 이것을 통해서 각종 편의 기능들을 내가 직접 만들어 볼 수 있는 기회가 열렸다. 사실 세션을 들으면서 너무 멋진 기능이기에 kotlin기반의 나만의 DSL 언어를 하나 만들 수 있는 것 아닌가 하는 망상까지 해가며 혼자 즐거워했다. 역시 코틀린은 즐겨야해.

### Space?

Kotlin 행사이지만 역시 Jetbrains와 강한 유착관계에있는 프로젝트인지라 Jetbrains의 Product lineup이 세션 하나를 할당해서 공개되었다. 바로 [Space](https://www.jetbrains.com/space/). Jetbrains가 기존에 가지고 있던 YouTrack, TeamCity등 개발팀 업무툴의 한계를 벗어나 업무용 메신져와 CI/CD, 회사 업무 전체를 위한 Project Mgt, Issue Tracker를 추가하고 모두 묶었다. 한마디로 Jetbrains product만 있으면 회사는 따로 더 이상 개발, 마케팅, 기획이 업무툴 분리 없이 다 같이 일할 수 있게 만들겠다는 거다. 뭐 데모는 훌륭했고 좋아 보였다. 문제는 가격인데 CI/CD 환경과 코드 Repository 운영까지 가능하게 다 포함되어 나쁘지 않은 가격처럼 보이기도 했다. 아직 Hosting으로만 제공되고 빠른 시일내에 설치형도 제공될 거라한다. 하지만 기존 업무 시스템을 여기로 넘겨야하는 기회비용이...너무.. 개인적으로는 다 넘어가면 개발자에게는 편할 것 같다. 특히 우리회사는 모든 업무 메신져가 카톡이다보니 일과 업무가 분할이 안되서..더더욱. 근데 여기에 놀라운 점이 한가지 있다. 굳이 이 프로덕트 발표를 Kotlin 컨퍼런스에서 하려고 했는가. 의 이유가 바로. Space는 3rd party application을 탑재할 수 있는 Platform이 되어 자체 Appstore가 존재할 거라 한다. 그리고 그 앱의 개발 언어가 KOTLIN!!! 새로운 업무툴 시장에 진입하기 위해서는 Kotlin을 써야한다는 거다. Kotlin개발자들에게는 잘하면 새로운 창업아이템을 선사하게될거같다. 문제는 Space Ecosystem이 얼마나 퍼질지가... 아무튼 Jetbrains를 좋게 생각하는 나는 팝콘들고 쳐다보다 나도 App을 만들어볼까? 하는 정도의 감상이었다.

## 내년에도 또?

사실 내년에도 열린다면 다시 오고 싶다. 언제나 그렇듯 이런 해외 컨퍼런스 특히, 기술 컨퍼런스를 다녀온 이후의 내 정신상태가 뽕맞은 것처럼 뭔가 원기 왕성해진다. 하고 싶은 것들이 줄줄이 생기고 깨닫는 것들이 많아 그 즐거움과 뿌듯함에 돈이 아깝지 않다. 이게 어찌보면 해외 컨퍼런스 참석을 다른 개발자분들에게 종용하는 이유일 것 같다. 대부분 영상 다시보기롤 볼 수 있는 거를 뭐하러 가냐고 하는데, 알고있지만 현장에서 챙겨듣지 않으면 집에서 잘 안보게된다. 그리고 그 현장에서 느껴지는 기술별 온도차 체험도 안되고. 역시 직접 가봐야한다. 이런 해외 컨퍼런스 자체의 욕구에다 아직 계속 학습 욕구가 불타는 Kotlin 관련 행사는 계속 참석해서 먼저 알고 싶다는 마음이다.

Recap은 끝.

## 내가 들었던 세션 리스트와 Youtube

#### Day 1

- [PUTTING DOWN THE GOLDEN HAMMER](https://www.youtube.com/watch?v=YeqGfKmJM_g&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=4&t=0s)
- [WHAT THE F(P) IS KOTLIN?](https://www.youtube.com/watch?v=P6G2YPuDE3Y&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=13&t=0s)
- [DESIGN OF KOTLIN SERIALIZATION](https://www.youtube.com/watch?v=IhKTIFlNrC4&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=16&t=0s)
- [BUILDING MICROSERVICES WITH KOTLIN AND GRPC](https://www.youtube.com/watch?v=pCTLu4awGVk&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=21&t=0s)
- [BOOTIFUL GRAPHQL WITH KOTLIN](https://www.youtube.com/watch?v=7YJyPXjLdug&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=25&t=0s)
- [BUILDING REACTIVE PIPELINES WITH KOTLIN & SPRING: HOW TO GO FROM SCALABLE APPS TO SCALABLE SYSTEMS](https://www.youtube.com/watch?v=6NkGW0wJwXs&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=28&t=0s)

#### Day 2

- [ASYNCHRONOUS DATA STREAMS WITH KOTLIN FLOW](https://www.youtube.com/watch?v=tYcqn48SMT8&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=33&t=0s)
- [THE STATE OF KOTLIN SUPPORT IN SPRING](https://www.youtube.com/watch?v=U4Q13TlAUE8&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=38&t=0s)
- [WHAT'S NEW IN JAVA 19: THE END OF KOTLIN?](https://www.youtube.com/watch?v=te3OU9fxC8U&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=41&t=0s)
- [THE POWER OF TYPES](https://www.youtube.com/watch?v=t3DBzaeid74&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=46&t=0s)
- [DO IT IN CODE (NOT YAML)! UNLOCK POWER OF KOTLIN DSL FOR KUBERNETES](https://www.youtube.com/watch?v=yaw0m9KpA8Q&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=50&t=0s)
- [IMPLEMENTING THE GRADLE KOTLIN DSL](https://www.youtube.com/watch?v=OEFwnWxoazI&list=PLQ176FUIyIUY6SKGl3Cj9yeYibBuRr3Hl&index=55&t=0s)