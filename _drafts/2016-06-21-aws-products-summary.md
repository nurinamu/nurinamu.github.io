---
title : 아마존 Product 이해하기
layout : default
category : dev
tags : amazon
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
- [Amazon EBS](https://aws.amazon.com/ko/ebs/) : EC2 Block Storage Volumes
- [Amazon Elastic File System]() : Fully Managed File System for EC2
- [Amazon Glacier]() : Low-Cost Archive Storage in the Cloud
- [AWS Import/Export Snowball]() : Large Scale Data Transport
- [AWS Storage Gateway]() : Hybrid Storage Integration

### Database
- [**Amazon RDS**]() : Managed Relational Database Service for Amazon Aurora, MySQL, PostgresSQL, Oracle, SQL Server and MariaDB
- [AWS Database Migration Service]() : Migrate Databases with Minimal Downtime
- [**Amazon DynamoDB**]() : Managed NoSQL Database
- [**Amazon ElastiCache**]() : In-Memory Caching Service
- [**Amazon Redshift**]() : Fast, Simple, Cost-Effective Data Warehousing

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
