// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** addClockInInfo POST /api/clockInInfo/add */
export async function addClockInInfoUsingPOST(
  body: API.ClockInInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/clockInInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteClockInInfo POST /api/clockInInfo/delete */
export async function deleteClockInInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/clockInInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getClockInInfoById GET /api/clockInInfo/get */
export async function getClockInInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClockInInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseClockInInfoVo>('/api/clockInInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listClockInInfo GET /api/clockInInfo/list */
export async function listClockInInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listClockInInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListClockInInfo>('/api/clockInInfo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listClockInInfoByPage GET /api/clockInInfo/list/page */
export async function listClockInInfoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listClockInInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageClockInInfo>('/api/clockInInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getClockInInfoByLoginUserId GET /api/clockInInfo/login/get */
export async function getClockInInfoByLoginUserIdUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseClockInInfoVo>('/api/clockInInfo/login/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateClockInInfo POST /api/clockInInfo/update */
export async function updateClockInInfoUsingPOST(
  body: API.ClockInInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/clockInInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
