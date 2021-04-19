<template>
	<div style="padding: 20px;">
		<el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="新增图书类别" name="first">
	    	<el-form ref="bookClass" :model="bookClass" label-width="80px">
				  <el-form-item label="类别名称">
				    <el-input v-model="bookClass.cName"></el-input>
				  </el-form-item>
				  <el-form-item label="简介">
				    <el-input v-model="bookClass.intr"></el-input>
				  </el-form-item>
				</el-form>
				<div style="text-align: right;">
					<el-button>取消</el-button>
					<el-button type="primary" @click="addBookType">确定</el-button>
				</div>
	    </el-tab-pane>
	    <el-tab-pane label="新增图书" name="second">
	    	<el-form ref="book" :model="book" label-width="80px">
	    		<el-form-item label="图书类别">
				    <el-select v-model="book.cId" placeholder="请选择图书类别">
				      <el-option v-for="item in bookTypes" :label="item.cName" :value="item.cId" :key="item.cId"></el-option>
				   
				    </el-select>
				  </el-form-item>
				  <el-form-item label="图书名称">
				    <el-input v-model="book.bookName"></el-input>
				  </el-form-item>
				  <el-form-item label="图书作者">
				    <el-input v-model="book.author"></el-input>
				  </el-form-item>
				  <el-form-item label="出版社">
				    <el-input v-model="book.publish"></el-input>
				  </el-form-item>
				  <el-form-item label="价格">
				    <el-input v-model="book.price"></el-input>
				  </el-form-item>
				  <el-form-item label="简介">
				    <el-input v-model="book.introduction"></el-input>
				  </el-form-item>
				  <el-form-item label="封面">
				    <el-upload
						  class="upload-demo"
						  action="/api/upload"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  multiple
						  :limit="1"
						  :on-exceed="handleExceed"
						  :on-success="handleSuccess"
						  :file-list="fileList">
						  <el-button size="small" type="primary">点击上传</el-button>
						  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
				  </el-form-item>
				</el-form>
				<div style="text-align: right;"><el-button>取消</el-button><el-button type="primary" @click="addBook">确定</el-button></div>

	    </el-tab-pane>
	   
	  </el-tabs>
		
	</div>
</template>

<script>
	import {addBookType, getBookTypes, addBook} from "../model/client-model.js";
	export default {
		name: "manager",
		data () {
			return {
				activeName: "first",
				fileList: [],
				bookClass: {
					cName: "",
					intr: ""
				},
				book: {
					bookName: "",
					author: "",
					publish: "",
					price: "",
					introduction: "",
					img: ""
				},
				bookTypes: []
			}
		},
		mounted() {
			
		},
		methods: {
			handleClick(tab, event){
				if(tab.name === "second") {
					this.getBookTypes();
				}
			},
			handlePreview() {},
			handleRemove() {},
			beforeRemove() {},
			handleExceed() {},
			handleSuccess(response, file, fileList) {
				console.log(response);
				this.book.img = response.fileName;
			},
			async addBookType() {
					const res = await addBookType(this.bookClass);
					this.$message({
	         message: '添加图书类别成功',
	         type: 'success'
	       });
	       this.$refs["bookClass"].resetFields();
			},
			async getBookTypes() {
				const res = await getBookTypes();
				this.bookTypes = res;
			},
			async addBook() {
				const res = await addBook(this.book);
				this.$message({
	         message: '添加图书成功',
	         type: 'success'
	       });
	       this.$refs.book.resetFields();
			}

		}
	}
</script>

<style>
	
</style>