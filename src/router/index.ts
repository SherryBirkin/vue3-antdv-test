import { createRouter, createWebHistory } from 'vue-router';
import JumpView from '@/components/JumpView.vue';
import type { RouteRecord } from 'vue-router';

export const routes: RouteRecord[] = [
  {
    path: '/',
    redirect: { name: 'workBench' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Main/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: JumpView,
        meta: {
          title: '首页',
        },
        children: [
          {
            path: 'work-bench',
            name: 'workBench',
            component: () => import('@/views/Home/WorkBench.vue'),
            meta: {
              title: '工作台',
            },
          },
          {
            path: 'overview',
            name: 'overview',
            component: () => import('@/views/Home/Overview.vue'),
            meta: {
              title: '概览',
            },
          },
        ],
      },
      {
        path: '/test',
        name: 'test',
        component: JumpView,
        meta: {
          title: '测试',
        },
        children: [
          {
            path: 'auto-test',
            name: 'autoTest',
            component: () => import('@/views/Test/AutoTest.vue'),
            meta: {
              title: '自动化测试',
            },
          },
          {
            path: 'reactive',
            name: 'reactive',
            component: () => import('@/views/Test/Reactive.vue'),
            meta: {
              title: '响应式',
            },
          },
        ],
      },
      {
        path: '/charts',
        name: 'charts',
        component: JumpView,
        meta: {
          title: '图表',
        },
        children: [
          {
            path: 'line-chart',
            name: 'lineChart',
            component: () => import('@/views/Charts/LineChart.vue'),
            meta: {
              title: '折线图',
            },
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
