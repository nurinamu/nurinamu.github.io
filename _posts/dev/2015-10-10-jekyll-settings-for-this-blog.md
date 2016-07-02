---
title : Jekyll로 Github에 Static 블로그 만들기.
layout : default
category : dev
tags : jekyll
description : 기존의 Tistory Blog(http://nurinamu.tistory.com)가 거의 죽어가는 마당에 웬 새로운 블로그냐고? 블로그를 새로 시작하게되면 하고 싶었던 것들이 몇가지 있다. Front 기술들을 적용해볼 공간이 필요. 개발자 스러움을 좀 더. 꽁짜. 무제한 공간.
---
### [기존의 Tistory Blog](http://nurinamu.tistory.com)가 거의 죽어가는 마당에 웬 새로운 블로그냐고?

블로그를 새로 시작하게되면 하고 싶었던 것들이 몇가지 있다.

- Front 기술들을 적용해볼 공간이 필요.
- 개발자 스러움을 좀 더.
- 꽁짜.
- 무제한 공간.

그래서 결정한 것이 바로 [Jekyll@Github](http://jekyllrb.com/docs/github-pages/) 이다.

이 글은 이 블로그를 업뎃하면서 계속 업뎃되면서 변경사항을 남기게 될 것이다.

### [http://nurinamu.com](http://nurinamu.com) 만들기
- [Github](http://github.com)에 `{id}.github.io` 이름으로 repository를 생성한다.
- 해당 repo의 local repo를 만들고 ruby/bundle/jekyll을 설치한다.
- Gemfile에 아래 내용을 삽입하고 `bundle install`로 Jekyll@Github을 위한 패키지를 설치한다.


```
source 'https://rubygems.org'
gem 'github-pages'
```

- 이제 `index.html`에 내용을 작성하고 shell에서 `bundle exec jekyll serve` 를 실행한다.
- `localhost:4000`를 Browser로 열면 자신이 입력한 내용이 표시되는 것을 확인할 수 있다.
- 이것을 이제 remote의 `master`로 push를 하게되면 `http://{id}.github.io` 에서 확인이 가능하다. 'gh-pages'로 따로 올리지 않아도 자동으로 static 페이지가 빌드되어 나타나게 된다. 이때 간혹 빌드가 늦어져서 반영에 시간이 걸릴 때도 있다.
- 그리고 `nurinamu.com` 같은 자신의 custom domain으로 페이지를 연결하고 싶을 때는 project 최상단 위치에 `CNAME`파일을 생성하고 아래처럼 연결할 주소 정보를 입력한다.

```
www.nurinamu.com
```

- 그럼 이제 설치가 완료되었으니 Jekyll syntax에 따라 _layouts, _includes, _posts를 생성하고 작성한다.
- 각각에 대한 내용은 또 다른 포스트로 설명하기로.

### 변경사항
 - 블로그 오픈 (2015/10/9)
 - Googling 카테고리 추가 (2016/06/27)
 - Translation 카테고리 추가 (2016/06/30)
 - Pagination 적용 (2016/07/01)
