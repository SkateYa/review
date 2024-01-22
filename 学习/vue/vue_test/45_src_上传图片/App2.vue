<template>
	<div id="app">
	<div>33</div>
	<!-- :class="{ disabled: uploadDisabled }" -->
		<el-upload action="aaa"
			list-type="picture-card"
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
		</el-dialog>

	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			dialogVisibleimg: false,
			dialogImageUrl: "",
			formdata: new FormData(),
			fileList: [],
			addimg: [],
			removeimg: [],
			ruleForm: {
				csAvatar: "",
			}
		}
	},
	methods: {
		// 添加活动展示照片
		handleChange(file, fileList) {
			const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
			const isLt5M = file.size / 1024 / 1024 < 5;
			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 、png 格式!");
				fileList.splice(-1, 1);//移除错误文件
				return false;
			}
			if (!isLt5M) {
				this.$message.error("上传头像图片大小不能超过 5MB!");
				fileList.splice(-1, 1);
				return false;
			}
			this.fileList = fileList
			console.log('filelist',fileList)
			this.addimg = fileList[0].raw;
			this.ruleForm.csAvatar = this.addimg;
		},
		// 删除活动展示照片
		handleRemove(file, fileList) {
			console.log(fileList)
			this.ruleForm.csAvatar = '';
			this.fileList = []
			this.formdata = new FormData();
		},
		// 活动展示照片预览
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisibleimg = true;
		},
	},
	// computed: {
	// 	uploadDisabled: function () {
	// 		console.log(this.ruleForm.csAvatar)
	// 		// return this.ruleForm.csAvatar != '';
	// 		return this.fileList != '';
	// 	},
	// },
}
</script>
<style>
/* .disabled .el-upload--picture-card {
	display: none;
} */
</style>
