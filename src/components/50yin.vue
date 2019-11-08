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
      <!-- <router-view name='B'></router-view> -->
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
        tableData: []
      };
    },
    methods: {
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
        console.log(this.name);
        console.log(name);

        this.$api.get("/baseWord/getAllByType", {
          type: this.type
        }, response => {
          response.get
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
    }
  }

</script>

<style>

</style>
