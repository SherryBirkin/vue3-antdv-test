<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, computed } from 'vue';

const myEcharts = echarts;
const dayCount = ref(0);
const xAxisNameList = computed(() => Array(dayCount).fill('').map((item, ind) => ind + 1));
const getTargetDayCount = (targetMonth) => {
  const date = new Date();

  date.setMonth(targetMonth + 1);
  date.setDate(0);
  dayCount.value = date.getDate();
};
const initChart = () => {
  const targetElem = document.querySelector('.chart-container');
  const chart = myEcharts.init(targetElem);

  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const { dataIndex, data } = { ...params };

        return `${dataIndex}: ${data}`;
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
        data: xAxisNameList,
        axisLabel: {
          interval: 0,
          rotate: 30,
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
          lineStyle: {
            color: this.splitLineColor,
          }
        },
        splitNumber: 5,
      },
      series: [
        {
          data: [],
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
    },
  });
};

onMounted(() => {
  getTargetDayCount(new Date().getMonth());
  initChart();
});
onUnmounted(() => {
    debugger;
  myEcharts.dispose();
});
</script>

<template>
  <div class="line-chart">
    <div class="chart-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.line-chart {
}
</style>
