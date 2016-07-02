---
title : 아마존 Product 이해하기
layout : default
category : dev
tags : amazon
description : AWS(Amazon Web Service) Product들 알아보기 AWS에 대한 학습을 더 이상 미룰 수 없는 상황이 되어 우선 Product line들을 오버뷰를 시작 해보고자 어떤 제품들로 구성되었고 각 제품들은 어떤 일들을 하는지 정리합니다.
---

# AWS(Amazon Web Service) Product들 알아보기

AWS에 대한 학습을 더 이상 미룰 수 없는 상황이 되어 우선 Product line들을 오버뷰를 시작 해보고자 어떤 제품들로 구성되었고 각 제품들은 어떤 일들을 하는지 정리합니다.

**강조**한 제품들은 내가 생각하기에 숙지해두는 것이 좋을 것 같은 주요 제품.

## Cloud Infrastructure Services

### Compute
- [**Amazon EC2**](https://aws.amazon.com/ko/ec2/) : 가상서버서비스로 이미 익히 알려져 있음. 그러니 더 설명이 필요 없음.
- [**Amazon EC2 Container Registry**](https://aws.amazon.com/ko/ecr/) : Docker 이미지를 저장, 관리 배포하는 서비스.
- [**Amazon EC2 Container Service**](https://aws.amazon.com/ko/ecs/) : Docker Image로 EC2 컨테이너를 사용하는 서비스 - [참고자료](http://blog.gsclip.com/2015/09/ec2-container-service-%EC%9D%B4%ED%95%B4/)
- [**AWS Elastic Beanstalk**](https://aws.amazon.com/ko/elasticbeanstalk/) : EC2를 이용한 PaaS 서비스로 버전별 배포관리와 Instance 로드밸런싱, 오토스케일링을 지원한다.
- [**AWS Lambda**](https://aws.amazon.com/ko/lambda/) : 특정 Event에대한 Trigger를 받아 다른 서비스를 Trigger하는 서비스. 단순작업인데 많은 request와 data update가 예상되는 것들을 처리하기에 좋을 듯.
- [**Auto Scaling**](https://aws.amazon.com/ko/autoscaling/) : EC2 인스턴스 수를 원하는 조건에 따라 유지했다 늘렸다 줄였다하는 기능. 최적의 수를 찾아내는 것이 매우 중요. 하지만 특정 기능이 추가되거나하여 인스턴스 파워 소비량이 바뀌면 그때마다 최적화 해줘야한다. 그래도 일단 특정 조건에따라 자동으로 늘어나고 Max 설정이 가능하니 폭탄 요금과 장애의 완충효과가 있다.
- [**Elastic Load Balancing**](https://aws.amazon.com/ko/elasticloadbalancing/) : 트래픽 분산처리를 해주는 서비스. Auto Scaling과 묶어서 사용하면 Beanstalk의 효과를 얻을 수 있다. 근데 생각해보면 이거 두가지를 사용할거면 그냥 Beanstalk을 쓰는게 좋을 것 같은데 가격차이가 어떤지 모르겠다.

### Storage & Content Delivery
- [**Amazon S3**](https://aws.amazon.com/ko/s3/) : 아마존에서 제공하는 클라우드 스토리지. 아마존 제품군과 연동이 쉽다는 것 이외에는 말그대로 클라우드 스토리지 그 이상 특별한 것은 없다.
- [**Amazon CloudFront**](https://aws.amazon.com/ko/cloudfront/) : 아마존에서 제공하는 CDN 서비스. 가격은 세일즈와 네고를 해야함. 아카마이보다의 장점은 뭘까?
- [Amazon EBS](https://aws.amazon.com/ko/ebs/) : EBS는 S3나 RDS처럼 특정 기능의 스토리지나 데이터베이스를 제공하는 것이아니라 I/O가능한 블럭을 확장성있게 제공해서 편의에따라 디비나 스토리지로 쓸 수 있게 해주는 서비스. RDS보다는 좀 더 자유롭게 자기가 원하는 RDBMS나 NoSQL 같은 것을 골라서 하는 장점이 있을듯. 스토리지로 사용할때는 S3보다 어떤 장점이 있을지는 문서만 봐서는 잘 모르겠네.
- [Amazon Elastic File System](https://aws.amazon.com/ko/efs) : EC2용 파일스토리지서비스. S3와는 달리 EC2에서만 사용가능한 네트워크 파일 스토리지. 아직 베타다.
- [Amazon Glacier](https://aws.amazon.com/ko/glacier) : 서비스 이름인 빙하처럼 대용량 데이터를 오래 저장하는 목적으로 사용된다. 저장만이 목적이다보니 저장이나 탐색 횟수당 가격을 매긴다. 그래서 한번에 큰용량을 저장하고 꺼낼때만 유리하고 작은 파일을 마구 올렸다가 조회했다가 하면 폭망.
- [AWS Import/Export Snowball](https://aws.amazon.com/ko/importexport) : 대용량 데이터를 S3로 전송할때 S3전송비용이 부담되는 경우 사용하는 서비스. 특이하게도 이 서비스를 신청하면 데이터 전송용 전용 하드웨어를 보내준다고 한다. 이 서비스를 통해 S3에 데이터를 전송하려면 해당 하드웨어로만 해야하는듯, 근데 처음 10일은 무료인데 1일 늘어날때마다 15달라라니! 이거 사용하게되면 담당자는 야근 확정이네 ㅋ
- [AWS Storage Gateway](https://aws.amazon.com/ko/storagegateway/) : 온프레미스 소프트웨어를 오프프레미스 형태로 연결시켜주는 서비스. 사내망의 서비스를 클라우드화하게 해주는 서비스다.

### Database
- [**Amazon RDS**](https://aws.amazon.com/ko/rds) : EC2와 마찬가지로 모르는 사람이 거의 없는 대표 서비스. RDBMS를 특별한 설치 과정없이 클릭 몇 번으로 바로 생성되고 사용할 수 있게 해주는 서비스.
- [AWS Database Migration Service](https://aws.amazon.com/ko/dms) : DB를 AWS RDS로 마이그레이션 해주는 서비스. 문서에는 가동중단 없이 마이그레이션 해준다는 아마도 CDN처럼 마이그레이션 하면서 새로 갱신되는 데이터를 이중화하면서 진행하는 서비스인 듯. 이것도 아직 써보질 않았으니 잘 모르겠음. 아마존 서비스 엄청 많구만.
- [**Amazon DynamoDB**](https://aws.amazon.com/ko/dynamodb) : 요것은 RDS와 마찬가지로 유명한 서비스. RDS는 관계형 디비 서비스고 Dynamo는 NoSQL 디비 서비스. 끝.
- [**Amazon ElastiCache**](https://aws.amazon.com/ko/elasticache) : 메모리 캐싱 서비스로 Memcached와 Redis 두가지를 지원한다. 빠른 I/O를 원하는 처리 부분에서 많이 사용됨. 유명한데 아직 써본 적이 없지만 공짜로 써볼 수 있으니 게임만들때 통계나 랭킹서비스 같은 것에 써봐야겠다.
- [**Amazon Redshift**](https://aws.amazon.com/ko/redshift) : 데이터 웨어하우징 서비스로 RDBMS 형태로 지원이된다. RDS는 서비스상에서 온타임 리퀘스트 처리용이고 Redshift는 배치나 대용량으로 복잡한 쿼리등을 통해 온타임 리퀘스트와는 거리가 있는 부분에서 사용한다. 하지만 문서상으로는 속도가 10배이상 향상되었다니 복잡한 쿼리도 온타임 처리될 듯. 안써봐서 어떤지는 판단보류.

### Networking
- [Amazon VPC]() : Isolated Cloud Resources
- [AWS Direct Connect]() : Dedicated Network Connection to AWS
- [**Elastic Load Balancing**]() : High Scale Load Balancing
- [**Amazon Route 53**]() : Scalable Domain Name System

## Rich Platform Services

### Analytics
- [Amazon QuickSight]() : Fast Business Intelligence Service
- [**Amazon Redshift**]() : (Compute / Databse)
- [Amazon Machine Learning]() : Machine Learning for Developers
- [Amazon Kinesis]() : Work with Real-Time Streaming Data
- [**Amazon Elasticsearch Service**]() : Run and Scale Elasticsearch Clusters
- [Amazon EMR]() : Hosted Hadoop Framework
- [AWS Data Pipeline]() : Orchestration Service for Periodic, Data-Driven WOrkflows

### Enterprise Applications
- [Amazon WorkSpaces]() : Desktop Computing Service
- [Amazon WorkMail]() : Secure and Managed Business Email and Calendaring
- [Amazon WorkDocs]() : Enterprise Storage and Sharing Service

### Mobile Services
- [AWS Mobile Hub]() : Build, Test and Monitor Mobile Apps
- [Amazon API Gateway]() : Build, Deploy and Manage APIs
- [Amazon Cognito]() : User Identity and App Data Synchronization
- [AWS Device Farm]() : Test Android, FireOS and iOS Apps on Real Devices in the Cloud
- [Amazon Mobile Analytics]() : Collect, View and Export App Analytics
- [AWS Mobile SDK]() : Mobile Software Development Kit
- [**Amazon SNS**]() : Push Notification Service

### Internet of Things
- [AWS IoT]() : Connect Devices to the Cloud

## Productivity

### Developer Tools
- [AWS CodeCommit]() : Store Code in Private Git Repositories
- [AWS CodeDeploy]() : Automate Code Deployment
- [AWS CodePipeline]() : Release Software using Continuous Delivery

### Management Tools
- [**Amazon CloudWatch**]() : Monitor Resources and Applications
- [AWS CloudFormation]() : Create and Manage Resources with Templates
- [AWS CloudTrail]() : Track User Activity and API Usage
- [AWS Config]() : Track Resource Inventory and Changes
- [AWS OpsWorks]() : Automate Operations with Chef
- [AWS Service Catalog]() : Create and Use Standardized Products
- [Trusted Advisor]() : Optimize Performance and Security

### Security & Identity
- [**AWS Identity and Access Management (IAM)**]() : Manage User Access and Encryption Keys
- [AWS Certificate Manager]() : Provision, Manage and Deploy SSL/TLS Certificates
- [AWS CloudHSM]() : Hardware-Based Key Storage for Regulatory Compliance
- [AWS Key Management Service]() : Managed Creation and Control of Encryption Keys
- [AWS Directory Service]() : Host and Manage Active Directory
- [Amazon Inspector]() : Analyze Application Security
- [AWS WAF]() : Filter Malicious Web Traffic

### Application Services
- [Amazon API Gateway]() : (Rich Platform Services / Mobile Services)
- [Amazon AppStream]() : Low-Latency Application Streaming
- [**Amazon CloudSearch**]() : Managed Search Service
- [Amazon Elastic Transcoder]() : Easy-to-Use Scalable Media Transcoding
- [**Amazon SES**]() : Email Sending and Receiving Service
- [Amazon SNS]() : (Rich Platform Service / Mobile Services)
- [**Amazon SQS**]() : Message Queue Service
- [Amazon SWF]() : Workflow Service for Coordinating Application Components
