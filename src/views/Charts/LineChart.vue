<script lang="ts" setup name="LineChart">
import * as echarts from 'echarts';

import { onMounted, onUnmounted, ref, unref, computed, watch } from 'vue';

let myChart = ref(null);
let dayCount = ref(0);
let valList = ref([]);

const xAxisNameList = computed(
  () => Array(dayCount.value)
    .fill('')
    .map((item, ind) => `${ind + 1}号`)
);
const chartOptions = computed(() => ({
    tooltip: {
      trigger: 'item',
      // formatter: (params) => {
      //   const { dataIndex, data } = { ...params };

      //   return `${dataIndex}: ${data}`;
      // },
    },
    grid: {
      containLabel: true,
      top: '8px',
      right: 0,
      bottom: 0,
      left: 0,
    },
    xAxis: {
      type: 'category',
      data: xAxisNameList.value,
      axisLabel: {
        interval: 0,
        rotate: 0,
        fontSize: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          // color: this.axisColor,
          width: 1,
        }
      },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      min: 0,
      max: null,
      axisLine: {
        show: true,
        lineStyle: {
          // color: this.axisColor,
          width: 1,
        }
      },
      splitLine: {
        show: true,
        //   lineStyle: {
        //     color: this.splitLineColor,
        //   }
      },
      splitNumber: 5,
    },
    series: [
      {
        data: valList.value,
        type: 'line',
        smooth: true,

        // 显示数值
        itemStyle: {
          normal: {
            label: {
              show: true,
             //   color: this.valColor,
            },
          },
        },
      // areaStyle,
      },
    ],
    //   color: this.lineColorList,
}));

watch(chartOptions, () => {
  if (unref(myChart)) {
    myChart.setOption(chartOptions.value);
  }
}, { deep: true });

const getTargetDayCount = (targetMonth) => {
  const date = new Date();

  date.setMonth(targetMonth + 1);
  date.setDate(0);
  dayCount.value = date.getDate();
};
const getValList = () => {
  valList.value = Array(dayCount.value).fill('').map(
    () => Math.floor(100 - Math.random() * 70)
  );
};
const initChart = () => {
  const targetElem = document.querySelector('.chart-container');

  myChart = echarts.init(targetElem);
  myChart.setOption(chartOptions.value);
};

onMounted(() => {
  getTargetDayCount(new Date().getMonth());
  getValList();
  initChart();
});
onUnmounted(() => {
  if (myChart?.dispose) {
    myChart.dispose();
  }
});
</script>

<template>
  <div class="line-chart">
    <div class="chart-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  height: 300px;
  margin: 0 10px;
  padding: 20px 0;
}
</style>
