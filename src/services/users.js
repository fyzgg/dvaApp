import request from '../utils/request';

export async function fetch({page=1}) {
	return request(`/api/users?page=${page}`);
}

export function remove({userId}){
  return request(`/api/users/delete?userId=${userId}`)
}
