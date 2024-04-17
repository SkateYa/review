CSS 实现自动换行、强制换行、强制不换行的属性

实现效果

1.自动换行：
```
word-wrap:break-word;
word-break:normal; 
```
2.强制换行：

word-break:break-all;       //按字符截断换行 /* 支持IE和chrome，FF不支持*/
word-wrap:break-word;    //按英文单词整体截断换行  /* 以上三个浏览器均支持 */
* 注意：单词换行需要父盒子为块级元素  

3.强制不换行：

white-space:nowrap;
4.元素超出自动换行：

 display: flex;
 flex-wrap: wrap;
换行属性语法

1.word-break : normal | break-all | keep-all

normal 使用浏览器默认的换行规则，允许字内换行。
break-all 允许在单词内换行。
keep-all 只能在半角空格或连字符处换行。 

2.word-wrap : normal | break-word

normal : 允许内容顶开指定的容器边界，允许字内换行。
break-word : 内容将在边界内换行，允许单词换行。

3.white-space:normal | pre-wrap
————————————————
版权声明：本文为CSDN博主「伦苏ᝰ」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_54646196/article/details/127753818