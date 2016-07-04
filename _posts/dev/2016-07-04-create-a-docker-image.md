/---
title : 내가 필요한 Docker Image 만들기
layout : default
category : dev
tags : docker, container engine
description : Docker로 WAS환경을 구축해보자. 기본적으로 ubuntu 이미지에 내가 필요한 서버 환경들을 올려놓고 이미지를 만들려고 한다.
---

# 내가 필요한 Docker Image 만들기

일단 [Build your own images](https://docs.docker.com/engine/tutorials/dockerimages/) 문서를 참고해서 나의 이미지를 만들고 저장해봅니다.. 이미지에 넣을 것들은 대강 아래의 것들

 - [JDK8](#jdk8)
 - [nginx](#nginx)
 - [tomcat](#tomcat)
 - [Gradle](#gradle)
 - [Git](#git)

docker ubuntu 이미지를 받아서 위의 것들을 추가한 방식으로 이미지를 만들예정이다.
그럼 최우선으로 ubuntu 이미지를 받아봅니다.

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
이미지 안에서 이제 모듈 설치를 위해 ubuntu의 apt-get update하고 주루룩 설치해봅니다.

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

jdk가 있는 repository를 추가한다 webupd8team은 oracle 공식 repo가 아닙니다;;

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

이제 이미지를 만들어볼 차례입니다. 우선 Docker container안에 접속하고 있다면 `exit` 명령어로 빠져나옵니다.

```
root@19ae698863b3:/# exit
$
```

Docker image를 만드는 것은 `git`과 비슷한 컨셉으로 해당 container상태를 `repo정보,tag`와 함께 `commit`을 하면 image가 생성이 됩니다.
이때 필요한 것이 `container id` 인데 자신의 container id를 모른다면 아래의 명령으로 이전에 수행된 container 이력을 통해서 확인할 수 있습니다.

```
$ docker ps -a
```

`container id`를 확인 하였으면 아래의 명령으로 commit을 합니다.

```
$ docker commit -m "initial commit" -a "nurinamu" {container_id} nurinamu/ubuntu:basic
```

## Docker Image를 Docker hub에 올리기.

만들어놓은 이미지를 언제 어디서나 접근하기 위해서는 local이 아닌 remote 공간이 필요한데 Docker에서는 [Docker Hub](http://hub.docker.com)이라는 서비스를 제공하고 있습니다. 이제 이미지를 여기에 저장해보겠습니다. 하지만 이를 위해서는 우선 당연히 [Docker Hub](http://hub.docker.com)에 계정이 있어야합니다. 계정이 있거나 생성했다면 다음 명령어로 `Docker hub`에 접근합니다.

```
$ docker login
```

그럼 이제 image를 `push`합니다. `git`에 익숙한 분들은 commit/push/pull 명령어에 금방 익숙해지실 수 있습니다.

```
$ docker push nurinamu/ubuntu:basic
```

만약 위 명령에서 tag 없이 push 하면 같은 이미지이름을 가진 모든 태깅 이미지가 push 됩니다.

## 끝!
