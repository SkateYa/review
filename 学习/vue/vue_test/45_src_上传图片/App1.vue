<template>
	<div id="app">
		<el-upload 
			action="#" 
			:class="{ disabled: uploadDisabled }"
			list-type="picture-card"
			:auto-upload="false" 
			:limit="1"
			:multiple="false">
			<i slot="default" class="el-icon-plus"></i>
			<div slot="file" slot-scope="{file}">
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
						<i class="el-icon-zoom-in"></i>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
						<i class="el-icon-download"></i>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
						<i class="el-icon-delete"></i>
					</span>
				</span>
			</div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>

		<!-- <el-upload action="aaa"
		 list-type="picture-card"
		  :class="{ disabled: uploadDisabled }"
		  :auto-upload="false"
		   :limit="1" 
			ref="upload"
			 :on-change="handleChange" 
			 :on-preview="handlePictureCardPreview"
			:on-remove="handleRemove" 
			:file-list="fileList">
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisibleimg" append-to-body>
			<img width="100%" :src="dialogImageUrl" alt="" />
		</el-dialog> -->

	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
	  return {
	    dialogImageUrl: '',
	    dialogVisible: false,
	    disabled: false
	  };
	},
	computed: {
		uploadDisabled: function () {
			console.log(this.fileList)
			return this.fileList?.length>0?true:false;
		},
	},
	methods: {
	  handleRemove(file) {
	    console.log(file);
	  },
	  handlePictureCardPreview(file) {
	    this.dialogImageUrl = file.url;
	    this.dialogVisible = true;
	  },
	  handleDownload(file) {
	    console.log(file);
	  }
	}


	// data() {
	// 	return {
	// 		dialogVisibleimg: false,
	// 		dialogImageUrl: "",
	// 		formdata: new FormData(),
	// 		fileList: [],
	// 		addimg: [],
	// 		removeimg: [],
	// 		ruleForm: {
	// 			csAvatar: "",
	// 		}
	// 	}
	// },
	// methods: {
	// 	// 添加活动展示照片
	// 	handleChange(file, fileList) {
	// 		const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
	// 		const isLt5M = file.size / 1024 / 1024 < 5;
	// 		if (!isJPG) {
	// 			this.$message.error("上传头像图片只能是 JPG 、png 格式!");
	// 			fileList.splice(-1, 1);//移除错误文件
	// 			return false;
	// 		}
	// 		if (!isLt5M) {
	// 			this.$message.error("上传头像图片大小不能超过 5MB!");
	// 			fileList.splice(-1, 1);
	// 			return false;
	// 		}
	// 		this.addimg = fileList[0].raw;
	// 		this.ruleForm.csAvatar = this.addimg;
	// 	},
	// 	// 删除活动展示照片
	// 	handleRemove(file, fileList) {
	// 		console.log(fileList)
	// 		this.ruleForm.csAvatar = '';
	// 		this.formdata = new FormData();
	// 	},
	// 	// 活动展示照片预览
	// 	handlePictureCardPreview(file) {
	// 		this.dialogImageUrl = file.url;
	// 		this.dialogVisibleimg = true;
	// 	},
	// 	// 渲染编辑获取id
	// 	apply() {
	// 		this.fileList = [{ url: "" }];//这里是踩坑的点，必须写
	// 		this.fileList[0].url = res.data.csAvatar;//这里是调用接口获取到的值 res.data.csAvatar，赋值就可以回显了
	// 		//this.fileList[0].url 做的是单张图片回显，多张图片回显可以去掉[0]
	// 	},
	// 	// 提交上传按钮
	// 	submitForm(formName) {
	// 		this.$refs[formName].validate((valid) => {
	// 			if (valid) {
	// 				this.formdata = new FormData();
	// 				if (this.ruleForm.csAvatar) {//新增
	// 					this.formdata.append("picture", this.ruleForm.csAvatar);//上传图片要把参数和值放在FormData里
	// 					//如果有其他参数，也要一并放在this.formdata里
	// 					/* 例：
	// 					 this.formdata.append("csLevel", this.ruleForm.serviceLevel);
	// 						 this.formdata.append("csMaximum", this.ruleForm.size);
	// 						 */
	// 				}
	// 				//上传图片的接口（重要看传参部分怎么传参）
	// 				CustomerServiceController.add(this, this.formdata)//传参直接传this.formdata即可
	// 					.then((res) => {
	// 						if (res.success == true) {
	// 							this.$message.success("新建成功");
	// 						} else {
	// 							this.$message.error("新建失败");
	// 						}
	// 					})
	// 					.catch((e) => { });
	// 			} else {
	// 				console.log("error submit!!");
	// 				return false;
	// 			}
	// 		});
	// 	},
	// },
	// computed: {
	// 	uploadDisabled: function () {
	// 		console.log(this.ruleForm.csAvatar)
	// 		return this.ruleForm.csAvatar != '';
	// 	},
	// },
}
</script>
<style>
.disabled .el-upload--picture-card {
	display: none;
}
</style>
