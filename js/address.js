new Vue({
	el:"#app",
	data:{
		addressList:[],
		currIndex:0,
		shippingWay:1,
		editFlag:false,
		currAddress:{},
		newFlag:false,
		
	},
	mounted:function(){
		this.$nextTick(function(){
			this.addressView();
		})
	},
	methods:{
		addressView:function(){
			var _this = this;
			this.$http.get("data/address.json").then(function(res){
				if(res.body.status == 0){
					_this.addressList = res.body.result;
				}
			})
		},
		setDefault:function(address){
			this.addressList.forEach(function(item,index){
				item.isDefault = false;
			})
			address.isDefault = true
		},
		editAddress:function(address){
			this.editFlag = true;
			if(address){
				this.currIndex = this.addressList.indexOf(address);
				this.newFlag = false;
			}else{
				address = {
					"username":"",
					"streetName":"",
					"tel":"",
					"isDefault":false
				};
				this.newFlag = true;
			}
			this.currAddress = address;
		},
		saveAddress:function(){
			if(this.newFlag){
				this.addressList.push(this.currAddress)
			}else{
				this.addressList.splice(this.currIndex,1,this.currAddress);
			}
			this.editFlag = false;
		},
		delAddress:function(item){
			var index = this.addressList.indexOf(item);
			this.addressList.splice(this.currIndex,1);
		}
	}
})
