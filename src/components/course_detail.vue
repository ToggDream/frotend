<template>
    <div class="course_detail">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div>
            <div class="course-detail-top" :style="top_style">
                <div class="content">
                    <!--面包屑-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/course' }">课程中心</el-breadcrumb-item>
                        <el-breadcrumb-item>{{course.course_name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="title">
                        <div class="course-name">
                            {{course.course_name}}
                        </div>
                        <div class="title-b">
                            <div class="start">
                                <el-button v-if="course.learn_status === 1" class="start-btn" type="danger" @click="startStudy()">开始学习</el-button>
                                <el-button v-if="course.learn_status === 2" class="start-btn" type="success" disabled>学习中</el-button>
                                <el-button v-if="course.learn_status === 3" class="start-btn" type="info" disabled>已学习完成</el-button>
                            </div>
                            <div class="course-info">
                                <div>
                                    <span>学习人数</span>
                                    <span>{{course.course_learn_people}}</span>
                                </div>
                                <div>
                                    <span>难度级别</span>
                                    <span v-if="course.course_difficult===1">初级</span>
                                    <span v-if="course.course_difficult===2">中级</span>
                                    <span v-if="course.course_difficult===3">高级</span>
                                </div>
                                <!--<div>
                                    <span>综合评分</span>
                                    <span>{{course.course_difficult}}</span>
                                </div>-->
                            </div>
                        </div>
                        <div class="introduction">
                            简介: {{course.course_introduction}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <chapter_comment_file @transferCourse="getCourseInfoFromChapter"></chapter_comment_file>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    import chapter_comment_file from '../components/templates/chapter_comment_file.vue'
    export default {
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                top_style:{
                    "background":"url("+require('../assets/images/gaosimohu.jpg')+") -30% -50%",
                    "background-size":"cover"
                },
                course: {
                    id: this.$route.params.course_id,
                },
            }
        },
        methods: {
            getCourseInfoFromChapter(data){
                this.course = data;
            },
            startStudy(){
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登陆后再开始学习！');
                    return false;
                }else{
                    this.$post('/course/setUserStartCourse',{ course_id:this.course.id,user_id:this.$state.user.user_id}).then((response) => {
                        this.$message.success(response.msg);
                        this.course.learn_status = 2;
                        //console.log('file_list',this.tab_items.file_list);
                    })
                }
            }
        },
        created(){
            console.log(77,this.course.id);
        },
        components:{chapter_comment_file},
    }
</script>
<style scoped type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
<style type="text/scss" lang="scss">
    .course_detail{
        //element-ui reset
        .content-tab{
            .is-top{
                border: none!important;
            }
            .el-tabs__nav-wrap{
                position: relative;
                left: -20px!important;
            }
            .el-tabs__nav{
                border: none!important;
                #tab-chapter{
                    font-weight: 600;
                    font-size: 18px;
                }
                #tab-comments{
                    @extend #tab-chapter
                }
                #tab-file{
                    @extend #tab-chapter
                }
            }
            .is-active{
                color: $selectColor!important;
            }
            .el-tabs__header{
                margin-left: 10px!important;
                border-bottom: solid 1px $light!important;
                //padding-bottom: 20px;
            }
        }
        .el-breadcrumb__inner{
            color: $white!important;
        }
    }
</style>
