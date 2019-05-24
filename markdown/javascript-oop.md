<!--
date: 2013-09-22
title: 基础篇-Javascript 面向对象
description: Javascript 面向对象是非常非常重要的内容，要掌握 Javascript 的面向对象编程，是一件不容易的事情，因为还要去学习很多关于设计模式的东西。目前还在钻研《Javascript 设计模式》，似乎任何一本与设计模式挂钩的书都不会容易呀！
-->

## 基础篇-Javascript 面向对象

> Javascript 面向对象是非常非常重要的内容，要掌握 Javascript 的面向对象编程，是一件不容易的事情，因为还要去学习很多关于设计模式的东西。目前还在钻研《Javascript 设计模式》，似乎任何一本与设计模式挂钩的书都不会容易呀！

#### 创建对象的原始模式

```javascript
var person = new Object();
person.name = 'Yzh';
person.age = 21;
```

或者像这样：

```javascript
var person = {
  name: 'Yzh',
  age: 21,
};
```

上面创建对象的方法存在很大的不足：**用一个接口创建很多实例，会产生大量的重复代码**。

#### 使用简单工厂模式

也就是在函数里面返回一个对象。

```javascript
function createPerson(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  return o;
}
var person1 = createPerson('Yzh', 21);
var person2 = createPerson('noone', 21);
```

上面的代码虽然解决了代码重复的问题，但是也还是存在很大的不足，那就是**实例与实例之间没有任何什么联系**。

#### 使用构造函数模式

理解构造函数：其实构造函数本身也是函数。任何函数只要通过`new`操作符来调用，其实就是构造函数。因为通过`new`操作符来产生实例的时候，函数内部的`this`对象指向的是实例本身。不通过`new`操作符调用，和普通函数没有什么两样，下面举个例子：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}

// 作为构造函数来使用
var person = new Person('Yzh', 21);
person.sayName();

// 作为普通函数使用
Person('Yzh', 21);
window.sayName();

// 在别的对象的作用域里面调用
var o = {};
Person.call(o, 'noone', 21);
o.sayName();
```

上面的三种情况就是调用构造函数最常见的三种方式：1、使用 new 操作符；2、当作普通的函数来使用；3、在别的对象里面作用域里面调用；

当使用第一种方式调用构造函数的时候，就可以解决上面说的**实例与实例之间的问题**。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
var person1 = new Person('Yzh', 21);
var person2 = new Person('noone', 21);
```

上面的两个实例`person1`和`person2`都会拥有`constructor`的属性，用来指向构造函数本身。`console.log( person2.constructor === person1.constructor );`

另外前文也提到过`instanceof`操作符。

```javascript
console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
console.log(person1 instanceof Object);
```

上面代码执行的结果都是返回：true；

但是使用构造函数模式也会有一些副作用：**消耗更多的内存**。

原因很简单，看回 Person 构造函数，他里面有很多属性和方法，实际上每一个实例里面的这些属性和方法都是私有的，他们相同名称的属性和方法公用的是不同的内存。

以上面的代码为例，person1 和 person2 有`sayName()`的方法，实际上 person1 和 person2 的`sayName()`方法是不一样的。

那有没有可以让每一个实例的一些属性和方法共用相同的内存呢？答案就是**原型对象**；

（今天先到这里吧，先回去了，怎么说今天也是中秋节，待会回去的路上买一个月饼尝尝，哈哈）

#### 原型模式

我们创建的每一个函数都会有一个 prototype（原型）属性，指向函数的原型对象。原型对象会包含所有实例公用的属性和方法。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function() {
  console.log(this.name);
};
Person.prototype.title = 'Love you';
var person1 = new Person('Yzh', 21),
  person2 = new Person('noone', 21);
console.log(person1.sayName === person2.sayName);
```

上面的例子中，person1 和 person2 的`sayName()`方法指向的是同样的内存。

**理解原型对象**：上面说了，每一个函数都会有 prototype（原型）属性，这个属性指向函数的原型对象。而该函数的原型对象上面又会有一个 constructor 属性指向该函数。

当调用构造函数创建一个新的实例的时候，该实例内部会包含一个内部属性，指向构造函数的原型对象；ES5 里面把这个属性叫做[[Prototype]]，在高级浏览器里面，这个属性是可以通过**proto**来访问的。

当访问实例某一个属性或者方法的时候，都会先搜索实例本身，看实例本身是否含有该属性或者方法，如果没有，则会去访问构造函数的原型对象，看看原型对象是否含有该属性或者方法。

如果实例重写了某个属性，那么只要在实例里面能访问到该属性，就不会去搜索原型对象里面是否含有该属性。如果使用`delete`操作符删除了重写的该属性，那么访问到的将是原型对象里面的该属性。

```js
person1.title = 'Love you forever';
console.log(person1.title); // 'Love you forever'
console.log(person2.title); // 'Love you'

delete person1.title;
console.log(person1.title); // 'Love you'
```

下面介绍几个方法

isPrototypeOf()：可以利用该函数确定实例与构造函数原型对象之间的关系；`console.log( Person.prototype.isPrototypeOf( person1 ) );`

hasOwnProperty()：判断实例里面是否含有自己独立的属性；

```js
person1.title = 'Love you forever';
console.log(person1.hasOwnProperty('title'));
```

in 操作符：判断某个对象是否含有某个属性，不管该属性是在实例上面，还是在原型对象上面。

```js
console.log('title' in person2);
console.log('title' in person1);
```

利用`in`操作符和`hasOwnProperty()`可以得到某一个属性是否是在原型对象上面。原理：当使用`hasOwnProperty()`返回 false，而使用 in 操作符返回 true 的时候，就可以得知该属性是在原型对象上面的。

```js
function hasPrototypeProperty(obj, name) {
  if (obj instanceof Object && typeof name === 'string') {
    return !obj.hasOwnProperty(name) && name in obj;
  }
  return false;
}
```

**原型模式的问题：**如果原型对象里面拥有引用类型的属性的话，那么只要一个实例修改了这个属性，那么所有创建的实例的该属性都会被改变，因为原型对象上面的属性是公有的。依然以上面的代码为例：

```js
Person.prototype.friends = ['guoyalong', 'zhoubihan'];
person1.friends.push('dinglei');
console.log(person2.friends);
```

上面代码的执行结果是："guoyalong", "zhoubihan", "dinglei"；

#### 使用构造函数模式和原型模式组合的模式

两种方法都有各自的局限和优点，那么将两种模式组合起来，就能解决各自的弊端，取长补短了。事实上，这种组合模式，是最常见的创建对象的方法。把私有的属性和方法在构造函数里面定义，而公有的属性和方法在原型对象上面定义。

#### 继承之类式继承

回顾一下**构造函数**、**原型对象**、**实例**之间的联系：每一个构造函数里面都会有一个指向原型对象的属性 prototype，而原型对象里面又会有一个指向构造涵涵素的 constructor 属性，每一个实例里面都会有一个指向原型对象的内部属性[[Prototype]]

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
function Author(name, age, book) {
  this.name = name;
  this.age = age;
  this.book = book;
}
```

**引入问题：**上面有两个构造函数，如果能让 Author 继承 Person 呢？

**方法一：**使用 call 或者 apply

```js
function Author(name, age, book) {
  Person.call(this, name, age);
  this.book = book;
}

var a = new Author('Yzh', 21, 'My Blog');
console.log(a.name);
```

上面会输出：Yzh

**方法二：**使用原型链

令子类的原型对象指向父类的一个实例；

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
function Author(name, age, book) {
  Person.call(this, name, age);
  this.book = book;
}
Author.prototype = new Person();
Author.prototype.constructor = Author;
var a = new Author('Yzh', 21, 'My Blog');
```

上面会输出：Yzh；

因为子类 Author 的原型对象是父类 Person 的一个实例，因此 Author 继承了 Person 对象的方法和属性。

但是有几点是需要注意的。

当我们令子类的原型指向父类的实例的时候，就相当于重写了子类的原型属性，所以此时父类原型对象的 constructor 指向哪里，子类原型对象的 constructor 属性就指向哪里（上面的代码中，我们并没有在原型对象里面设置 constructor，所以 constructor 默认地指向了 Object，ps：看来哥的基础真的还还很烂），因此需要我们手动地把子类的原型对象的 constructor 指向子类。

像上面的代码，如果没有`Author.prototype.constructor = Author;`，那么执行下面的代码就会出现 false 和 true 的结果。

```js
console.log(Author.prototype.constructor === Author);
console.log(Author.prototype.constructor === Object);
```

**直接继承父类原型**

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
function Author(name, age, book) {
  Person.call(this, name, age);
  this.book = book;
}
Author.prototype = Person.prototype;
Author.prototype.constructor = Author;
var a = new Author('Yzh', 21, 'My Blog');
```

与上面那种方法的比较，这种做法有明显的好处，这种方法并没有使用`new`操作符实例化一个实例，比较节省内存。但是这种做法也有很大的弊端，因为`Author.prototype = Person.prototype;`这里令子类和父类指向了同一个对象，因此，只要修改了子类原型对象，那么父类的原型对象也会被修改（实际上他们是同一个对象）。

在这里，我们可以利用一个**空函数作为中介**，避免上面的弊端。

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
Person.prototype = {
  constructor: Person,
  sayAge: function() {
    console.log(this.age);
  },
};
function Author(name, age, book) {
  Person.call(this, name, age);
  this.book = book;
}
var F = function() {};
F.prototype = Person.prototype;
Author.prototype = new F();
Author.prototype.constructor = Author;
console.log(Person.prototype.constructor === Person);
var a = new Author('Yzh', 21, 'My Blog');
a.sayName();
```

上面的代码中，由于 F 是空函数，所以几乎占用内存。（其实这里我也有一个地方不太明白，因为`sayName()`方法是父类的私有属性，为何子类继承父类之后，会有`sayName()`方法呢？啊，这个问题，当我看到了子类的构造函数的时候，顿时恍然大悟了，原来子类里面也利用`call()`继承了父类的私有属性）

下面通过一个`extend()`函数来对上面的代码进行封装

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
Person.prototype = {
  constructor: Person,
  sayAge: function() {
    console.log(this.age);
  },
};
function Author(name, age, book) {
  Person.call(this, name, age);
  this.book = book;
}
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
}
extend(Author, Person);
```

**通过拷贝的方法实现继承：**通过拷贝父类原型对象的每一个属性到子类的原型对象里面（其实这个方法有点搓）

```js
function prototypeCopy(subClass, superClass) {
  var subP = subClass.prototype,
    superP = superClass.prototype;

  for (var p in superP) {
    subP[p] = superP[p];
  }
}
```

#### 非类式继承

非类式继承和类式继承截然不同，当我们去讨论非类式继承的时候，应该只从对象的角度去思考。

**使用 clone()函数**

```js
var Person = {
  name: 'Yzh',
  sayName: function() {
    return this.name;
  },
};
function clone(obj) {
  var F = function() {};
  F.prototype = obj;
  return new F();
}
var render = clone(Person);
console.log(render.name);
```

**浅拷贝：**所谓浅拷贝就是指把对象的每一个属性都拷给子类。

```js
var person = {
  name: 'Yzh',
  sayName: function() {
    return this.name;
  },
  friends: ['noone'],
};
function extendCopy(o) {
  var sub = {};

  for (var p in o) {
    sub[p] = o[p];
  }
  return sub;
}
var t = extendCopy(person);
t.friends.push('cai');
console.log(person.friends);
```

但这种方式只是把基本数据类型的数据拷贝过去，而像数组或者对象这样的引用类型，仅仅是把指针拷贝过去，因此像上面那样，当修改了 t 的 friends 属性的时候，person 也对被修改。

所以像这样只是复制基本数据类型的方法我们称之为浅拷贝。

**深拷贝：**其实就是递归利用浅拷贝来把各种数据复制过来。也就是实现真正意义上的数组和对象的拷贝。

```js
function deepCopy(o, c) {
  var c = arguments.length === 2 ? c : {};

  for (var p in o) {
    if (o[p] instanceof Object) {
      c[p] = o[p] instanceof Array ? [] : {};
      deepCopy(o[p], c[p]);
    } else {
      c[p] = o[p];
    }
  }
  return c;
}
var t2 = deepCopy(person);
t2.friends.push('cai');
console.log(t2.friends);
console.log(person.friends);
```
