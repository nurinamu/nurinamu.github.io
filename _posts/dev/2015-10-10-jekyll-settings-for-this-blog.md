---
title : Jekyll로 Github에 블로그 연결하기.
layout : default
category : dev
tags : jekyll
---
### [기존의 Tistory Blog](http://nurinamu.tistory.com)가 거의 죽어가는 마당에 웬 새로운 블로그냐고?

블로그를 새로 시작하게되면 하고 싶었던 것들이 몇가지 있다.
- Front 기술들을 적용해볼 공간이 필요.
- 개발자 스러움을 좀 더.
- 꽁짜
- 무제한 공간

그래서 결정한 것이 바로 [Jekyll@Github](http://jekyllrb.com/docs/github-pages/) 이다.

이 글은 이 블로그를 업뎃하면서 계속 업뎃되면서 변경사항을 남기게 될 것이다.

### http://nurinamu.com 만들기
- [Github](http://github.com)에 {id}.github.io 이름으로 repository를 생성한다.
- 해당 repo의 local repo를 만들고 ruby/bundle/jekyll을 설치한다.
- Gemfile에 아래 내용을 삽입하고 `bundle install`로 Jekyll@Github을 위한 패키지를 설치한다.


```
source 'https://rubygems.org'
gem 'github-pages'
```

### 변경사항
 - 블로그 오픈 (2015/10/10)
