---
title : 내가 필요한 Docker Image 만들기
layout : default
category : dev
tags : docker, container engine
description : Docker로 WAS환경을 구축해보자. 기본적으로 ubuntu 이미지에 내가 필요한 서버 환경들을 올려놓고 이미지를 만들려고 한다.
---

# 내가 필요한 Docker Image 만들기

일단 [Build your own images](https://docs.docker.com/engine/tutorials/dockerimages/) 문서를 참고해서 나의 이미지를 만들어보자. 이미지에 넣을 것들은 대강 아래의 것들
 - [JDK8](#jdk8)
 - nginx
 - tomcat
 - Gradle
 - Git

docker ubuntu 이미지를 받아서 위의 것들을 추가한 방식으로 이미지를 만들예정이다.
그럼 최우선으로 ubuntu 이미지를 받아보자.

```
$ docker login //docker hub 로그인
$ docker pull ubuntu:14.04 //ubuntu 14.04 받기.
$ docker images //정상적으로 받아졌나 내 로컬 레포에서 이미지 확인
```

이미지를 받았으면 이제 들어가세.

```
$docker -t -i ubuntu:14.04
root@19ae698863b3:/#  //container안으로 진입!
```

## Tool 설치
이미지 안에서 이제 모듈 설치를 위해 ubuntu의 apt-get update하고 주루룩 설치해보자.

### <a name="jdk8"></a>JDK8 설치

일단 apt-get repository 업데이트
```
root@19ae698863b3:/# apt-get update
```

OpenJDK부터 삭제. 매번 충돌나고 뭐 짜증이남. ㅋ
```
root@19ae698863b3:/# apt-get purge openjdk*
```

java8을 받기위해 apt-get에 repository를 추가하려면 아래를 먼저 설치해야한다.이안에 우리가 필요로하는 'add-apt-repository' 가 있어서.
```
root@19ae698863b3:/# apt-get install software-properties-common
```

jdk가 있는 repository를 추가한다 webupd8team은 oracle 공식 repo가 아니다;;
```
root@19ae698863b3:/# add-apt-repository ppa:webupd8team/java
```
repo가 신규 추가되었으니 다시한번 업데이트
```
root@19ae698863b3:/# apt-get update
```
이제 JDK8 설치!
```
root@19ae698863b3:/# apt-get install oracle-java8-installer

```
Java 설치 버전확인
```
root@19ae698863b3:/# java -version
```

### <a name="nginx"></a>nginx 설치

nginx를 받기 위한 repository 추가
```
root@19ae698863b3:/# add-apt-repository ppa:nginx/development
```

레포 추가했으니 다시 apt-get 업데이트
```
root@19ae698863b3:/# apt-get update
```

그럼 nginx 설치
```
root@19ae698863b3:/# apt-get install nginx
```

### <a name="tomcat"></a>tomcat 설치

Tomcat 설치는 뭐 한줄로 뙇
```
root@19ae698863b3:/# apt-get inatll tomcat7
```

### <a name="gradle"></a>gradle 설치
Gradle 설치도 한줄로 뙇
```
root@19ae698863b3:/# apt-get inatll gradle
```

### <a name="git"></a>git 설치
마지막 Git도 한방에 뙇!
```
root@19ae698863b3:/# apt-get inatll git
```

## Docker 이미지 만들기

02e3c7b7cbc6
