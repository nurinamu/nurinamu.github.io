---
title : Model...너 뭐하는 놈이니.
layout : default
category : dev
tags : model, dto, dao, vo, entity, queryresult
description : 프로그램 설계를 하다보면 데이터를 주고 받기 위한 다양한 model들을 만나게 된다. 
하지만 그럴때마다 어떤 형태로 만드는 것이 적절한 것인지 고민이되는데, 적절함의 올바른 판단을 위해 각 모델들의 정확한 정의를 알아보자
---

### Data Model이란?

### Data Transfer Object aka DTO
[마틴 파울러의 DTO 정의](https://martinfowler.com/eaaCatalog/dataTransferObject.html)에 따르면 DTO는 한번에 하나의 값을 반환하는 함수들의 호출 횟수를 줄이기 위해 여러 파라미터를 묶어서 전달하거나, 여러개의 값을 묶어서 전달하기 위해 사용되는 객체로 정의 되어있다. 특히 java 같은 경우에는 함수는 하나의 retrun value만을 가지기 때문에 DTO를 많이 사용하게 된다. 

### Value Object aka VO

### Data Access Object aka DAO

### Entity
Entity는 흔히들 알듯이 Persistence와 통신을 위한 객체로 Persistence의 각 column이나 property와 1:1 매핑되는 것이 일반적이다. SQL base인 경우에는 table의 하나의 row가 하나의 Entity로 Mapping되어 Application에서 사용되어진다. 

#### Entity design issue
Entity design시에 팀에서 논쟁이 벌어지는데 여러 Table이 Join이 되어 반환되는 객체도 Entity로 볼 것이냐이다. 패턴을 좀 더 입혀서 명확한 디자인을 하고 싶은 분들은 Table 1:1만 Entity이고 Join되어서 반환되는 것은 Readonly DTO로 생성되어 구분해야한다고 말한다. 다른 의견들은 그렇다면 굳이 Entity라는 정의 보다는 Readonly DTO로 모든 것이 커버가 되니 그것만 사용하는 것이 어떻겠냐는 것이다. 그리고 DTO를 비즈니스로직을 관통하여 View로 까지 반환하는 것에 대해서도 이야기한다. 이것은 Entity를 View로 전달하기 위해 중간 DTO 전환하는 부하나 복잡도를 줄여주지만 객체의 역할이 여러개를 내재하는 문제가 종종 발생한다. 예를 들어 Persistence에서 만들어진 DTO가 View로 올라가면서 View에서 필요한 값들이 추가되거나 다른 DTO의 property 일부가 되어버린다. 

