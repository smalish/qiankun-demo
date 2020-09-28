/*
 * @Author: yangying01
 * @Date: 2020-09-28 13:48:11
 * @LastEditors: yangying01
 * @LastEditTime: 2020-09-28 13:49:16
 * @Description: 使用 rxjs 解决应用间通信的需求，因此处理十分简单
 * qiankun 官方也在日程上规划的有官方通信机制，但是鉴于一次又一次的时间推迟及维护人手短缺，这里本文作者使用rxjs来作为应用间通信的方案。

 */
import { Subject } from 'rxjs'; // 按需引入减少依赖包大小
const pager = new Subject();
export default pager;