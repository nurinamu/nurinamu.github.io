---
title : 생소해 Kotlin
layout : default
category : dev
description : Kotlin syntax, grammer 중에 처음보거나 익숙하지 않은 것들을 정리해보자
---

# 생소해 Kotlin #1

Kotlin은 JVM 언어이고 Java와 호환성을 가지고 있기 때문에 Java와 비슷한 맥락을 가지고 있을 것이란 어설픈 추축들을 해왔다.
하지만 보면 볼 수록 익숙하지 않은 부분들이 눈에 들어와 그것들을 정리해보자.

## 생소한 Type
Kotlin 코드를 보면서 생소한 Type들에 대해 모아봤습니다.

#### [Unit](http://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-unit/index.html)
- Javadoc 설명 : The type with only one value: the Unit object. This type corresponds to the `void` type in Java.
  - Java의 `void`와 같은 것이라고 함. 값 하나에대한 타입이 `void`? 역시 이런 것은 예제가 필요함.


- [Unit-retruning functions](https://kotlinlang.org/docs/reference/functions.html#unit-returning-functions)
```kotlin
  fun printStr(value: String): Unit {
    println(value)
  }

  // ^^^ vvv 위아래 동일한 것임.

  fun printStr(value: String) {
    println(value)
  }
```
- 아마도 함수 레퍼런스를 선언할때 `void` 함수의 표현을 위해 `Unit` type이 사용되어 Java의 `void`와 동일하다고 하는 것 같다.
```
var voidFunc: () -> Void = {} //요런게 없기 때문에
var voidFunc: () -> Unit = {} //요렇게 하는 것.
```

#### [Any](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-any/)
- Javadoc 설명 : The root of the Kotlin class hierarchy. Every Kotlin class has Any as a superclass.

- Java의 'Object'와 매칭되는 super class. Object와 다른 것은 Any가 `apply` `let` `run` `to` 등을 extension으로 가지고 있다는 점.

#### [Nothing](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-nothing.html)

- Javadoc 설명 : Nothing has no instances. You can use Nothing to represent "a value that never exists": for example, if a function has the return type of Nothing, it means that it never returns (always throws an exception).

- 함수가 명시적으로 return이 존재하지 않는다고 표기하기위한 class. 한마디로 종료되지 않는 blocking 함수 같은 것. 이것을 종료하려면 `exception` 만이 가능
```kotlin
  //일반적인 return 값이 없는 void 함수
  fun noReturn() {
    println("This method returns nothing.")
  }

  //return이 존재하지 않는다고 선언한 함수....
  fun noReturn() : Nothing {
    println("This method never returns.")
  }
```

- 위의 Nothing 반환 함수는 Nothing type의 값을 return 하라고 error가 발생한다. 하지만 목적은 return을 안하는 것이기 때문에 선언 시에 생각했던 로직이 변경되었거나 처음 디자인과는 다르게 잘못 만들어진 부분이 있는 것이니 return Nothing 선언을 변경하거나 코드 수정을 해야한다. 얼마나 유용할지는 아직 코알못이라 잘 모르겠네.

#### [Pair](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-pair/index.html) / [Triple](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-triple/index.html)

- Javadoc 설명 : There is no meaning attached to values in this class, it can be used for any purpose.
  - 말 그대로 다양한 목적으로 쓸수 있게 단순히 object에 값을 더하는 것 뿐. Pair와 Triple의 차이는 단지 그 값의 개수가 2개냐 3개냐 차이
- 사실 이 기능은 함수 디자인이나 실제 구현시 정말 많은 편의성을 부여한다. 함수 구현시에 한 개 이상의 값을 반환하는 경우에 방법이 없어 Bean을 따로 생성했던 경험이 있는 사람이라면, 그 확장성이 더 없는 Bean class를 선언하고 getter/setter를 만들고 헀던 귀차니즘을 단박에 줄일 수 있다. Generic으로 각 값의 Type도 지정이 가능하니 거의 완벽! 이것만 봐도 Kotlin은 Java에 개발 편의성을 많이 고민했단 생각이 든다. 정말 개발자 친화적이야. 개인적으로 이 Type은 완소!
- [Lombok](https://projectlombok.org/)은 어차피 kotlin의 data class와 마찬가지이니 단순 getter/setter줄이는 것 이외에도 장점이 많다.
```java
  //Java
  public Profile getProfile() {
    Profile a = new Profile();
    a.setName("nurinamu");
    a.setAge(10);
    return a;
  }

  public static void main(String args[]) {
    Profile me = getProfile();
    System.out.println(me.getName());
    System.out.println(me.getAge());
  }

  class Profile{
    private String name;
    private Integer age;

    public void setName(String name) {
      this.name = name;
    }

    public String getName() {
      return this.name;
    }

    public void setAge(String age) {
      this.age = age;
    }

    public Integer getAge() {
      return this.age;
    }
  }

  //kotlin - wow!
  fun getProfile(): Pair<String,Int> = Pair("nurinamu", 10)

  fun main(args: Array<String>) {
    var (name,age) = getProfile()
    println(name)
    println(age)
  }
```

이 글에서는 `생소한` `Type`들만 쓰는 것으로. 사실 `Keyword`, `Syntax`도 한번에 쓰려고 했는데 static blog에서 글이 길어지면 호흡도 길어지고 publishing 타이밍도 놓쳐서 늘어지느라 나눠 쓰기로!
