去重
1.js数组的去重，排序，各有几种方式，分别是怎么实现的
  去重方法一   arr.splice
 var arr=[1,3,5,6,3,5,6,3,7,9,23,23]
				function a(arr){
					for(var i=0;i<arr.length-1;i++){
						for(var j=i+1;j<arr.length;j++){
							if(arr[i]==arr[j]){
								arr.splice(j,1);
								j--;
							}
						}
					}
					return arr;
				}
				var arr1 = a(arr)
				console.log(arr1)
2. 借助新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中（原数组长度不变但被按字符串顺序排序）
       var arr = [1,3,5,6,3,5,6,3,7,9,23,23]
			    
				function sun(arr){
					var b=[];
					var c;
					arr.sort();
					c=arr[0];
					b.push(arr[0]);
					for(var i=1;i<arr.length;i++){
						if(arr[i] !=c){
							b.push(arr[i])
							c=arr[i]
						}
					}
					return b
				}
				var arr1 = sun(arr)
				console.log(arr1)//[1, 23, 3, 5, 6, 7, 9]
3,创建一个新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中
				 var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
				        function norepeat(arr){
				            var temp =[];
				            for(var i=0;i<arr.length;i++){
				                if(temp.indexOf(arr[i]) == -1){
				                    temp.push(arr[i]);
				                }
				            }
				            return temp;
				        }
				    var arr2=norepeat(arr);
				    console.log(arr2);//[1, 23, 3, 5, 6, 7, 9, 8]
4,借助indexOf()方法判断此元素在该数组中首次出现的位置下标与循环的下标是否相等
				 var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5,5,5]; 
				   function norepeat(arr) {
				       for (var i = 0; i < arr.length; i++) {
				           if (arr.indexOf(arr[i]) != i) {
				               arr.splice(i,1);//删除数组元素后数组长度减1后面的元素前移
				               i--;//数组下标回退
				           }
				       }
				       return arr;
				   }
				   var arr2 = norepeat(arr);
				   console.log(arr2);                 //[1, 23, 3, 5, 6, 7, 9, 8]
5,利用数组中的filter方法
				 var arr = ["apple","banana","pear","apple","orange","orange"];
				   var arr2 =arr.filter(function(value,index,self){
				       return self.indexOf(value) ===index;
				   });
				   console.log(arr2);   //["apple", "banana", "pear", "orange"]
排序
1.sort 方法 （a-b正向    b-a 反向）
var arr=[3,1,5,8,28]
				//正向 a-b
				var arr1=arr.sort(function  (a,b) {