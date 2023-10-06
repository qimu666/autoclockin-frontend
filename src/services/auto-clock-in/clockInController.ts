// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** isNotWrite POST /api/ClockIn/isNotWrite */
export async function isNotWriteUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/ClockIn/isNotWrite', {
    method: 'POST',
    ...(options || {}),
  });
}

/** startingClockIn POST /api/ClockIn/starting */
export async function startingClockInUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/ClockIn/starting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** stopClockIn POST /api/ClockIn/stop */
export async function stopClockInUsingPOST(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/ClockIn/stop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** toClockIn POST /api/ClockIn/toClockIn */
export async function toClockInUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/ClockIn/toClockIn', {
    method: 'POST',
    ...(options || {}),
  });
}
