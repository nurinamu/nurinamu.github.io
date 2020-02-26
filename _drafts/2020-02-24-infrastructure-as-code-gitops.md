---
title : Infrastructure As Code? GitOps?
layout : default
category : dev
tags : jekyll
description : 카카오에 새로 합류하면서 노후화된 CI/CD 환경을 개편중이다. 그러면서 접하게되는 개념들을 정리해보자.
---

### Infrastructure As Code?? GitOps?? 다 뭐냐?

과거 단일 서버만을 운영하거나 간단한 Infra 구조에서는 서버 개발자들이 본인의 서브 업무로 Integration / Deployment가 가능했다. 하지만 Cloud에 오면서 Infra를 효율적 비용으로 운영하기 위해 클러스터를 운영하고 서비스 구조를 개편하면서 복잡도를 가지게 되었으며 추가적으로 MSA 형태로 운영하기 시작하면서 더더 복잡해지기 시작했다. 이제는 단순히 cli에 들어가서 배포하는 것은 엄청난 장애 리스크와 배포 담당자의 부담으로 다가오는 시점이 되었다. 그래서 각종 CI/CD 관련 기술들이 나오게되었으며 특히 자동화에 대한 필요와 고민들이 늘어갔다. 그에 맞춰 [Docker](https://www.docker.com/) 이미지를 통한 빌드/배포가 보편화되고 [kubernetes](https://kubernetes.io/)등의 유행에 따른 config base의 infra orchestration이 퍼져나갔다. 그리고 관심 받는 것이 [Infrastrcture As Code(IAC)](https://en.wikipedia.org/wiki/Infrastructure_as_code)이다. config base의 환경 구성을 code로 구성할 수 있게 해주는 것이다. 많이 들어본 기술들로는 [Ansible](https://www.ansible.com/), [Terraform](https://www.terraform.io/) 등이 있다. 근데 여기서 환경 구성이란게 어느 부분을 이야기하는 걸까. Provision? Deploy? 

#### Provision과 Deploy

매번 글들을 보면서 헤깔리는 점이 있는데 



그리고 여기에 Travis/Jenkins등의 조합으로 CI/CD 환경이 많은 부분 자동화 되고 단순화되게 되었다. 하지만 마지막 남은 한단계가 인프라 환경의 자동화다. 그래도 kubernetes를 사용하여 kubectl을 통한 변경으로 많은 부분 간편해 졌지만 특정 서버에 접속하고 인증하고 등등 사람손이 개입되고 실수의 부분들이 있어 개선이 필요하다. 그래서 또 나온 키워드가 **GitOps**..

