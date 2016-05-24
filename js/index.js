/**
 * Created by Administrator on 2016/5/20.
 */
/**
 * Created by Administrator on 2016/5/20.
 */
/**
 * Created by Administrator on 2016/5/18.
 */
var app=angular.module("introduce",[]);
app.controller("intCtrl",function ($scope,$http){
    //$scope.ADitems = ["第一条","第二条","fowjfosjof","djfosjfojso","jfsdjfosj"];
    //$scope.TCitems = ["第一条","第二条","fowjfosjof","djfosjfojso","jfsdjfosj"];
    //$scope.myInfos = ["第一条","第二条","fowjfosjof","djfosjfojso","jfsdjfosj"];
    //$scope.Doitems = ["第一条","第二条","fowjfosjof","djfosjfojso","jfsdjfosj"];

    $http.post("infor.html").then(function Rsuccess(response){
        for( i in response.data.info){
            $scope.ADitems = response.data.info["ADitems"];
            $scope.TCitems = response.data.info["TCitems"];
            $scope.myInfos = response.data.info["myInfos"];
            $scope.Doitems = response.data.info["Doitems"];
            $scope.projInfos1 = response.data.info["projInfos1"];
            $scope.projInfos2 = response.data.info["projInfos2"];
            $scope.projInfos3 = response.data.info["projInfos3"];
        }
    },function Rerror(response){
        console.log("http request error!");
    });
});


$(function(){

});
