

new Vue({
	el:'#app',
	data:{
		totalMoney:0,
		products:[],
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		isEmpty:true,
		currProduct:''
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		})
	},
	filters:{
		formatMoney:function(value){
			return "￥" + value+".00";
		}
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get("data/cartData.json").then(function(res){
				_this.products = res.body.result.list;
			})
		},
		addCart:function(product){
			var _this = this;
			var addFlag = true;
			if(this.productList.length == 0){
				addFlag = true
			}else{
				this.productList.forEach(function(item,index){
					if(item.productId == product.productId){
						addFlag = false;
					}
				})
			}
			if(addFlag){
				this.productList.push(product);
			}else{
				this.changeMoney(product,1)
			}
			this.checkAll();
			this.Empty();
		},
		changeMoney:function(product,way){
			if(way == 1){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1
				}
			}
			this.calcMoney();
		},
		selectProduct:function(item){
			if(typeof item.check== 'undefined'){
				this.$set(item,"check",true);
			}else{
				item.check = !item.check;
			}
			this.calcMoney();
			this.checkAll();
		},
		selectAll:function(){
			this.checkAllFlag = !this.checkAllFlag;
			var _this = this;
			this.productList.forEach(function(item,index){
				if(typeof item.check == 'undefined'){
					_this.$set(item,"check",_this.checkAllFlag);
				}else{
					item.check = _this.checkAllFlag;
				}
			});
			this.calcMoney();
		},
		checkAll:function(){
			var _this = this;
			var count = 0;
			this.productList.forEach(function(item,index){
				if(item.check){
					count++;
				}
			})
			if(count==this.productList.length){
				this.checkAllFlag = true;
			}else{
				this.checkAllFlag = false;
			}
		},
		calcMoney:function(item){
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item,index){
				if(item.check){
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			})
		},
		delComfirm:function(item){
			this.delFlag = true;
			this.currProduct = item;
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.currProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
			this.Empty();
		},
		Empty:function(){
			if(this.productList.length == 0){
				this.isEmpty = true;
			}else{
				this.isEmpty = false;
			}
		}
	}
})