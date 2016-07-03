---
title : 스트롱 컨시스턴시를 위한 데이터 구조화
layout : default
category : translation
tags : appengine,datastore,strong consistency
description :
---

# 스트롱 컨시스턴시를 위한 데이터 구조화

> #### 번역
해당 번역은 정식번역이 아닌 개인 학습 목적으로 번역되었습니다. Eventual Consistency와 Strong Consistency가 너무 괴롭히기에 이 녀석을 좀 더 확실하게 분석하기 위함입니다. 이 번역안에는 의역 오역이 넘쳐나기 때문에 교정해주실 분들은 [PR](https://github.com/nurinamu/nurinamu.github.io)주시면 감사하겠습니다. - **_nurinamu_**

원문 : [Structuring Data for Strong Consistency](https://cloud.google.com/appengine/docs/java/datastore/structuring_for_strong_consistency)


The Google App Engine High Replication Datastore (HRD) provides high availability, scalability and durability by distributing data over many machines and using masterless, synchronous replication over a wide geographic area. However, there is a tradeoff in this design, which is that the write throughput for any single entity group is limited to about one commit per second, and there are limitations on queries or transactions that span multiple entity groups. This page describes these limitations in more detail and discusses best practices for structuring your data to support strong consistency while still meeting your application's write throughput requirements.

Strongly-consistent reads always return current data, and, if performed within a transaction, will appear to come from a single, consistent snapshot. However, queries must specify an ancestor filter in order to be strongly-consistent or participate in a transaction, and transactions can involve at most 25 entity groups. Eventually-consistent reads do not have those limitations, and are adequate in many cases. Using eventually-consistent reads may allow you to distribute your data among a larger number of entity groups, enabling you to obtain greater write throughput by executing commits in parallel on the different entity groups. But, you need to understand the characteristics of eventually-consistent reads in order to determine whether they are suitable for your application:

The results from these reads may not reflect the latest transactions. This can occur because these reads do not ensure that the replica they are running on is up-to-date. Instead, they use whatever data is available on that replica at the time of query execution. Replication latency is almost always less than a few seconds.
A committed transaction that spanned multiple entities may appear to have been applied to some of the entities and not others. Note, though, that a transaction will never appear to have been partially applied within a single entity.
The query results may include entities that should not have been included according to the filter criteria, and may exclude entities that should have been included. This can occur because indexes may be read at a different version than the entity itself is read at.
To understand how to structure your data for strong consistency, compare two different approaches for a simple guestbook application. The first approach creates a new root entity for each entity that is created:

appengine/datastore/src/main/java/com/example/appengine/Guestbook.java VIEW ON GITHUB

It then queries on the entity kind Greeting for the ten most recent greetings.

appengine/datastore/src/main/java/com/example/appengine/Guestbook.java VIEW ON GITHUB

However, because we are using a non-ancestor query, the replica used to perform the query in this scheme may not have seen the new greeting by the time the query is executed. Nonetheless, nearly all writes will be available for non-ancestor queries within a few seconds of commit. For many applications, a solution that provides the results of a non-ancestor query in the context of the current user's own changes will usually be sufficient to make such replication latencies completely acceptable.

If strong consistency is important to your application, an alternate approach is to write entities with an ancestor path that identifies the same root entity across all entities that must be read in a single, strongly-consistent ancestor query:

appengine/datastore/src/main/java/com/example/appengine/GuestbookStrong.java VIEW ON GITHUB

You will then be able to perform a strongly-consistent ancestor query within the entity group identified by the common root entity:

appengine/datastore/src/main/java/com/example/appengine/GuestbookStrong.java VIEW ON GITHUB

This approach achieves strong consistency by writing to a single entity group per guestbook, but it also limits changes to the guestbook to no more than 1 write per second (the supported limit for entity groups). If your application is likely to encounter heavier write usage, you may need to consider using other means: for example, you might put recent posts in a memcache with an expiration and display a mix of recent posts from the memcache and the Datastore, or you might cache them in a cookie, put some state in the URL, or something else entirely. The goal is to find a caching solution that provides the data for the current user for the period of time in which the user is posting to your application. Remember, if you do a get, an ancestor query, or any operation within a transaction, you will always see the most recently written data.
