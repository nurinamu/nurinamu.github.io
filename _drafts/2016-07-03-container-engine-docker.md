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

### nginx + tomcat 연동하기

mac에서 Docker가 지원된다고 하니 굳이 cloud 환경에서 만들어서 올리지말고 내 로컬에서 해보기로 합니다. 일단 Docker를 처음 써보는 것이니 튜토리얼 투어를 떠나 봅니다.
- [Getting Started with Docker for Mac](https://docs.docker.com/docker-for-mac/)
- [내가 필요한 Docker Image 만들기](http://www.nurinamu.com/dev/2016/07/04/create-a-docker-image/) : 튜토리얼 보고 학습한 다음에 기본기입니다.

제가 위의 예제로 만들어둔 `nurinamu/ubuntu:basic` 이미지를 여기에서 이용합니다.

80포트를 열어서 이미지를 docker로 올려봅니다.
```
$ docker run -t -i -p 80:80 nurinamu/ubuntu:basic /bin/bash
```

컨테이너 안으로 들어가서 이제 nginx를 실행합니다.

```
container# service nginx start
```

브라우저로 `http://localhost`에 접근해서 `Welcome to nginx!`를 확인합니다. 이제 그럼 `tomcat`을 `nginx`에 연결해봅시다.

연결하기 이전에 우선 `nginx`와 `tomcat`의 처리 부분을 결정합니다. 저는 모든 request가 기본적으로는 `tomcat`에 연결되도록하고 아래의 request들을 예외 부분으로 처리해서 `nginx`로 보내려고 합니다.

- 확장자가 `js, css, html` 인 것들
- 지정 폴더 하위의 모든 것들 `/imgs, /assets`

보면 알겠지만 WAS complie이 필요없는 것들만 처리하도록 합니다.
그래서 만들어진 설정은 아래와 같습니다.

```
nginx.conf 파일

location {

}
```

그럼 이제 다시 `http://localhost` 에 접근하면 `tomcat home`이 표시됩니다.

이제 만들어진 이미지를 자기가 원하는 이름으로 이미지 저장합니다.

### 자동 실행되도록 설정하기
이제 컨테이너가 Docker에 올라가는 시점에 웹서버가 바로 실행될 수 있도록 설정을 합니다. 우선 `nginx`는 `nginx.conf`에 아래 내용을 첫라인에 추가합니다.

```
daemon off;
```

위 한줄을 추가하면 nginx가 daemon이되어 background로 빠지지 않고 foreground로 동작합니다.

하지만 이것은 nginx가 실행되었을때 background로 빠져버러 docker process가 바로 종료되는 문제를 해결할 뿐입니다. 실행시 nginx를 start 시켜주지는 못합니다. 그래서 저는 `Dockerfile`을 통해서 nginx를 실행하는 Image를 만듭니다.

우선 `Dockerfile` 이름으로 파일을 생성합니다. 그리고 그안에 아래의 내용을 넣습니다.

```
FROM nurinamu:gdg:basic
EXPOSE 80
CMD ["nginx"]
```

위와 같이 저장하고 아래 명령으로 build 합니다.

```
$ docker build . -t nurinamu/gdg:local
```

그러면 `nurinamu/gdg:locale` 이미지가 만들어지게 됩니다.

해당 이미지를 실행하면 브라우저를 통해 `http:localhost`에서 웰컴페이지를 볼 수 있습니다.

```
#이미지 실행
$ docker run -d -p 80:80 nurinamu/gdg:local
```

### 로컬 개발 Directory를 컨테이너에 연동하기

이제 웹사이트 개발을 해야하는데 매번 github에 올리고 컨테이너에서 pull하고 하는 불편한 방법으로는 무리가 있습니다. Docker는 local의 filesystem을 container filesystem으로 mount해주는 기능이 있습니다. 아래의 명령처럼 이미지를 실행하시면 됩니다.

```
docker run -d -p 80:80 -v {local dir}:{container dir} nurinamu/gdg:local
```

위와 같이 실행하면 container안에서 `{continer dir}` 접근시 `{local dir}`로 설정한 local 파일들을 볼 수 있습니다.

원하는 이미지를 만들 수 있게되었으니 이걸 나중에는 [Google Container Registry](https://cloud.google.com/container-registry/)에 올려두자.
