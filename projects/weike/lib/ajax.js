define(function(){
    /**
     * Created by bh on 2016/2/17.
     */
    function $Http(){}
    $Http.prototype.postAjax=function(map){
        var url = map.url;
        var pars = map.para;
        var async = map.async;
        var callback = map.success;
        pars = pars == undefined?'':pars;
        async=async == undefined?true:async;
        $.ajax({
            type : "post",
            url : url,
            data : pars,
            async: async,
            dataType : "json",
            success : function(data){
                if (callback != undefined){
                    callback(data);
                }
            }
        });
    };
    //获取当前用户信息；
    $Http.prototype.getCurrentUser=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //获取课程详情；
    $Http.prototype.getClassInfo=function(url,courseId,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+courseId,'success':callback,'async':async});
    };
    //获取老师信息；
    $Http.prototype.getTeacherInfo=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //录制课程列表；
    $Http.prototype.getClassList=function(url,numPerPage,pageNum,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'numPerPage='+numPerPage+'&pageNum='+pageNum,'success':callback,'async':async});
    };
    //老师描述编辑；
    $Http.prototype.desUpdate=function(url,userDes,jobTitle,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'userDes='+userDes+'&jobTitle='+jobTitle,'success':callback,'async':async});
    };
    //老师描述编辑；
    $Http.prototype.infoUpdate=function(url,nick,jobTitle,sex,userDes,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'nickName='+nick+'&jobTitle='+jobTitle+'&sex='+sex+'&userDes='+userDes,'success':callback,'async':async});
    };
    //添加章节；
    $Http.prototype.chapterAdd=function(url,courseId,chapterName,orders,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'courseId='+courseId+'&chapterName='+chapterName+'&orders='+orders,'success':callback,'async':async});
    };
    //添加小节；
    $Http.prototype.sectionAdd=function(url,courseId,chapterId,sectionName,orders,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'courseId='+courseId+'&chapterId='+chapterId+'&sectionName='+sectionName+'&orders='+orders,'success':callback,'async':async});
    };
    //添加课程；
    $Http.prototype.classAdd=function(url,courseName,courseAbout,courseDes,gradeId,subjectId,difficultId,posterUrl,plannedStartTime,plannedEndTime,coursePermission,allowedUserIds,secretKey,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'&courseName='+courseName+'&courseAbout='+courseAbout+'&courseDes='+courseDes+'&gradeId='+gradeId+'&subjectId='+subjectId+'&difficultId='+difficultId+'&posterUrl'+posterUrl+'&plannedStartTime='+plannedStartTime+'&plannedEndTime='+plannedEndTime+'&coursePermission='+coursePermission+'&allowedUserIds='+allowedUserIds+'&secretKey='+secretKey,'success':callback,'async':async});
    };
    //编辑课程；
    $Http.prototype.classEditor=function(url,courseId,courseName,courseAbout,courseDes,gradeId,subjectId,difficultId,posterUrl,plannedStartTime,plannedEndTime,coursePermission,allowedUserIds,secretKey,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+courseId+'&courseName='+courseName+'&courseAbout='+courseAbout+'&courseDes='+courseDes+'&gradeId='+gradeId+'&subjectId='+subjectId+'&difficultId='+difficultId+'&posterUrl='+posterUrl+'&plannedStartTime='+plannedStartTime+'&plannedEndTime='+plannedEndTime+'&coursePermission='+coursePermission+'&allowedUserIds='+allowedUserIds+'&secretKey='+secretKey,'success':callback,'async':async});
    };
    //删除章节；
    $Http.prototype.chapterDel=function(url,chapterId,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+chapterId,'success':callback,'async':async});
    };
    //删除小节；
    $Http.prototype.sectionDel=function(url,sectionId,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+sectionId,'success':callback,'async':async});
    };
    //删除课程；
    $Http.prototype.classDel=function(url,classId,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+classId,'success':callback,'async':async});
    };
    //编辑章节；
    $Http.prototype.chapterUpdate=function(url,courseId,chapterId,chapterName,order,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'courseId='+courseId+'&id='+chapterId+'&chapterName='+chapterName+'&order='+order,'success':callback,'async':async});
    };
    //编辑小节；
    $Http.prototype.sectionUpdate=function(url,courseId,chapterId,sectionId,sectionName,order,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'courseId='+courseId+'&chapterId='+chapterId+'&id='+sectionId+'&sectionName='+sectionName+'&order='+order,'success':callback,'async':async});
    };
    //获取课程年级列表；
    $Http.prototype.getGrades=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //获取课程科目列表；
    $Http.prototype.getSubjects=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //获取课程难度列表；
    $Http.prototype.getDifficults=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //修改密码：
    $Http.prototype.amendPwd=function(url,oldpwd,newpwd,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'oldPwd='+oldpwd+'&newPwd='+newpwd,'success':callback,'async':async});
    };
    //登录：
    $Http.prototype.userLogin=function(url,userVal,pwdVal,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'username='+userVal+'&password='+pwdVal,'success':callback,'async':async});
    };
    //所有用户：
    $Http.prototype.allStudentList=function(url,pageNum,numPerPage,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'pageNum='+pageNum+'&numPerPage='+numPerPage,'success':callback,'async':async});
    };
    //初始化已创建群组：
    $Http.prototype.groupList=function(url,callback,async){
        var url = url;
        this.postAjax({'url':url,'success':callback,'async':async});
    };
    //按群组添加指定用户：
    $Http.prototype.addPerson_group=function(url,courseId,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'courseId='+courseId,'success':callback,'async':async});
    };
    //确认群组创建:
    $Http.prototype.createGroup_sure=function(url,groupName,groupDes,userIds,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'groupName='+groupName+'&groupDes='+groupDes+'&userIds='+userIds,'success':callback,'async':async});
    };
    //群组信息获取:
    $Http.prototype.groupInfo=function(url,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+id,'success':callback,'async':async});
    };
    //群组信息编辑:
    $Http.prototype.groupUpdate=function(url,groupName,groupDes,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'groupName='+groupName+'&groupDes='+groupDes+'&id='+id,'success':callback,'async':async});
    };
    //群组成员获取
    $Http.prototype.groupUserInfo=function(url,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+id,'success':callback,'async':async});
    };
    //群组成员编辑
    $Http.prototype.groupUserUpdate=function(url,userIds,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'userIds='+userIds+'&id='+id,'success':callback,'async':async});
    };
    //对应课程的成员列表获取；
    $Http.prototype.allowedUserList=function(url,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+id,'success':callback,'async':async});
    };
    //删除已创建群组；
    $Http.prototype.groupDel=function(url,id,callback,async){
        var url = url;
        this.postAjax({'url':url,'para':'id='+id,'success':callback,'async':async});
    };
    var $http=new $Http();
    return $http;
});