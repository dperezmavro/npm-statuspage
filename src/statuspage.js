const axios = require('axios')
// const debug = require("debug")("StatusPage")
// const moment = require('moment')

class StatusPage {
  constructor(apiKey, pageId) {
    this.now = () => 42 // moment
    this.apiKey = apiKey
    this.pageId = pageId
    this.instance = axios.create({
      baseURL: 'https://api.statuspage.io',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `OAuth ${this.apiKey}`
      }
    })
  }

  updateMetric(metricId, val) {
    return this.instance.post(this.generateMetricPostPath(metricId),
                                this.generateRequestParameters(val))
  }

  generateMetricPostPath(metricId) {
    return this.generatePagePath() + `/metrics/${metricId}/data.json`
  }

  generatePagePath() {
    return `/v1/pages/${this.pageId}`
  }

  generateRequestParameters(val) {
    return `data[timestamp]=${this.now()}&data[value]=${val}`
  }

  generateComponentPath(componentId) {
    return this.generatePagePath() + `/components/${componentId}.json`
  }

  generateComponentStatusPayload(status) {
    return `component[status]=${status}`
  }

  getComponentEnvironment(componentName) {
    if (!componentName) {
      this.log('getComponentEnvironment - undefined componentName')
      return undefined
    }

    if (componentName.indexOf('-') !== -1) {
      return componentName
              .split('-')
              .slice(-1)
              .pop()
              .toLowerCase()
    }

    return undefined
  }

  updateComponentState(componentId, status, componentName) {
    return this.instance.patch(
      this.generateComponentPath(componentId),
      this.generateComponentStatusPayload(status)
    )
  }

  getComponents(callback) {
    return this.instance.get(this.generateCreateComponentUrl())
  }

  generateCreateComponentPayload(name) {
    return `component[name]=${name}`
  }

  generateCreateComponentUrl() {
    return this.generatePagePath() + '/components.json'
  }

  createComponent(componentName) {
    return this.instance.post(this.generateCreateComponentUrl(),
                              this.generateCreateComponentPayload(componentName)
    )
  }

  deleteComponent(componentId) {
    return this.instance.delete(
      this.generateComponentPath(componentId)
    )
  }

  log(msg) {
    console.log(msg)
  }
}

export default StatusPage
export {
  StatusPage
}
