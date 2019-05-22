## AngularJS 的学习

#### 自动初始化

AngularJS 会在`DOMContentLoaded`事件触发时执行，并通过`ng-app`指令 寻找你的应用根作用域。如果`ng-app`指令找到了，那么 AngularJS 将会：

- 载入和 指令 内容相关的模块。
- 创建一个应用的“注入器(injector)”。
- 已拥有`ng-app`指令 的标签为根节点来编译其中的 DOM。这使得你可以只指定 DOM 中的一部分作为你的 AngularJS 应用。
