今天用git提交代码到github的时候遇到了一个问题


解决Failed to connect to github.com port 443: Timed out

这个错误大致是说连接到github的时候超时了。那么该怎么解决呢？很简单，这个超时了无非就是你的代理出了点问题，不过好在git上用几个命令就能够很快搞定。

git config --global --unset http.proxy
 
git config --global --unset https.proxy
然后再push，就很nice! 


git的用户名和密码

一、查看
查看用户名 ：git config user.name
查看密码： git config user.password 
查看邮箱：git config user.email
查看配置信息： $ git config --list

二、修改
修改用户名
git config --global user.name “xxxx(新的用户名)”

修改密码
git config --global user.password “xxxx(新的密码)”

修改邮箱
git config --global user.email “xxxx@xxx.com(新的邮箱)”

