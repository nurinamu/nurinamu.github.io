# 구글 클라우드 데이터스토어에서 스트롱 컨시스턴시와 이벤츄얼 컨시스턴시의 균형잡기

> #### 번역
해당 번역은 정식번역이 아닌 개인 학습 목적으로 번역되었습니다. Eventual Consistency와 Strong Consistency가 너무 괴롭히기에 이 녀석을 좀 더 확실하게 분석하기 위함입니다. 이 번역안에는 의역 오역이 넘쳐나기 때문에 교정해주실 분들은 [PR]()주시면 감사하겠습니다. - **_nurinamu_**

원문 : [Balancing Strong and Eventual Consistency with Google Cloud Datastore](https://cloud.google.com/datastore/docs/articles/balancing-strong-and-eventual-consistency-with-google-cloud-datastore/)

> ###### 베타
이건 구글 클라우드 데이터스토어 API의 베타 버전입니다. 이 API는 하위호환성 때문에 변경될 수 있고 어떤 SLA나 비활성화 정책의 대상이 되지는 않습니다.

### 일관성있는 사용자 경험의 제공과 이벤츄얼 컨시스턴시(Eventual Consistency) 모델을 활용한 대형 데이터셋 확장법

이 글에서는 구글 클라우드 데이터스토어의 이벤츄얼 컨시스턴시 모델로 대량의 사용자와 데이터를 처리하면서 스트롱 컨시스턴시의 장점을 얻을 수 있는 방법을 다룹니다.

이 문서에서는 구글 클라우드 데이터 스토어로 솔루션을 만들기를 원하는 소프트웨어 아키텍터와 개발자들을 위해 쓰여졌습니다. 구글 데이터 스토어 같은 비관계형 시스템 보다 관계형 데이터베이스에 더 익숙한 독자들을 위해, 이 문서에서는 관계형 데이터베이스와 유사한 컨셉들을 알려드립니다. 문서에서는 여러분들이 구글 클라우드 데이터 스토어에 기본적으로 친숙하다고 가정하고 있습니다. 구글 클라우드 데이터 스토어를 시작하는 가장 쉬운 방법은 파이썬,자바,고,PHP를 지원하는 구글 앱엔진을 이용하는 것 입니다. 만약 앱엔진을 아직 사용해본적이 없다면, 먼저 앱엔진 지원 언어 중 하나로 [시작 안내서](https://cloud.google.com/appengine/)와 [데이터 저장 세션](https://cloud.google.com/appengine/docs/python/storage)을 우선 읽어보길 권장합니다. 샘플 코드들이 파이썬으로 되어있더라도 이 문서를 따라오는데에 파이썬 언어에 대한 전문성은 필요하지 않습니다.

### Concepts

- [NoSQL and Eventual Consistency](NoSQL and Eventual Consistency)
- [Eventual Consistency in Google Cloud Datastore](Eventual Consistency in Google Cloud Datastore)
- [Ancestor Query and Entity Group](Ancestor Query and Entity Group)
- [Limitations of Entity Group and Ancestor Query](Limitations of Entity Group and Ancestor Query)
- [Alternatives to Ancestor Queries](Alternatives to Ancestor Queries)
- [Minimizing Time to Achieve Full Consistency](Minimizing Time to Achieve Full Consistency)
- [Conclusion](Conclusion)
- [Additional Resources](Additional Resources)

## NoSQL 과 이벤츄얼 컨시스턴시

NoSQL 데이터베이스로 알려진 비관계형 데이터베이스가 근래에 관계형 데이터 베이스의 대체제로 사용되고 있습니다. 구글 클라우드 데이터스토어는 업계에서 가장 널리 사용되는 비관계형 데이터베이스중에 하나입니다. 2013년에는 한달에 45조번의 트랜젝션이 처리되었습니다([구글 클라우드 플랫폼 블로그](https://cloudplatform.googleblog.com/2013/05/reducing-app-engine-datastore-pricing-by-up-to-25-percent.html)). 데이터스토어는 개발자들에게 데이터를 저장하고 접근하는 단순화된 방법을 제공합니다. 또한 초대형 시스템에서의 고성능, 고신뢰성 등의 관계형 데이터베이스에서 최적화되지 않는 여러 기능들을 제공합니다.

관계형 데이터베이스에 더 익숙한 개발자들에게는 비교적 덜 친숙한 비관계형 데이터베이스의 몇몇 특성들과 동작들 때문에 아마도 비관계형 데이터 베이스로 시스템을 디자인 하는 것은 쉽지 않을 것입니다. 비록 구글 클라우드 데이터스토어 프로그래밍 모델은 단순하지만, 이것의 특성들을 깨닫는 것은 매우 중요합니다. 이벤츄얼 컨시스턴시가 이러한 특성들 중 하나입니다. 그리고 이벤츄얼 컨시스턴시를 위한 프로그래밍이 이 문서의 주제입니다.

## 이벤츄얼 컨시스턴시(Eventual Consistency)란 무엇인가?

이벤츄얼 컨시스턴시는 이론적으로 엔티티에서 발생하는 새로운 변경사항이 적용되지 않은 상태로 제공되었다가 결국에는 최종 업데이트 값이 반환되는 것을 보장합니다. 인터넷 도메인 네임 시스템(DNS)은 이벤츄얼 컨시스턴시 모델의 잘 알려진 예제입니다. DNS 서버들은 최신 값들을 반영할 필요는 없지만 인터넷상의 많은 지역에 걸쳐 값들을 캐쉬하고 복제합니다. 모든 DNS 클라이언트와 서버에 면경된 값들을 복제하는 것에는 특정 시간이 걸립니다. 하지만 DNS 시스템은 인터넷의 기반 중 하나로 아주 성공적인 시스템입니다. 전체 인터넷에 걸쳐 수억개의 디바이스들 위에서 주소 찾기가 가능한 것은 이 시스템이 고가용성을 가지고 있고 아주 확장적이란 것을 뜻합니다.

그림 1은 이벤츄얼 컨시스턴시에서 복제의 컨셉을 그린 것입니다. 다이어그램은 복제품들이 항상 읽기가 가능하지만 몇몇 복제품에서는 원본에 쓰여진 최신내용과 다를 수 있다는 것을 보여줍니다. 다이어그램에서 노드A는 원본 노드이고 노드B와C는 복제품입니다.

![그림 1 illustrates the concept of replication with eventual consistency.](https://cloud.google.com/datastore/docs/articles/images/balancing-strong-and-eventual-consistency-with-google-cloud-datastore/eventual-consistency.png)

_그림 1: 이벤츄얼 컨시스턴시에서의 복제 컨셉 묘사_

반대로 전통적인 관계형 데이터베이스들은 스트롱 컨시스턴시(Strong Consistency) 또는 이미디어트 컨시스터시(Immediate Consistency)로도 불리우는 컨셉을 기반으로 디자인 되었습니다. 이 말은 데이터가 변경된 것이 바로 엔티티의 모든 관찰자에게 보여지는 것을 말합니다. 이 특성은 관계형 데이터베이스를 사용하는 많은 개발자들에게 기초적인 가정이었습니다. 그러나 스트롱 컨시스턴시를 사용하기 위해서 개발자들은 그들의 어플리케이션의 확장성과 성능에 관하여 반드시 타협해야만 했습니다. 간단한 삽입을 할 때도 데이터가 수정되고 복제되는 동안, 어떠한 프로세스도 같은 데이터를 수정하지 못하도록 잠겨집니다.

스트롱 컨시스턴시의 배포 방법과 복제 과정에 대한 컨셉 뷰는 그림2와 같습니다. 이 다이어그램에서 여러분들은 어떻게 원본 노드가 항상 복제품들과 일관성을 유지하는 지와, 수정이 완료될 때 까지 노드에 접근이 불가능하다는 것을 알 수 있습니다.

![그림 2: Conceptual Depiction of Replication with Strong Consistency](https://cloud.google.com/datastore/docs/articles/images/balancing-strong-and-eventual-consistency-with-google-cloud-datastore/strong-consistency.png)

_그림 2: 스트롱 컨시스턴시에서의 복제 컨셉 묘사_

## 스트롱 컨시스턴시(Strong Consistency)와 이벤츄얼 컨시스턴시(Eventual Consistency) 균형 맞추기

최근 비관계형 데이터베이스가 높은 확장성과 고가용성 성능을 필요로하는 웹어플리케이션에서, 특히 인기를 얻고 있습니다. 비관계형 데이터베이스는 개발자들에게 각 어플리케이션에서 스트롱 컨시스턴시와 이벤츄얼 컨시스턴시 사이에서 최적의 균형을 선택하게 합니다. 이것은 개발자들에게 두 세계의 장점을 결합할 수 있도록 합니다. 예를 들어, "현재 접속한 친구를 알아내는 것", "얼마나 많은 사용자들이 여러분의 글에 +1을 했는지 알아내는 것"과 같은 정보는 스트롱 컨시스턴시를 사요할 필요가 없습니다. 이러한 경우에는 이벤츄얼 컨시스턴시를 통해 확장성과 성능을 얻을 수 있습니다. 스트롱 컨시스턴시를 사용해야하는 경우는 "결제과정이 종료된 사용자인지 아닌지", "게임 플레이어가 전투세션에서 획득한 점수가 몇인지" 등과 같은 정보를 포함한 경우 입니다.

아주 많은 엔티티들을 가진 사례를 일반적으로 생각해보면, 이벤츄얼 컨시스턴시가 최고의 모델로 자주 언급이됩니다. 하나의 질의문 안에 아주 많은 결과들이 들어있더라도, 이때 사용자는 특정 엔티티들의 포함 또는 제외에 의한 영향을 느끼지 못할 것입니다. 한편, 소수의 엔티티들과 작은 컨텍스트의 사례에서는 스트롱 컨시스턴시가 필요하다고 생각되어집니다. 컨텍스트가 엔티티들이 포함되거나 제외되는 것을 사용자가 인식하도록 할 것이기 때문에, 사용자들은 영향을 느끼게 될 것입니다.

이러한 이유들 때문에, 개발자들이 구글 클라우드 데이터스토어의 비관계형 특성들을 이해하는 것은 매우 중요합니다. 뒤의 세션들에서는 이벤츄얼 컨시스턴시와 스트롱 컨시스턴시 모델들을 확장가능하고 고가용성, 고성능 어플리케이션을 만들때 어떻게 섞어 사용할 지에 대하여 이야기합니다. 이를 통해, 긍정적인 사용자 경험을 위한 컨시스턴시 요구사항들을 만족시킬 수 있을 것입니다.

## 구글 클라우드 데이터스토어에서의 이벤츄얼 컨시스턴시(Eventual Consistency)

데이터에 대한 강력한 일관성이 필요한 상황에서는 반드시 그에 맞는 API를 선택해야합니다. 다양한 종류의 구글 클라우드 데이터스토어 질의 API들과 그에 해당하는 컨시스턴시가 <표 1>에 정리되어 있습니다.

Google Cloud Datastore API | Read of entity value | Read of index
---------------------------|----------------------|------------------
[Global Query](https://cloud.google.com/appengine/docs/java/datastore/queries) | Eventual consistency | Eventual consistency
[Keys-only Global Query](https://cloud.google.com/appengine/docs/java/datastore/queries#Java_Keys_only_queries) | N/A | Eventual consistency
[Ancestor Query](https://cloud.google.com/appengine/docs/java/datastore/queries#Java_Ancestor_queries) | Strong consistency | Strong consistency
[Lookup by key](https://cloud.google.com/appengine/docs/java/datastore/entities#Java_Retrieving_an_entity) (get()) | Strong consistency | N/A

_표 1: 구글 클라우드 데이터스토어의 질의호출들과 그에 해당하는 컨시스턴시 동작들_

구글 클라우드 데이터스토어에서 엔세스터 없는 쿼리들은 글로벌 쿼리문(Global Query)으로 알려져있고 이벤츄얼 컨시스턴시로 동작하도록 디자인되어있습니다. 글로벌 쿼리문은 스트롱 컨시스턴시를 보장하지 않습니다. keys-only 글로벌 쿼리는 쿼리에 해당하는 엔티티들의 속성값들을 포함하는 것이 아니라 키들만(key-only) 반환하는 쿼리입니다. 엔세스터 쿼리(Ancestor Query)는 엔세스터 엔티티를 기반한 쿼리를 말합니다. 뒤에서 각 컨시스턴시 동작들에 대하여 더 자세히 다룹니다.

## 엔티티(Entity)를 읽는 시점의 이벤츄얼 컨시스턴시(Eventual Consistency)

엔세스터가 빠진 쿼리에서는 수정된 엔티티가 쿼리 실행 시점에 바로 보여지지 않을 수 있습니다. 엔티티들을 읽을 시점의 이벤츄얼 컨시스턴시 영향을 이해하기위해, Score 속성을 가진 Player 엔티티가 하나 있는 시나리오를 생각해 봅시다. Score는 초기 값으로 100을 가졌다고 합시다. 얼마후 Score가 200으로 수정되었습니다. 만약 글로벌 쿼리가 실행이 되었고 이 결과에 위의 Player 엔티티가 포함되어있다면, 반환된 엔티티의 Score 값이 수정 전의 100일 가능성이 있습니다.

이 동작은 구글 클라우드 데이터스토어 서버간의 복제로 인해 발생합니다. 복제는 구글 클라우드 데이터스토어 기반 기술들인 Bigtable, Megastore에 의해서 관리됩니다([추가자료](#Addtional Resoruces)에 Bigtable과 Megastore 관련 자세한 정보가 있습니다). 복제본들의 과반이상이 수정요청을 인식될 때까지 동기적으로 대기하는  [Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)) 알고리즘으로 복제는 실행됩니다. 복제본 엔티티는 변경 요청으로부터 일정 시간뒤에 데이터에 반영됩니다. 이 시간은 일반적으로 작지만, 실제 길이에 대해 어떤 보장도 되지 않습니다. 변경이 완료되기전에 요청된 쿼리는 아마도 변경전 데이터를 읽어갈 것입니다.

대부분의 경우에, 모든 복제본으로의 변경사항 전달은 매우 빠를 것 입니다. 하지만 몇몇 요소들이 함께 섞여 일관성 확보를 위한 시간이 증가할 수도 있습니다. 이러한 요소들에는  많은 서버들을 가진 데이터센터 전체가 데이터센터간 교체 상항들도 포함됩니다. 이러한 요소들의 다양함 때문에, 완벽한 일관성 수립을 위한 특정 시간을 보장하는 것은 불가능합니다.

최종값을 반환하는 쿼리를 위한 필요 시간은 일반적으로 매우 짧습니다. 그러나 드물게  복제 대기 시간이 증가되는 경우, 그 시간은 더 길어질 수 있습니다. 구글 클라우드 데이터스토어를 사용하는 어플리케이션들은 이러한 상황들이 잘 처리될 수 있도록 글로벌 쿼리 디자인을 신중히 해야합니다.

엔티티를 읽을 때의 이벤츄얼 컨시스턴시는 keys-only 쿼리, 엔세스터 쿼리, (get() 메소드를 이용한는) key를 이용한 쿼리를 통해 피할 수 있습니다. 뒤에서 이런 다른 형태의 쿼리들에 대하여 알아봅니다.

## 인덱스를 읽을 시점의 이벤츄얼 컨시스턴시(Eventual Consistency)

글로벌 쿼리가 실행될때 아마도 인덱스는 아직 변경되지 않았을 것입니다. 이 말인 즉슨 반환된 엔티티들의 최종 변경값은 읽을 수 있더라도, 반환된 "엔티티 목록" 결과는 아마도 이전 인덱스 값에 의해 만들어진 것일 수 있습니다.

인덱스를 일을때의 이벤츄얼 컨시스턴시의 영향을 이해하기 위해, Player라는 새 엔티티 하나가 구글 클라우드 데이터 스토어에 삽입되는 시나리오를 상상해봅시다. Player 엔티티는 Score란 속성을 가지고 있고 초기값은 300입니다. 삽입 후 바로, Score가 0보다 큰 모든 엔티티들을 반환하는 keys-only 쿼리를 실행한 다고 합시다. 당연히 방금 삽입한 Player 엔티티가 반환될 것이라고 기대할 것 입니다. 하지만 기대와는 달리 Player 엔티티가 결과에 포함되지 않았다는 것을 알 수 있을 겁니다. 이 상황은 쿼리하는 시점에 Score 인덱스테이블이 새로 삽입된 값을 반영하지 못했을 때 발생할 수 있습니다.

구글 클라우드 데이터스토어의 모든 쿼리들은 인덱스 테이블을 통해 실행된다는 점을 기억해야합니다. 그리고 아직도 인덱스 테이블의 변경은 비동기로 처리되고 있습니다. 특히 모든 엔티티의 수정은 두 단계로 구성되어 있습니다. 실행하는 단계인 첫번째 단계에서는 트랜젝션(Transaction) 기록을 작성하는 것이 수행됩니다. 두번째 단계에서는 데이터가 쓰여지고 인덱스들이 변경됩니다. 만약 첫번째 단계가 성공햇다면, 데이터 작성단계가 즉시 실행되지는 않더라도 성공할 것을 보장받게 됩니다. 만약 인덱스들이 변경되기 전에 엔티티를 조회하면 변경되기 이전의 값을 보게 될 것 입니다.

두 단계의 처리 과정 때문에 글로벌 쿼리에서 변경된 값이 보여지기 전까지 시간 딜레이가 생기게 됩니다. 이러한 엔티티 값의 이벤츄얼 컨시스턴시에 의한 시간 딜레이는 일반적으로 작지만 (심지어 몇분 또는 예외적 상황에서 그 이상으로) 길어질 수 도 있습니다.

다음과 같은 변경들 뒤에서도 동일한 상황이 발생할 수 있습니다. 예를 들어 이미 존재하는 Player 엔티티의 Score를 0으로 변경하고, 바로 동일한(Score가 0보다 큰 엔티트를 반환하는) 쿼리를 실행했다고 합시다. Score가 0으로 변경되었기 때문에 아마도 엔티티가 포함되지 않을 거라고 기대하지만 비동기 인덱스 수정 동작 때문에 여전히 포함되어 있을 것입니다.

인덱스를 읽을 때의 이벤츄얼 컨시스턴시를 피하기 위한 방법으로는 엔세스터 쿼리를 사용하거나 key로 찾는 방법 뿐입니다. keys-only 쿼리는 이 동작을 피할 수 없습니다.

## 엔티티와 인덱스를 읽을 때의 스트롱 컨시스턴시(Strong Consistency)

구글 클라우드 데이터스토어에서는 엔티티와 인덱스를 위한 강력한 일관성을 보장하는 방법으로는 (1) key를 이용해서 찾는 방법과 (2) 엔세스터 쿼리, 오직 이 두가지 API만을 제공합니다. 만약 어플리케이션 로직이 스트롱 컨시스턴시를 요구한다면 개발자는 반드시 이 방법중 하나를 사용해 구글 클라우드 데이터스토어의 엔티티들을 읽어야 합니다.

구글 클라우드 데이터스토어는 이 API들을 통해 스트롱 컨시스턴시가 제공되도록 디자인되어 있습니다. 이 중에 하나를 호출하게 되면, 구글 클라우드 데이터스토어는 복제본 중 하나와 인덱스 테이블에 밀린 모든 변경사항들을 처리한 뒤에 키를 통한 조회 또는 엔세스터 쿼리를 실행할 것입니다. 그래서 변경된 인덱스 테이블을 통한 최신 엔티티 값은 항상 마지막 변경을 포함한 값들을 반환할 것입니다.

쿼리들과는 반대로 키를 통한 호출은 오직 한 개의 엔티티 또는 키에 맞는 엔티티 묶음 또는 키들의 묶음 만을 반환합니다. 이 말은 엔세스터 쿼리만이 구글 클라우드 데이터스토어에서 스트롱 컨시스턴시 조건과 필터 조건을 충족시킬 수 있는 유일한 방법이란 것 입니다. 하지만 엔세스터 쿼리는 엔티티 그룹을 지정하지 않고서는 동작하지 않습니다.

## 엔세스터 쿼리(ancestor Query)와 엔티티 그룹(Entity Group)

이 문서 처음에 이야기했던 것 처럼, 구글 클라우드 데이터스토어의 장점 중 하나는 개발자가 스트롱 컨시스턴시와 이벤츄얼 컨시스턴시의 최적 균형을 조절할 수 있다는 것입니다. 구글 클라우드 데이터 스토어에서 엔티티 그룹은 스트롱 컨시스턴시, 트렌젝션, 지역성(locality)의 단위입니다. 엔티트 그룹들을 구성함으로써 개발자들은 어플리케이션내 엔티티들 사이의 스트롱 컨시스턴시 범위를 지정할 수 있습니다. 이러한 방법으로 어플리케이션은 전체 시스템에서 고확장성, 고가용성, 고성능을 얻는 동시에 엔티티 그룹 내부의 일관성을 조절할 수 있습니다.

엔티티 그룹은 루트 엔티티와 자식들 또는 후임들로 이루어진 계층 구조입니다.[1] 엔티티그룹을 생성하려면 기본적으로 개발자는 일련의 부모키와 하위키로 이루어진 엔세스터 패스를 지정해야합니다. 엔티티 그룹의 컨셉은 그림3처럼 그려집니다. 이 경우에는 "ateam"인 루트키가 “ateam/098745” 와 “ateam/098746”로 설정된 키를 가진 두개의 자식들을 가지고 있습니다.

![그림 3: 엔티티 그룹 컨셉](https://cloud.google.com/datastore/docs/articles/images/balancing-strong-and-eventual-consistency-with-google-cloud-datastore/croup-concept.png)
_그림 3: 엔티티 그룹 컨셉_

엔티티그룹 내부에서는 다음과 같은 점들이 보장됩니다. :

- 스트롱 컨시스턴시 (Strong Consistency)

 - 엔티티 그룹에서의 엔세스터 쿼리는 일관성이 확보된 결과가 반환됩니다. 이러한 방법으로 엔세스터 쿼리는 마지막 인덱스 상태로 걸러진 마지막 엔티티 값들을 얻게됩니다.

- 트랜잭션 (Transaction)

 - 프로그램적으로 트랜잭션을 나눌때, 엔티티 그룹은 트랜잭션 안에서 ACID (atomicity, consistency, isolation, and durability) 특성들을 제공합니다.

- 지역성 (Locality)

 - 엔티티그룹에서 엔티티들은 물리적으로 근접한 구글 클라우드 스토어 서버에 저장이 됩니다. 그렇기 때문에 모든 엔티티들은 키들의 사전적(lexicographical) 정렬 기준으로 정렬되고 저장됩니다. 이것은 엔세스터 쿼리가 최소한의 I/O로 엔티티 그룹을 빠르게 조회할 수 있게 해줍니다.

엔세스터 쿼리는 유일하게 특정 엔티티그룹에 대하여 수행할 수 있는 특별한 쿼리입니다. 엔세스터 쿼리는 스트롱 컨시스턴시로 동작합니다. 구글 클라우드 데이터스토어는 모든 정체된 복제와 인덱스 변경이 엔세스터 쿼리 수행전에 적용되는 것을 보장합니다.

## 엔세스터 쿼리(Ancestor Query) 예제

이 부분에서는 엔티티 그룹과 엔세스터 쿼리를 사용하는 방법에 대하여 실습해봅니다. 뒤에 나오는 예제에서 우리는 사람들에 대하여 기록된 데이터를 관리하는 문제를 고려해봅니다. 특정 종류(Kind)에 엔티티를 추가하자마자 해당 종류의 쿼리를 실행하는 코드가 있다고 가정해봅시다. 아래의 파이썬 예제 코드를 통해 이 컨셉을 확인해봅니다.

```python
# Person 엔티티 정의
class Person(db.Model):
    given_name = db.StringProperty()
    surname = db.StringProperty()
    organization = db.StringProperty()
# person을 삽입하고 모든 사람들의 목록을 꺼낸다.
class MainPage(webapp2.RequestHandler):
    def post(self):
        person = Person(given_name='GI', surname='Joe', organization='ATeam')
        person.put()
        q = db.GqlQuery("SELECT * FROM Person")
        people = []
        for p in q.run():
            people.append({'given_name': p.given_name,
                        'surname': p.surname,
                        'organization': p.organization})
```

대부분의 경우, 이 코드의 문제는 바로 위 명령에서 추가된 엔티티가 반환되지 않는 다는 것입니다. 삽입 이후에 바로 뒷줄에서 실행되는 쿼리들은 실행되는 시점에 인덱스가 변경되지 않았을 것입니다. 
The problem with this code is that, in most cases, the query will not return the entity added in the statement above it. Since the query follows in the line following immediately after the insert, the index will not be updated when the query is executed. However, there is also a problem with validity of this use case: is there really a need to return a list of all people in one page with no context? What if there are a million people? The page would take too long to return.

The nature of the use case suggests that we should provide some context to narrow the query. In this example, the context that we will use will be the organization. If we do that, then we can use the organization as an entity group and execute an ancestor query, which solves our consistency problem. This is demonstrated with the Python code below.

class Organization(db.Model):
    name = db.StringProperty()
class Person(db.Model):
    given_name = db.StringProperty()
    surname = db.StringProperty()
class MainPage(webapp2.RequestHandler):
    def post(self):
        org = Organization.get_or_insert('ateam', name='ATeam')
        person = Person(parent=org)
        person.given_name='GI'
        person.surname='Joe'
        person.put()
        q = db.GqlQuery("SELECT * FROM Person WHERE ANCESTOR IS :1 ", org)
        people = []
        for p in q.run():
            people.append({'given_name': p.given_name,
                        'surname': p.surname})
This time, with the ancestor org specified in the GqlQuery, the query returns the entity just inserted. The example could be extended to drill down on an individual person by querying the person’s name with the ancestor as part of the query. Alternatively, this could have also been done by saving the entity key and then using it to drill down with a lookup by key.

Maintaining Consistency Between Memcache and Google Cloud Datastore

Entity groups can also be used as a unit for maintaining consistency between Memcache entries and Google Cloud Datastore entities. For example, consider a scenario where you count the number of Persons in each team and store them in Memcache. To make sure the cached data is consistent with the latest values in Google Cloud Datastore, you can use entity group metadata. The metadata returns the latest version number of specified entity group. You can compare the version number with the number stored in Memcache. Using this method you can detect a change in any of the entities in the entire entity group by reading from one set of metadata, instead of scanning all the individual entities in the group.

Limitations of Entity Group and Ancestor Query

The approach of using entity groups and ancestor queries is not a silver bullet. There are two challenges in practice that make it hard to apply the technique in general, as listed below.

There is a limit of one update per second write for each entity group.
The entity group relationship can not be changed after entity creation.
Write Limit

An important challenge is that the system must be designed to contain the number of updates (or transactions) in each entity group. The supported limit is one update per second per entity group.[2] If the number of updates needs to exceed that limit then the entity group may be a performance bottleneck.

In the example above, each organization may need to update the record of any person in the organization. Consider a scenario where there are 1,000 people in the “ateam” and each person may have one update per second on any of the properties. As a result, there may be up to 1,000 updates per second in the entity group, a result which would not be achievable because of the update limit. This illustrates that it is important to choose an appropriate entity group design that considers performance requirements. This is one of the challenges of finding the optimal balance between eventual consistency and strong consistency.

Immutability of Entity Group Relationships

A second challenge is the immutability of entity group relationships. The entity group relationship is formed statically based on key naming. It cannot be changed after creating the entity. The only available option for changing the relationship is to delete the entities in an entity group and recreate them again. This challenge prevents us from using entity groups to define ad-hoc scopes for consistency or transactionality dynamically. Instead, the consistency and transactionality scope are closely tied with the static entity group defined at design time.

For example, consider a scenario where you wish to implement a wire transfer between two bank accounts. This business scenario requires strong consistency and transactionality. However, the two accounts can not be grouped into one entity group last-minute or be based on a global parent. That entity group would create a bottleneck for the entire system that would hinder other wire transfer requests from being executed. So entity groups cannot be used in this way.

However, there is an alternative way for a wire transfer to be implemented in a highly scalable and available way. One method to satisfy this requirement is to use Cross-group (XG) transactions for transactionality and the Google Cloud Datastore lookup by key method or an ancestor query for consistency. Cross-group transactions are a Google Cloud Datastore feature that allows you to have ACID characteristics for up to twenty-five entity groups or entities in one transaction. By using XG transactions, you can form a transaction scope dynamically with the two bank accounts at the time of request processing.

Keep in mind that the XG transactions only ensure transactionality. To ensure strong consistency when reading the two bank accounts, you should use lookup by key method or an ancestor query. You will get an error if you try to execute a query that is not an ancestor query inside a transaction.

Alternatives to Ancestor Queries

If you already have an existing application with a large number of entities stored in Google Cloud Datastore, it may be difficult to incorporate entity groups afterwards in a refactoring exercise. It would require deleting all the entities and adding them within an entity group relationship. So, in data modeling for Google Cloud Datastore, it is important to make a decision on the entity group design in the early phase of the application design. Otherwise, you may be limited in refactoring to other alternatives to achieve a certain level of consistency, such as a keys-only query followed by a lookup-by-key, or by using Memcache.

Keys-only Global Query Followed by Lookup by Key

A keys-only global query is a special type of global query that returns only keys without the property values of the entities. Since the return values are only keys, the query does not involve an entity value with a possible consistency problem. A combination of the keys-only, global query with a lookup method will read the latest entity values. But it should be noted that a keys-only global query can not exclude the possibility of an index not yet being consistent at the time of the query, which may result in an entity not being retrieved at all. The result of the query could potentially be generated based on filtering out old index values. In summary, a developer may use a keys-only global query followed by lookup by key only when an application requirement allows the index value not yet being consistent at the time of a query.

Using Memcache

The Memcache service is volatile, but strongly consistent. So, by combining Memcache lookups and Google Cloud Datastore queries, it is possible to build a system that will minimize consistency issues most of the time.

For example, consider the scenario of a game application that maintains a list of Player entities, each with a score greater than zero.

For insert or update requests, apply them to the list of Player entities in Memcache as well as Google Cloud Datastore
For query requests, read the list of Player entities from Memcache and execute a keys-only query on Google Cloud Datastore when the list is not present in Memcache
The returned list will be consistent whenever the cached list is present in Memcache. If the entry has been evicted, or the Memcache service is not available temporarily, the system may need to read the value from a Google Cloud Datastore query that could possibly return an inconsistent result. This technique can be applied to any application that tolerates a small amount of inconsistency.

There are some best practices when using Memcache as a caching layer for Google Cloud Datastore:

Catch Memcache exceptions and errors to maintain the consistency between the Memcache value and the Google Cloud Datastore value. If you receive an exception when updating the entry on Memcache, make sure to invalidate the old entry in Memcache. Otherwise there may be different values for an entity (an old value in Memcache and a new value in Google Cloud Datastore).
Set an expiration period on the Memcache entries. It is recommended to set short time periods for the expiration of each entry to minimize the possibility of inconsistency in the case of Memcache exceptions.
Use the compare-and-set feature when updating the entries for concurrency control. This will help ensure that simultaneous updates on the same entry will not interfere with each other.
Gradual Migration to Entity Groups

The suggestions made in the previous section only lessen the possibility of inconsistent behavior. It is best to design the application based on entity groups and ancestor queries when strong consistency is required. However, it may not be feasible to migrate an existing application, which may include changing an existing data model and application logic from global queries to ancestor queries. One way to achieve this is by having a gradual transition process, such as the following:

Identify and prioritize the functions in the application that require strong consistency.
Write new logic for insert() or update() functions using entity groups in addition to (rather than replacing) existing logic. In this way, any new inserts or updates on both new entity groups and old entities can be handled by an appropriate function.
Modify the existing logic for read or query functions ancestor queries are executed first if a new entity group exists for the request. Execute the old global query as fallback logic if the entity group does not exist.
This strategy allows for a gradual migration from an existing data model to a new data model based on entity groups that minimizes the risk of issues caused by eventual consistency. In practice, this approach is dependent on specific use cases and requirements for its application to an actual system.

Fallback to Degraded Mode

At present, it is difficult to detect a situation programmatically when an application has deteriorated consistency. However, if you do happen to determine through other means that an application has deteriorated consistency, then it may be possible to implement a degraded mode that could be turned on or off to disable some areas of application logic that require strong consistency. For example, rather than showing an inconsistent query result on a billing report screen, a maintenance message for that particular screen could be shown instead. In this way, the other services in the application can continue serving, and in turn, reduce the impact to the user experience.

Minimizing Time to Achieve Full Consistency

In a large application with millions of users or terabytes of Google Cloud Datastore entities, it is possible for inappropriate usage of Google Cloud Datastore to lead to deteriorated consistency. Such practices include:

Sequential numbering in entity keys
Too many indexes
These practices do not affect small applications. However, once the application grows very large, these practices increase the possibility of longer times needed for consistency. So it is best to avoid them at the early stages of application design.

Anti-Pattern #1: Sequential Numbering of Entity Keys

Before the release of App Engine SDK 1.8.1, Google Cloud Datastore used a sequence of small integer IDs with generally consecutive patterns as the default auto-generated key names. In some documents this is referred to as a “legacy policy” for creating any entities that have no application specified key name. This legacy policy generated entity key names with sequential numbering, such as 1000, 1001, 1002, for example. However, as we have discussed earlier, Google Cloud Datastore stores entities by the lexicographical order of the key names, so that those entities will be are very likely stored on the same Google Cloud Datastore servers. If an application attracts really large traffic, this sequential numbering could cause a concentration of operations on a specific server, which may result in longer latency for consistency.

In App Engine SDK 1.8.1, Google Cloud Datastore introduced a new ID numbering method with a default policy that uses scattered ID’s (see reference documentation). This default policy generates a random sequence of ID’s up to 16 digits long that are approximately uniformly distributed. Using this policy, it is likely that the traffic of the large application will be better distributed among a set of Google Cloud Datastore servers with reduced time for consistency. The default policy is recommended unless your application specifically requires compatibility with the legacy policy.

If you do explicitly set key names on entities, the naming scheme should be designed to access the entities evenly over the whole key name space. In other words, do not concentrate access in a particular range as they are ordered by the lexicographical order of key names. Otherwise, the same issue as with the sequential numbering may arise.

To understand uneven distribution of access over the keyspace, consider an example where entities are created with the sequential key names as shown in the following code:

p1 = Person(key_name='0001')
p2 = Person(key_name='0002')
p3 = Person(key_name='0003')
...
The application access pattern may create a “hot spot” over a certain range of the key names, such as having concentrated access on recently created Person entities. In this case, the frequently accessed keys will all have higher ID’s. The load may then be concentrated on a specific Google Cloud Datastore server.

Alternatively, to understand even distribution over the keyspace, consider using long random strings for key names. This is illustrated in the following example:

p1 = Person(key_name='t9P776g5kAecChuKW4JKCnh44uRvBDhU')
p2 = Person(key_name='hCdVjL2jCzLqRnPdNNcPCAN8Rinug9kq')
p3 = Person(key_name='PaV9fsXCdra7zCMkt7UX3THvFmu6xsUd')
...
Now the recently created Person entities will be scattered over the keyspace and on multiple servers. This assumes that there is a sufficiently large number of Person entities.

Anti Pattern #2: Too Many Indexes

In Google Cloud Datastore, one update on an entity will lead to update on all indexes defined for that entity kind (see Life of a Datastore Write for details). If an application uses many custom indexes, one update could involve tens, hundreds, or even thousands of updates on index tables. In a large application, an excessive use of custom indexes could result in increased load on the server and may increase the latency to achieve consistency.

In most cases, custom indexes are added to support requirements such as customer support, troubleshooting, or data analysis tasks. Google BigQuery is a massively scalable query engine capable of executing ad-hoc queries on large datasets without pre-built indexes. It is better suited for use cases such as customer support, troubleshooting, or data analysis that require complex queries than Google Cloud Datastore.

One practice is to combine Google Cloud Datastore and BigQuery to fulfill different business requirements. Use Google Cloud Datastore for online transactional processing (OLTP) required for core application logic and use Google BigQuery for online analytical processing (OLAP) for backend operations. It may be necessary to implement a continuous data export flow from Google Cloud Datastore to BigQuery to move the data for necessary those queries.

Besides an alternate implementation for custom indexes, another recommendation is to specify unindexed properties explicitly (see Property Options in the reference documentation). By default, Google Cloud Datastore will create a different index table for each indexable property of an entity kind. If you have 100 properties on a kind, there will be 100 index tables for that kind, and an additional 100 updates on each update to an entity. A best practice, then, is to set properties unindexed where possible, if they are not needed for a query condition.

Besides reducing the possibility of having increases times for consistency, these index optimizations may result in quite a large reduction of Google Cloud Datastore costs in a large application which heavily uses indexes.

Conclusion

Eventual consistency is an essential element of non-relational databases that allows developers to find an optimal balance between scalability, performance, and consistency. It is important to understand how to handle the balance between eventual and strong consistency to design an optimal data model for your application. In Google Cloud Datastore, the use of entity groups and ancestor queries is the best way to guarantee strong consistency over a scope of entities. If your application cannot incorporate entity groups because of the limitations described earlier, you may consider other options such as using keys-only queries or Memcache. For large applications, apply best practices such as the use of scattered IDs and reduced indexing to decrease the time required for consistency. It may also be important to combine Google Cloud Datastore with BigQuery to fulfill business requirements for complex queries and to reduce the usage of Google Cloud Datastore indexes as far as possible.

Additional Resources

The following resources provide more information about the topics discussed in this document:

Google App Engine: Storing Data
Mastering the Datastore (series)
Google Cloud Platform Blog
Google Cloud SQL
Using Python App Engine with Google Cloud SQL
Bigtable: A Distributed Storage System for Structured Data
App Engine 1.5.2 SDK Released
Megastore: Providing Scalable, Highly Available Storage for Interactive Services


[1] An entity group can even be formed by specifying only one key of the root or parent entity, without storing the actual entities for the root or parent, because the entity group functions are all implemented based on relationships between keys.

[2] The supported limit is one update per second per entity group outside transactions, or one transaction per second per entity group. If you aggregate multiple updates into one transaction, then you are limited to a maximum transaction size of 10 MB and the maximum write rate of Datastore server.
