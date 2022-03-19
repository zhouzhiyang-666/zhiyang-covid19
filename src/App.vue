<template>
  <div :style="{ background: `url(${bg}) no-repeat` }" class="background-img"></div>
  <div class="box">
    <div style="color:white" class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.localConfirmH5 }}</span>
          </div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.nowConfirm }}</span>
          </div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.confirm }}</span>
          </div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>本土累计确诊</div>
        </section>
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.noInfect }}</span>
          </div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>本土无症状感染者</div>
        </section>
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.importedCase }}</span>
          </div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>本土境外输入</div>
        </section>
        <section>
          <div>较上日
            <span>+{{ store.chinaAdd.dead }}</span>
          </div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>本土累计死亡</div>
        </section>
      </div>

      <div class="box-left-pie"></div>

      <div class="box-left-line"></div>
    </div>

    <div id="china" class="box-center"></div>

    <div style="color:white" class="box-right">
      <transition
        leave-active-class="animate__animated animate__fadeOutDown"
        enter-active-class="animate__animated animate__fadeInDown"
        :duration="500"
      >
        <table v-if="flag" class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <!-- <transition-group 
          enter-active-class="animate__animated animate__bounceInUp" 
          tag="tbody"
        > -->
        <tbody>
          <tr v-for="(item, index) in store.item" :key="item.name + index">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </tbody>
        <!-- </transition-group> -->
      </table>
      </transition>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
// import bg from './assets/1.jpg'
// import bg from './assets/qzl.webp'
// import bg from './assets/hzw.webp'
import bg from './assets/bd.webp'
import { useStore } from './stores'
import * as echarts from 'echarts'
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'

let flag = ref(true)
let store = useStore()

const initChart = async () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.item = city[3].children

  const data = city.map(v => {
    // console.log(v.name,geoCoordMap[v.name].concat(v.total.nowConfirm))
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })

  const charts = echarts.init(document.querySelector('#china') as HTMLElement)
  // var data = [
  //   {
  //     name: "内蒙古",
  //     itemStyle: {
  //       areaColor: "#56b1da",
  //     },
  //     value: [110.3467, 41.4899]
  //   },
  // ];

  charts.setOption({
    // backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 8,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },

        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        symbol: 'pin',
        symbolSize: [45, 45],
        // symbolOffset:[0, '-40%'] ,
        label: {
          // normal: {
          show: true,
          color: '#fff',
          formatter(value: any) {
            return value.data.value[2]
          }
          // }
        },
        itemStyle: {
          // normal: {
          color: '#1e90FF', //标志颜色
          // }
        },
        data: data,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        // hoverAnimation: true,
        emphasis: {
          scale: true
        },
        zlevel: 1
      },
    ],

  })
  charts.on('click', (e: any) => {
    flag.value = false
    store.item = e.data.children
    setTimeout(()=>{
      flag.value = true
    },500)
  })
}

const initPie = () => {
  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          }
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })
}

const initLine = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip:{
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v=>v.city),
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },
    label:{
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(v=>v.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}

onMounted(async () => {
  await store.getList()
  initChart()
  initPie()
  initLine()
})

</script>

<style lang="less">
@itemBg: #0a436b;
@itemBorder: #072941;
@itemColor: #73baec;
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.box {
  height: 100%;
  display: flex;
  overflow: hidden;
  &-left {
    width: 400px;
    padding: 10px;
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto auto;
      box-shadow: 0 0 5px 2px @itemBg;
      section {
        background-color: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div:nth-child(2) {
          color: @itemColor;
          padding: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        span{
          color: red;
        }
      }
    }

    &-pie {
      height: 250px;
      margin-top: 20px;
      box-shadow: 0 0 5px 2px @itemBg;
    }

    &-line {
      height: 300px;
      margin-top: 20px;
      box-shadow: 0 0 5px 2px @itemBg;
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    padding: 10px;
    width: 400px;
  }
}

.table {
  width: 100%;
  background: @itemBg;
  box-shadow: 0 0 5px 2px @itemBg;
  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }
    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}
</style>