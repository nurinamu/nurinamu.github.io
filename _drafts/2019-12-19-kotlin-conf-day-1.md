---
title : KotlinConf Day 1 Sessions
layout : default
category : dev
description : KotlinConf 2019의 Day1에서 참석해 들었던 세션별 리뷰를 남겨 봅니다.
---
## 세션별 후기

내가 참석해서 들어본 세션별로 리뷰를 해보자.
제목에 링크로 유툽링크를 연결하겠다. 이번 KotlinConf 모든 세션은 유투브로 라이브 스트리밍 되었다!

### [Day 1 Keynote](https://youtu.be/i9RJpMOsKas?t=670)

초반엔 역시 기본적인 Kotlin의 자랑이었기에 그렇게 들을만한 내용은 없었고, 중반 이후 부터 몇가지 키워드를 말하면서 Kotlin의 계획에 대해 이야기를 하였다.

- People
    - Kotlin EcoSystem은 Kotlin이 개발되는 모든 영역에서 개발자들의 참여를 통해서 진행이 된다고 한다. 참여자들을 늘리고 숫자를 늘리는 것을 중요하게 생각하는 이유는 많은 Kotlin 사용자의 수는 Kotlin이 좋다는 지표로 보기 떄문이라고 한다. 팬덤을 만드는 것은 좋은 접근이라고 생각한다. 인기있는 기술이 결국 좋은 피드백으로 발전도 잘되는 것 같다. 이 동네도 빈익빈 부익부 같은 것이기에.

- We are kotlin
    - Kotlin의 목표는 모든 영역의 Default Language가 되는 것이라고 한다. 그러기 위해서는 모든 영역에 대한 진입장벽을 낮춰야하는데 그 진입장벽중 하나가 언어 학습인데 Kotlin이 모든 플랫폼에서 사용가능하도록 만들어진다면 개발자가 모든영역에 대한 진입장벽이 낮아져 개발자들이 여러 플랫폼을 넘어다닐 수 있을거라 한다. 사실 개발자의 도메인 지식 차이로 인해 개발자가 모든 것을 커버하는 것은 쉽지는 않겠지만, 최소한 비즈로직의 공유가 가능한 상황이 되어 도메인 계층간의 차이를 줄일 수 있을거라고 한다. 일단 코틀린을 하면 뭐든 할 수 있게 될거란 꿈을 심어주기위해 참석자들에게 강조하는 듯했다. 일단 속아주자 ㅋ

- Kotlin 1.4
    - 새 코틀린 버전인 1.4에서는 Quality & Performance에 집중된 업데이트가 진행될 건데, 그 주요 변경점으로 New Compiler를 소개헀다. 속도 개선을 위해 여러 기능들이 제공되지만 일부는 1.4 이후에 계속 추가 개선 될거라한다. 아직 나오기전의 이야기고 차트로만 벤치마크 정보를 보여주는 정도라 이것 역시 그렇게 와닿는 내용의 이야기는 아니였다.

- Multipleform
    - 위에 이야기 되었던 Default Language이야기와 이어지는 내용인데 멀티 플랫폼 지원을 위해 모바일에서는 iOS 개발을 Kotlin으로 가능하게 한다고 한다. tv, watch를 포함해서 모두 지원 된다고. 실제로 행사장에서 진행된 Kotlin Locator app이 apple watch로도 가능했는데 모두 Kotlin으로 작성되었다고 한다. 같이 참석했던 분이 apple watch앱으로 게임을 진행했는데 기능이 복잡한 것은 아니여서 그런건지 특별한 문제없이 잘 동작했었다. 그리고 웹은 기존에도 있었던 거라 큰 관심은 없었는데 Kotlin/JS에서도 coroutines가 사용 가능하다는 것은 좀 신기했다. 브라우저에서 이부분을 어떻게 지원하는걸까? js 알못이라; 신기하게만 생각. 그리고 WebAssembly를 Kotlin으로 지원한다고 한다. 이것도 잘 모르는 분야라 그냥 교양처럼 들었고 Kotlin이 현재 모든 영역에 대한 지원을 위해 노력하고 있다는 것만 마음에 새겨두기로..

### Intro to Channels and Flow

- 모든 세션이 스트리밍 된다는 말에 현장에서만 해볼 수 있는 것을 해보자는 생각에 핸즈온랩으로 열리 해당 세션에 참석 시도했지만, 같은 생각을 한 참석자들이 많아서인지 자리고 부족해서 참여를 못했다... 결국 이 세션 타임에는 부스 구경하면서 스티커 모으기 모드.

### [What the F(p) is Kotlin?](https://youtu.be/F2Der7xDNVM?t=10510)

- 이 세션은 제목만 보고 세션 설명을 제대로 읽어보지 못해서 발생한 사고였다; Kotlin을 이용한 F(p)관련 세션으로 생각하고 자리에 앉았지만, 10분만에 뭔가 잘못되었다는 것을 깨닫고 세션 설명을 보았는데, 새로운 기술인 Kotlin을 기존 개발자들에게 전파하는 주니어 개발자들의 애환을 공유하는 자리였다; 신기술 전파의 어려움과 자료를 만들어 설득하는 부분이 힘들다는 것은 공감하지만 그것 뿐이고 어떻게 하면 그것을 잘 할 수 있을지에 대한 내용이 좀 부족했고, 막판에 Kotlin과 기존 Java를 비교하며, 이런 장점으로 다른 개발자들을 설득했다는 부분은 좀 뻔하고 지리했다. 만약 나와 같이 제목에 낚여 볼 생각이라면 이 세션은 스킵하길 추천한다.

### [Design of Kotlin Serialization](https://youtu.be/i9RJpMOsKas?t=18315)

- Kotlin에서 자체 json serializer를 제공한다는 내용으로 시작한다. 왜 gson, jackson등 유명한 json parser들이 존재하는데 kotlin에서 따로 제공하느냐. 그 이유는 Keynote에서 이야기한 Kotlin은 multiplatform을 지향하기 떄문이라고 한다. Kotlin이 모든 플랫폼에서 지원하는 언어가 된다고 하면 gson, jackson들은 java lib일 뿐이지 js나 natvie에서는 사용이 불가하다. 그래서 pure kotlin으로 작성된 parser가 필요하다는 이야기다. 세션에서는 기본적인 Serializable annotation사용법과 동작 원리등을 이야기한다. 특별한 내용은 없었다. 유툽 링크로 확인. Multiplatform을 위한 자체 개발은 공감이 되는 이야기이며 이제 kotlin serializer가 그럼 최소 jvm위에서 다른 parser보다 성능이 좋으냐에 촛점이 맞춰진다. 기존 서버쪽 gson, jackson을 넘지 못한다면 기존 gson, jackson사용자들이 누가 과연 언제 반영할지 모르는 Multiplatform 지원을 위해 kotlin.serialization을 사용할까;; 일단 Kotlin 자체 json parser가 있다는 정도로 이해했으며, 한번 벤치마킹을 해볼 필요가 있을 꺼라 생각했다. 
