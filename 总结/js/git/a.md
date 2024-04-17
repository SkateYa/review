
$ git clone [url]  下载一个项目和它的整个代码历史
git branch dev # → 创建dev分支
git checkout dev # → 切换分支到branchname
$ git checkout -b develop   # → 创建并切换到develop分支,等同于执行上两步
$ git push   # → 推送当前分支（develop）到远端仓库
$ git st(status)   # → 查看当前分支工作区、暂存区的工作状态
$ git diff   # → diff文件的修改（⚠️很重要很重要很重要） 
$ git commit .   # → 提交本次修改
$ git fetch --all   # → 拉取所有远端的最新代码 
$ git merge  dev 把dev分支上的内容合并到本分支上
$ git version   # → git版本
$ git branch   # → 查看本地所有的分支
$ git branch -r # → 查看所有远程的分支
$ git branch -a # → 查看所有远程分支和本地分支
$ git branch -d dev 在其他分支删除dev分支
$ git push origin -d <branchname>   # → 删除远程branchname分支
$ git log xx  # → 查看xx文件的commit记录
$ git reset --hard HEAD^  # → 回滚到上一个版本，同时清空工作目录的所有改动

$ git reset --hard [commit] 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git log -5 --pretty --oneline 显示过去5次提交
$ git reflog  记录你的每一次命令
$ git rm a.html 删除工作区 a.html 文件，并且将这次删除放入暂存区

$ git remote -v 显示所有远程仓库

git push --set-upstream origin dev 本地新建分支并提交到远端（远端没有这个分支）
git push -u origin dev  本地新建分支并提交到远端（远端没有这个分支）

$ git config [–global] user.name “[name]” 设置提交代码时的用户名
$ git config [–global] user.email “[email address]” 设置提交代码时的邮箱地址


git cherry-pick efa8a2cd5d3e092864f    选择一个commit，合并进当前分支  （只拉这个分支上的代码）
$ git tag  # → 列出所有tag
$ git tag -a v1.0.32 -m '修改bug'
$ git tag -d <tagname>(version 1.0)  # → 删除指定<code>tag</code>
git pull origin feature/1000970  把feature/1000970与当前分支合并


mac 命令
sudo rm -rf node_modules     强制删除依赖包
pwd    查看文件目录
chown -R mac node_modules        给用户权限
sudo chown -R mac node_modules         通过将所有者更改为自己来修复

sudo -u mac npm i    给指定用户安装依赖
git push origin master --force    强制上传
sudo chown -R mac node_modules      把权限改为mac
ls -al























git remote add origin [远程github的地址]      将远程的地址和本地联系起来，直接git pull 就行 