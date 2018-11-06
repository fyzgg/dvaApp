import request from '../utils/request';

export async function fetch({page=1}) {
	return request(`/api/users?page=${page}`);
}

export function remove({userId}){
  return request(`/api/users/delete?userId=${userId}`)
}

export function create({ values }){
  return request(`/api/users/create`,{
    methods:'get',
    body:JSON.stringify(values),
  })
}

export function modify({ values, id }){
  var data = Object.assign(values,{id});
  return request(`/api/users/modify`,{
    methods:'get',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
}