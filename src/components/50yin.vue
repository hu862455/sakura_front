<template>
  <el-tabs type="border-card" style="min-height: 800px">
    <el-tab-pane label="总览">
      <el-row>
        <el-col :span="22" :push='1'>
          <el-button @click="clearFilter">清除所有过滤器</el-button>
          <el-table ref="filterTable" :data="tableData" style="width: 50%" size='medium'>
            <el-table-column prop="roma" label="罗马音">
            </el-table-column>
            <el-table-column prop="ping" label="平假名">
            </el-table-column>
            <el-table-column prop="pian" label="片假名">
            </el-table-column>
            <el-table-column prop="colName" label="段" column-key="colName" :filters="colNameFilters" width='60'
                             :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="rowName" label="行" column-key="rowName" :filters="rowNameFilters" width='60'
                             :filter-method="filterHandler">
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="随机测试">
      <el-radio-group v-model="typeName" @change="typeNameChange">
        <el-radio-button label="罗马音"></el-radio-button>
        <el-radio-button label="平假名"></el-radio-button>
        <el-radio-button label="片假名"></el-radio-button>
      </el-radio-group>
      <el-divider></el-divider>
      <el-row>
        <!--    难度滑块      -->
        <el-col :span="2">
          <div class="block">
            <div style="margin-bottom: 10px">难度:</div>
            <el-slider
              v-model="difficult"
              vertical
              :min=1
              :max=10
              @change="sliderChange"
              height="300px">
            </el-slider>
          </div>
        </el-col>
        <!--    卡片    -->
        <el-col :span="20">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 50px" v-if="typeFlag == '0'">{{cardInfo.romas}}</span>
              <span style="font-size: 50px" v-else-if="typeFlag == '1'">{{cardInfo.pings}}</span>
              <span style="font-size: 50px" v-else-if="typeFlag == '2'">{{cardInfo.pians}}</span>
            </div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="罗马音" name="1">
                <div>{{cardInfo.romas}}</div>
              </el-collapse-item>
              <el-collapse-item title="平假名" name="2">
                <div>{{cardInfo.pings}}</div>
              </el-collapse-item>
              <el-collapse-item title="片假名" name="3">
                <div>{{cardInfo.pians}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="注意内容">
      <!-- <router-view name='C'></router-view> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
        props: {
            name
        },
        data() {
            return {
                activeName: '', // 手风琴标志
                difficult: 1, //难度
                typeName: '罗马音', // 随机测试类型
                typeFlag: 0,
                colNameFilters: [{
                    text: 'あ',
                    value: 'あ'
                },
                    {
                        text: 'い',
                        value: 'い'
                    },
                    {
                        text: 'う',
                        value: 'う'
                    },
                    {
                        text: 'え',
                        value: 'え'
                    },
                    {
                        text: 'お',
                        value: 'お'
                    }
                ],
                rowNameFilters: [{
                    text: 'あ',
                    value: 'あ'
                },
                    {
                        text: 'か',
                        value: 'か'
                    },
                    {
                        text: 'さ',
                        value: 'さ'
                    },
                    {
                        text: 'た',
                        value: 'た'
                    },
                    {
                        text: 'な',
                        value: 'な'
                    },
                    {
                        text: 'は',
                        value: 'は'
                    },
                    {
                        text: 'ま',
                        value: 'ま'
                    },
                    {
                        text: 'や',
                        value: 'や'
                    },
                    {
                        text: 'ら',
                        value: 'ら'
                    },
                    {
                        text: 'わ',
                        value: 'わ'
                    }
                ],
                titleName: '',
                isCollapse: true,
                type: '',
                tableData: [],
                cardInfo:''
            };
        },
        methods: {
            /**
             * 滑块变更时间
             * @param val
             */
            sliderChange(val) {
                this.difficult = val;
                this.testInit();
                console.log(val);
            },
            typeNameChange(val){
                switch(val) {
                    case '罗马音':
                        this.typeFlag = 0;
                        break;
                    case '平假名':
                        this.typeFlag = 1;
                        break;
                    case '片假名':
                        this.typeFlag = 2;
                        break;
                    default:

                }
            },
            testInit(){
                this.cardInfo = '';
                this.$api.get("/baseWord/randomBaseWordsByType", {
                    length: this.difficult,
                    type: this.type
                }, response => {
                    console.log(response);
                    if (response.data.code === 200) {
                        let array = response.data.list;
                        let romas = '';
                        let pings = '';
                        let pians = '';
                        array.forEach(item =>{
                            romas += item.roma;
                            pings += item.ping;
                            pians += item.pian;
                        });
                        this.cardInfo = {
                            romas: romas,
                            pings: pings,
                            pians: pians
                        };
                        console.log(this.cardInfo);
                    }
                })
            },
            initPage() {
                if (this.name === 'qingyin') {
                    this.type = 0;
                } else if (this.name === 'zhuoyin') {
                    this.type = 1;
                } else if (this.name === 'banzhuoyin') {
                    this.type = 2;
                } else {
                    this.type = 3;
                }

                this.$api.get("/baseWord/getAllByType", {
                    type: this.type
                }, response => {
                    if (response.data.code === 200) {
                        this.tableData = response.data.list;
                    }
                })
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        mounted() {
            this.initPage();
            this.testInit();
        }
    }

</script>

<style>
  .el-slider__runway {
    left: 30px;
  }
</style>
