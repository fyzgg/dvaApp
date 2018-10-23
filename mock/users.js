'use strict'


const qs = require('qs');

const mockjs = require('mockjs');

module.exports = {
  'GET /api/users' (req,res){
    const page = qs.parse(req.query);

    const data = mockjs.mock({
      'data|100':[{
        'id|+1':1,
        name: '@cname',
        'age|11-99':1,
        address:'@region'
      }],
      page:{
        total:100,
        current:1
      },
      success:true
    });
    console.log('mock'+JSON.stringify(data))
    res.json({
      data:data
    });
  }
}