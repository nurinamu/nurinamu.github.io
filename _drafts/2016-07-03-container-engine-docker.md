---
title : Google Container Engine으로 서버 환경 구축해보기
layout : default
category : dev
tags : gce, gcp, docker, container engine
description : Docker로 WAS환경을 구축해서 Google Container Engine을 써서 배포해보자.
---

# Google Container Engine으로 서버 환경 구축해보기

GDG 모임에서 이런저런 이야기나오다가 토이프로젝트를 해보자는 말에 그동안 미뤄왔던 Docker와 Java8 관련 코딩을 한번 해보자는 생각에 시작해봅니다.

일단 Hello World까지 만들 서버 환경은
- [Google Container Engine + Docker](#1st)
- JDK8
- nginx + tomcat
- Spring

## <a name="1st"></a>Google Container Engine + Docker
그럼 일단 Docker Image 부터 만들어보자.

mac에서 Docker가 지원된다고 하니 굳이 cloud 환경에서 만들어서 올리지말고 내 로컬에서 해보기로 합니다. 일단 Docker를 처음 써보는 것이니 튜토리얼 투어를 떠나 봅니다.
- [Getting Started with Docker for Mac](https://docs.docker.com/docker-for-mac/)
- [내가 필요한 Docker Image 만들기](http://www.nurinamu.com/dev/2016/07/04/create-a-docker-image/) : 튜토리얼 보고 학습한 다음에 기본기입니다.

원하는 이미지를 만들 수 있게되었으니 이걸 나중에는 [Google Container Registry](https://cloud.google.com/container-registry/)에 올려두자.
