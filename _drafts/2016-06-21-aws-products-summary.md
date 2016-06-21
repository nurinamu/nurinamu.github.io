---
title : 아마존 Product 이해하기
layout : default
category : dev
tags : amazon
---

# AWS(Amazon Web Service) Product들 알아보기

AWS에 대한 학습을 더 이상 미룰 수 없는 상황이 되어 우선 Product line들을 오버뷰를 시작 해보고자 어떤 제품들로 구성되었고 각 제품들은 어떤 일들을 하는지 정리합니다.


## Cloud Infrastructure Services

### Compute
- Amazon EC2 : Virtual Servers in the Cloud
- Amazon EC2 Container Registry : Store and Retrieve Docker Images
- Amazon EC2 Container Service : Run and Manage Docker Containers
- AWS Elastic Beanstalk : Run and Manage Web Apps
- AWS Lambda : Run Your Code in Response to Events
- Auto Scaling : Automatic Elasticity
- Elastic Load Balancing : High Scale Load Balancing

### Storage & Content Delivery
- Amazon S3 : Scalable Storage in the Cloud
- Amazon CloudFront : Global Content Delivery Network
- Amazon EBS : EC2 Block Storage Volumes
- Amazon Elastic File System : Fully Managed File System for EC2
- Amazon Glacier : Low-Cost Archive Storage in the Cloud
- AWS Import/Export Snowball : Large Scale Data Transport
- AWS Storage Gateway : Hybrid Storage Integration

### Database
- Amazon RDS : Managed Relational Database Service for Amazon Aurora, MySQL, PostgresSQL, Oracle, SQL Server and MariaDB
- AWS Database Migration Service : Migrate Databases with Minimal Downtime
- Amazon DynamoDB : Managed NoSQL Database
- Amazon ElastiCache : In-Memory Caching Service
- Amazon Redshift : Fast, Simple, Cost-Effective Data Warehousing

### Networking
- Amazon VPC : Isolated Cloud Resources
- AWS Direct Connect : Dedicated Network Connection to AWS
- Elastic Load Balancing : High Scale Load Balancing
- Amazon Route 53 : Scalable Domain Name System

## Rich Platform Services

### Analytics
- Amazon QuickSight : Fast Business Intelligence Service
- Amazon Redshift : (Compute / Databse)
- Amazon Machine Learning : Machine Learning for Developers
- Amazon Kinesis : Work with Real-Time Streaming Data
- Amazon Elasticsearch Service : Run and Scale Elasticsearch Clusters
- Amazon EMR : Hosted Hadoop Framework
- AWS Data Pipeline : Orchestration Service for Periodic, Data-Driven WOrkflows

### Enterprise Applications
- Amazon WorkSpaces : Desktop Computing Service
- Amazon WorkMail : Secure and Managed Business Email and Calendaring
- Amazon WorkDocs : Enterprise Storage and Sharing Service

### Mobile Services
- AWS Mobile Hub : Build, Test and Monitor Mobile Apps
- Amazon API Gateway : Build, Deploy and Manage APIs
- Amazon Cognito : User Identity and App Data Synchronization
- AWS Device Farm : Test Android, FireOS and iOS Apps on Real Devices in the Cloud
- Amazon Mobile Analytics : Collect, View and Export App Analytics
- AWS Mobile SDK : Mobile Software Development Kit
- Amazon SNS : Push Notification Service

### Internet of Things
- AWS IoT : Connect Devices to the Cloud

## Productivity

### Developer Tools
- AWS CodeCommit : Store Code in Private Git Repositories
- AWS CodeDeploy : Automate Code Deployment
- AWS CodePipeline : Release Software using Continuous Delivery

### Management Tools
- Amazon CloudWatch : Monitor Resources and Applications
- AWS CloudFormation : Create and Manage Resources with Templates
- AWS CloudTrail : Track User Activity and API Usage
- AWS Config : Track Resource Inventory and Changes
- AWS OpsWorks : Automate Operations with Chef
- AWS Service Catalog : Create and Use Standardized Products
- Trusted Advisor : Optimize Performance and Security

### Security & Identity
- AWS Identity and Access Management (IAM) : Manage User Access and Encryption Keys
- AWS Certificate Manager : Provision, Manage and Deploy SSL/TLS Certificates
- AWS CloudHSM : Hardware-Based Key Storage for Regulatory Compliance
- AWS Key Management Service : Managed Creation and Control of Encryption Keys
- AWS Directory Service : Host and Manage Active Directory
- Amazon Inspector : Analyze Application Security
- AWS WAF : Filter Malicious Web Traffic

### Application Services
- Amazon API Gateway : (Rich Platform Services / Mobile Services)
- Amazon AppStream : Low-Latency Application Streaming
- Amazon CloudSearch : Managed Search Service
- Amazon Elastic Transcoder : Easy-to-Use Scalable Media Transcoding
- Amazon SES : Email Sending and Receiving Service
- Amazon SNS : (Rich Platform Service / Mobile Services)
- Amazon SQS : Message Queue Service
- Amazon SWF : Workflow Service for Coordinating Application Components
