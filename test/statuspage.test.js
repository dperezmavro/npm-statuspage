const expect = require('expect')
const axios = require('axios')
// const sinon = require('sinon')
const uuid = require('uuid')
// var moment = require('moment')
var {StatusPage} = require('../index.js')
const metric_id = '07fbhggxqj6l'

describe('StatusPage', () => {
  it('Should exist', ()=>{
    expect(
      StatusPage
    ).toExist()

    expect(
      new StatusPage()
    ).toExist()
  })

  it('Should return POST path', () => {
    const pageId = 'MyTestPageId123'
    const s = new StatusPage(undefined, 'MyTestPageId123')
    expect(
      s.generateMetricPostPath('456')
    )
    .toEqual(`/v1/pages/${pageId}/metrics/456/data.json`)
  })

  it('Should generate the request string', () => {
    let s = new StatusPage()
    s.now = () => 42

    expect(
      s.generateRequestParameters('31337')
    ).toEqual('data[timestamp]=42&data[value]=31337')
  })


  it('Should generate API base path', () => {
    const s = new StatusPage(undefined, '123')
    expect(
      s.generatePagePath()
    ).toEqual('/v1/pages/123')
  })

  it('Should generate component status payload', () => {
    const s = new StatusPage(undefined, undefined)
    expect(
      s.generateComponentStatusPayload('stopped')
    ).toEqual('component[status]=stopped')
  })

  it('Should generate component path', () => {
    const s = new StatusPage(undefined, '4567')

    expect(
      s.generateComponentPath('asdf')
    ).toEqual('/v1/pages/4567/components/asdf.json')
  })

  it('Should get components', (done) => {
    let s = new StatusPage()
    s.instance = {
      get: (url) => {
        expect(
          url
        ).toEqual('/v1/pages/undefined/components.json')
        return new Promise((a, r) => {
          a({
            data: ['hello', 'world']
          })
        })
      }
    }
    s.getComponents()
    .then(
      (data) => {
        expect(
          data
        ).toEqual(['hello', 'world'])
        done()
      }
    )
  })
  //
  // it('Should fail to get components', () => {
  //   var instance = axios.create()
  //   sinon.stub(instance, 'get', function(){
  //     return new Promise(function(acc, rej){
  //       rej('1337-3rr0r')
  //     })
  //   })
  //
  //   var s = new StatusPage()
  //   s.instance = instance
  //   var spy = expect.createSpy()
  //   s.getComponents(spy)
  //
  //   expect(spy).toNotHaveBeenCalled()
  // })
  //
  // it('Should create a component', () => {
  //   var instance = axios.create()
  //   sinon.stub(instance, 'post', function(a, b){
  //     expect(a).toEqual('/v1/pages/page_id/components.json')
  //     expect(b).toEqual('component[name]=1337-c0mp0nent')
  //   })
  //
  //   var s = new StatusPage()
  //   s.page_id = 'page_id'
  //   s.instance = instance
  //
  //   s.createComponent('1337-c0mp0nent')
  //
  // })
  //
  // it('Should generate an appropriate component name payload', () => {
  //   var s = new StatusPage()
  //   var res = s.generateCreateComponentPayload('potatoes-component')
  //   expect(res).toEqual('component[name]=potatoes-component')
  // })
  //
  // it('Should update and toggle components correctly', (done) =>  {
  //   var s = new StatusPage()
  //   const testing_component_id = '6jgmt1plscnx'
  //   s.updateComponentState(testing_component_id, 'partial_outage', undefined)
  //   .then((a) => {
  //     s.getComponents((components) => {
  //       var arr = components.filter(({id}) => id === testing_component_id)
  //       expect(arr.length).toBe(1)
  //       expect(arr[0].status).toEqual('partial_outage')
  //       s.updateComponentState(testing_component_id, 'operational', undefined)
  //       .then((d) => {
  //         done()
  //       })
  //     })
  //   })
  // })
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
  //     ]
  //
  //     testTable.forEach((t) => {
  //         var status = new StatusPage()
  //         expect(status.getComponentEnvironment(t.name)).toEqual(t.desired)
  //     })
  // })
  //
  // it('Should identify maintenance window', () => {
  //     var status = new StatusPage()
  //     var now = new moment()
  //
  //     const testTable = [
  //         {hour: 10, result: false},
  //         {hour: 0,  result: true},
  //         {hour: 12, result: false},
  //         {hour: 23, result: false},
  //         {hour: 7,  result: false},
  //         {hour: 5,  result: true}
  //     ]
  //     testTable.forEach((t) => {
  //         now.hours(t.hour)
  //         status.now = now
  //
  //         expect(status.isMaintenanceWindow()).toBe(t.result)
  //     })
  // })
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
  //     ]
  //
  //     testTable.forEach((t) => {
  //         var status = new StatusPage()
  //         var now = new moment()
  //         now.hour(t.hour)
  //         status.now = now
  //         var instance = axios.create()
  //         sinon.stub(instance, 'patch', function(path, payload){
  //             expect(payload).toEqual(`component[status]=${t.desired}`)
  //         })
  //
  //         status.instance = instance
  //         status.updateComponentState(undefined, t.status, t.name)
  //     })
  // })
})
