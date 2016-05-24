/**
 * Created by Administrator on 2016/5/18.
 */
var app=angular.module("shoppingList",[]);
app.controller("shopCtrl",function ($scope){
    $scope.producs = [{text:'Milk',done:false},{text:'Beef',done:false}];
    $scope.totalNum=function(){
        return $scope.producs.length;
    };
    $scope.addProd =function(){

        var prod = {done:false};
        if(!$scope.addNew){
            return;
        }
        for(var i=0;i<$scope.producs.length;i++ ){

            if($scope.producs[i].text==$scope.addNew){
                $scope.errorText = "This item is already in your shop list";
                return;
            }
        }
        $scope.errorText="";
        prod.text=$scope.addNew;
        $scope.producs.push(prod);
        $scope.addNew ="";
    };
    $scope.removeItem = function(x){
        $scope.errorText="";
        $scope.producs.splice(x,1);
    };

});
