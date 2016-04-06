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

![Figure 2: Conceptual Depiction of Replication with Strong Consistency](https://cloud.google.com/datastore/docs/articles/images/balancing-strong-and-eventual-consistency-with-google-cloud-datastore/strong-consistency.png)

_Figure 2: 스트롱 컨시스턴시에서의 복제 컨셉 묘사_

## 스트롱 컨시스턴시와 이벤츄얼 컨시스턴시 균형 맞추기

최근 비관계형 데이터베이스가 높은 확장성과 고가용성 성능을 필요로하는 웹어플리케이션에서, 특히 인기를 얻고 있습니다. 비관계형 데이터베이스는 개발자들에게 각 어플리케이션에서 스트롱 컨시스턴시와 이벤츄얼 컨시스턴시 사이에서 최적의 균형을 선택하게 합니다. 이것은 개발자들에게 두 세계의 장점을 결합할 수 있도록 합니다. 예를 들어, "현재 접속한 친구를 알아내는 것", "얼마나 많은 사용자들이 여러분의 글에 +1을 했는지 알아내는 것"과 같은 정보는 스트롱 컨시스턴시를 사요할 필요가 없습니다. 이러한 경우에는 이벤츄얼 컨시스턴시를 통해 확장성과 성능을 얻을 수 있습니다. 스트롱 컨시스턴시를 사용해야하는 경우는 "결제과정이 종료된 사용자인지 아닌지", "게임 플레이어가 전투세션에서 획득한 점수가 몇인지" 등과 같은 정보를 포함한 경우 입니다.

To generalize the examples just given, use cases with very large numbers of entities often suggest that eventual consistency is the best model. If there are very large number of results in a query, then the user experience may not be affected by the inclusion or exclusion of specific entities. On the other hand, use cases with a small number of entities and a narrow context suggest that strong consistency is required. The user experience will be affected because the context will make users aware of which entities should be included or excluded.

For these reasons, it is important for developers to understand the non-relational characteristics of Google Cloud Datastore. The following sections discuss how eventual consistency and strong consistency models can be combined to build a scalable, highly available, and highly performing application. In doing so, consistency requirements for a positive user experience will still be satisfied.

Eventual Consistency in Google Cloud Datastore

The correct API must be selected when a strongly consistent view of data is required. The different varieties of Google Cloud Datastore query APIs and their corresponding consistency models are shown in Table 1.

Google Cloud Datastore API

Read of entity value

Read of index

Global Query

Eventual consistency

Eventual consistency

Keys-only Global Query

N/A

Eventual consistency

Ancestor Query

Strong consistency

Strong consistency

Lookup by key (get())

Strong consistency

N/A

Table 1: Google Cloud Datastore queries/get calls and possible consistency behaviors
Google Cloud Datastore queries without an ancestor are known as global queries and are designed to work with an eventual consistency model. This does not guarantee strong consistency. A keys-only global query is a global query that returns only the keys of entities matching the query, not the attribute values of the entities. An ancestor query scopes the query based on an ancestor entity. The following sections cover each consistency behavior in more detail.

Eventual Consistency when Reading Entity Values

With the exception of ancestor queries, an updated entity value may not be immediately visible when executing a query. To understand the impact of eventual consistency when reading entity values, consider a scenario where an entity, Player, has a property, Score. Consider, for example, that the initial Score has a value of 100. After some time, the Score value is updated to 200. If a global query is executed and includes the same Player entity in the result, it is possible that the value of the property Score of the returned entity might appear unchanged, at 100.

This behavior is caused by the replication between Google Cloud Datastore servers. Replication is managed by Bigtable and Megastore, the underlying technologies for Google Cloud Datastore (see Additional Resources for more on details Bigtable and Megastore). The replication is executed with the Paxos algorithm, which synchronously waits until a majority of the replicas have acknowledged the update request. The replica is updated with data from the request after a period of time. This time period is usually small, but there is no guarantee on its actual length. A query may read the stale data if it is executed before the update finishes.

In many cases, the update will have reached all the replicas very quickly. However, there are several factors that may, when compounded together, increase the time to achieve consistency. These factors include any datacenter-wide incidents that involve switching over a large number of servers between datacenters. Given the variation of these factors, it is impossible to provide any definitive time requirements for establishing full consistency.

The time required for a query to return the latest value is usually very short. However, in rare situations when the replication latency increases, the time can be much longer. Applications that use Google Cloud Datastore global queries should be carefully designed to handle these cases gracefully.

The eventual consistency on reading entity values can be avoided by using a keys-only query, an ancestor query, or lookup by key (the get() method). We will discuss these different types of queries in more depth below.

Eventual Consistency on Reading an Index

An index may not yet be updated when a global query is executed. This means that, even though you may able to read the latest property values of the entities, the “list of entities” included in the query result may be filtered based on old index values.

To understand the impact of eventual consistency on reading an index, imagine a scenario where a new entity, Player, is inserted into Google Cloud Datastore. The entity has a property, Score, which has an initial value of 300. Immediately after the insertion, you execute a keys-only query to fetch all entities with a Score value greater than 0. You would then expect the Player entity, just recently inserted, to appear in the query results. Perhaps unexpectedly, instead, you may find that the Player entity does not appear in the results. This situation can occur when the index table for the Score property is not updated with the newly inserted value at the time of the query execution.

Remember that all the queries in Google Cloud Datastore are executed against index tables, and yet the updates to the index tables are asynchronous. Every entity update is, essentially, made up of two phases. In the first phase, the commit phase, a write to the transaction log is performed. In the second phase, data is written and indexes are updated. If the commit phase succeeds, then the write phase is guaranteed to succeed, though it might not happen immediately. If you query an entity before the indexes are updated, you may end up viewing data that is not yet consistent.

As a result of this two phase process, there is a time delay before the latest updates to entities are visible in global queries. Just as with entity value eventual consistency, the time delay is typically small, but may be longer (even minutes or more in exceptional circumstances).

The same thing can happen after updates as well. For example, suppose you update an existing entity, Player, with a new Score property value of 0, and executed the same query immediately afterwards. You would expect the entity not to appear in the query results because the new Score value of 0 would exclude it. However, due to the same asynchronous index update behavior, it is still possible for the entity to be included in the result.

The eventual consistency on reading an index can be only be avoided by using an ancestor query or lookup by key method. A keys-only query can not avoid this behavior.

Strong Consistency on Reading Entity Values and Indexes

In Google Cloud Datastore, there are only two APIs that provide a strongly consistent view for reading entity values and indexes: (1) the lookup by key method and (2) the ancestor query. If application logic requires strong consistency, then the developer should use one of these methods to read entities from Google Cloud Datastore.

Google Cloud Datastore is specifically designed to provide strong consistency on these APIs. When calling either one of them, Google Cloud Datastore will flush all pending updates on one of the replicas and index tables, then execute the lookup or ancestor query. Thus, the latest entity value, based on the updated index table, will always be returned with values based on the latest updates.

The lookup by key call, in contrast to queries, only returns one entity or a set of entities specified by a key or a set of keys. This means that an ancestor query is the only way in Google Cloud Datastore to satisfy strong consistency requirement together with a filtering requirement. However, ancestor queries do not work without specifying an entity group.

Ancestor Query and Entity Group

As discussed at the beginning of this document, one of the benefits of Google Cloud Datastore is that developers can find an optimal balance between strong consistency and eventual consistency. In Google Cloud Datastore, an entity group is a unit with strong consistency, transactionality, and locality. By utilizing entity groups, developers can define the scope of strong consistency among the entities in an application. In this way, the application can maintain consistency inside the entity group while, at the same time, achieving high scalability, availability, and performance as a complete system.

An entity group is a hierarchy formed by a root entity and its children or successors.[1] To create an entity group, a developer specifies an ancestor path, which is, essentially, a series of parent keys prefixing the child key. The concept of entity group is illustrated in Figure 3. In this case, the root entity with the key “ateam” has two children with the keys “ateam/098745” and “ateam/098746”.


Figure 3: Schematic View of Entity Group Concept
Inside the entity group, the following characteristics are guaranteed:

Strong Consistency
An ancestor query on the entity group will return a strongly consistent result. In this way, it reflects the latest entity values filtered by the latest index state.
Transactionality
By demarcating a transaction programmatically, the entity group provides ACID (atomicity, consistency, isolation, and durability) characteristics in the transaction.
Locality
Entities in an entity group will be stored at physically close places on Google Cloud Datastore servers, because all the entities are sorted and stored by the lexicographical order of the keys. This enables an ancestor query to rapidly scan the entity group with minimal I/O.
An ancestor query is a special form of query that only executes against a specified entity group. It executes with strong consistency. Behind the scenes, Google Cloud Datastore assures that all the pending replications and index updates are applied before executing the query.

Ancestor Query Example

This section describes how to use entity groups and ancestor queries in practice. In the following example, we consider the problem of managing data records for people. Suppose we have code that adds an entity of a specific kind followed immediately by a query on that kind. This concept is demonstrated by the example Python code below.

# Define the Person entity
class Person(db.Model):
    given_name = db.StringProperty()
    surname = db.StringProperty()
    organization = db.StringProperty()
# Add a person and retrieve the list of all people
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
