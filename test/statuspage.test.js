const expect = require('expect');
const axios = require('axios');
// const sinon = require('sinon');
const uuid = require('uuid');
// var moment = require('moment');
var {StatusPage} = require('../index.js');
const metric_id = '07fbhggxqj6l';

describe('StatusPage', () => {
  it('Should exist', ()=>{
    expect(
      StatusPage
    ).toExist();

    // expect(
    //   Object.keys(StatusPage).length
    // ).toBeGreaterThan(0)
  });

  it('Should return POST path', () => {
    const pageId = 'MyTestPageId123'
    const s = new StatusPage(undefined, 'MyTestPageId123');
    expect(
      s.generateMetricPostPath('456')
    )
    .toEqual(`/v1/pages/${pageId}/metrics/456/data.json`)
  });
  //
  // it('Should generate the request string', () => {
  //   var s = new StatusPage();
  //   var res = s.generateRequestParameters('31337');
  //
  //   expect(/^data\[timestamp\]=[0-9]+&data\[value\]=31337$/.test(res))
  //   .toBe(true);
  // });
  //
  // it('Should successfully post for valid page_id and metric_id', () => {
  //   var s = new StatusPage();
  //   var instance = axios.create();
  //   var time = Date.now();
  //   var metric_id = uuid();
  //   var page_id = uuid();
  //   var stub = sinon.stub(instance, 'post', function(path, params){
  //       expect(path).toEqual(`/v1/pages/${page_id}/metrics/${metric_id}/data.json`);
  //       var re = new RegExp(`^data\\[timestamp\\]=[0-9]+&data\\[value\\]=${time}$`);
  //       expect(re.test(params)).toEqual(true);
  //   });
  //   s.instance = instance;
  //   s.page_id = page_id;
  //   s.updateMetric(metric_id, time);
  // });
  //
  // it('Should not post for invalid page_id and metric_id', (done) => {
  //   var s = new StatusPage();
  //   s.updateMetric('', 1339)
  //   .catch((e) => {
  //     expect(e).toNotBe(undefined);
  //     done();
  //   });
  // });
  //
  // it('Should generate API base path', () => {
  //   var s = new StatusPage();
  //   s.page_id = '123';
  //   expect(s.generatePagePath()).toEqual('/v1/pages/123')
  // });
  //
  // it('Shoud generate component status payload', () => {
  //   var s = new StatusPage();
  //   s.page_id = '123';
  //   expect(s.generateComponentStatusPayload('stopped'))
  //   .toEqual('component[status]=stopped');
  // });
  //
  // it('Should generate component path', () => {
  //   var s = new StatusPage();
  //   var res = s.generateComponentPath('asdf');
  //
  //   expect(/^\/v1\/pages\/[a-z0-9]+\/components\/asdf.json$/.test(res))
  //   .toBe(true);
  // });
  //
  // it('Should get components', (done) => {
  //   var s = new StatusPage();
  //   s.getComponents((data) => {
  //     expect(data).toNotBe(undefined);
  //     done();
  //   });
  // });
  //
  // it('Should fail to get components', () => {
  //   var instance = axios.create();
  //   sinon.stub(instance, 'get', function(){
  //     return new Promise(function(acc, rej){
  //       rej('1337-3rr0r');
  //     });
  //   });
  //
  //   var s = new StatusPage();
  //   s.instance = instance;
  //   var spy = expect.createSpy();
  //   s.getComponents(spy);
  //
  //   expect(spy).toNotHaveBeenCalled();
  // });
  //
  // it('Should create a component', () => {
  //   var instance = axios.create();
  //   sinon.stub(instance, 'post', function(a, b){
  //     expect(a).toEqual('/v1/pages/page_id/components.json');
  //     expect(b).toEqual('component[name]=1337-c0mp0nent');
  //   });
  //
  //   var s = new StatusPage();
  //   s.page_id = 'page_id';
  //   s.instance = instance;
  //
  //   s.createComponent('1337-c0mp0nent');
  //
  // });
  //
  // it('Should generate an appropriate component name payload', () => {
  //   var s = new StatusPage();
  //   var res = s.generateCreateComponentPayload('potatoes-component');
  //   expect(res).toEqual('component[name]=potatoes-component');
  // });
  //
  // it('Should update and toggle components correctly', (done) =>  {
  //   var s = new StatusPage();
  //   const testing_component_id = '6jgmt1plscnx';
  //   s.updateComponentState(testing_component_id, 'partial_outage', undefined)
  //   .then((a) => {
  //     s.getComponents((components) => {
  //       var arr = components.filter(({id}) => id === testing_component_id);
  //       expect(arr.length).toBe(1);
  //       expect(arr[0].status).toEqual('partial_outage');
  //       s.updateComponentState(testing_component_id, 'operational', undefined)
  //       .then((d) => {
  //         done();
  //       })
  //     });
  //   });
  // });
  //
  // it('Should return environment', () => {
  //     var testTable = [
  //         {name: 'test-dev', desired: 'dev'},
  //         {name: 'test-smart-DEV', desired: 'dev'},
  //         {name: 'test', desired: undefined},
  //         {name: '', desired: undefined},
  //         {name: 'test-SMART-DEV', desired: 'dev'},
  //         {name: 'test-DEV', desired: 'dev'},
  //         {name: 'test-PROD', desired: 'prod'},
  //         {name: 'test-SI', desired: 'si'},
  //         {name: 'test-smart-si', desired: 'si'},
  //         {name: undefined, desired: undefined}
  //     ];
  //
  //     testTable.forEach((t) => {
  //         var status = new StatusPage();
  //         expect(status.getComponentEnvironment(t.name)).toEqual(t.desired);
  //     });
  // })
  //
  // it('Should identify maintenance window', () => {
  //     var status = new StatusPage();
  //     var now = new moment();
  //
  //     const testTable = [
  //         {hour: 10, result: false},
  //         {hour: 0,  result: true},
  //         {hour: 12, result: false},
  //         {hour: 23, result: false},
  //         {hour: 7,  result: false},
  //         {hour: 5,  result: true}
  //     ];
  //     testTable.forEach((t) => {
  //         now.hours(t.hour);
  //         status.now = now;
  //
  //         expect(status.isMaintenanceWindow()).toBe(t.result);
  //     });
  // });
  //
  // it('Should deal with maintenance window', () => {
  //     var testTable = [
  //         { hour: 10, name: 'test-dev', status: 'operational', desired: 'operational'},
  //         { hour: 21, name: 'test-smart-DEV', status: 'major_disruption', desired: 'major_disruption'},
  //         { hour: 4, name: 'test-DEV', status: 'major_outage', desired: 'under_maintenance'},
  //         { hour: 0, name: 'test-SMART-DEV', status: 'minor_outage', desired: 'under_maintenance'},
  //         { hour: 7, name: 'test-DEV', status: 'operational', desired: 'operational'},
  //         { hour: 6, name: 'test-PROD', status: 'major_outage', desired: 'major_outage'},
  //         { hour: 4, name: 'test-SI', status: 'minor_outage', desired: 'minor_outage'},
  //         { hour: 3, name: 'test-smart-si', status: 'operational', desired: 'operational'},
  //     ];
  //
  //     testTable.forEach((t) => {
  //         var status = new StatusPage();
  //         var now = new moment();
  //         now.hour(t.hour);
  //         status.now = now;
  //         var instance = axios.create();
  //         sinon.stub(instance, 'patch', function(path, payload){
  //             expect(payload).toEqual(`component[status]=${t.desired}`);
  //         });
  //
  //         status.instance = instance;
  //         status.updateComponentState(undefined, t.status, t.name);
  //     });
  // });
});
