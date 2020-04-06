const cors = require('micro-cors')()
const axios = require('axios')

const superagent = require("superagent")
const handler = (req, res) => {

  superagent
    .get("https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+AVERAGE%28cpuPercent%29%2C+AVERAGE%28memoryUsedBytes%2FmemoryTotalBytes*100%29+FROM+SystemSample+FACET+instanceType+WHERE+%28%60provider%60%3D%27GcpVirtualMachine%27%29+LIMIT+100+SINCE+1+WEEK+ago")
    .set("X-Query-Key", "NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd")
    .set("Accept", "application/json")
    .end((err, response) => {
      let events = JSON.parse(response.text)
      // console.log(events.facets[0].results[1])

      let instanceType=events.facets[0].name
      let maxCpuPercent = events.facets[0].results[0].average
      let maxMemoryPercent = events.facets[0].results[1].average

      let ret = {
        maxCpuPercent: maxCpuPercent,
        maxMemoryPercent: maxMemoryPercent,
        instanceType: instanceType
      }


      const URL = 'https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20*%20FROM%20googleStatus%20SINCE%203%20weeks%20ago'
      const headers = { "X-Query-Key": 'NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG' }

      axios.get(URL, { headers })
      .then(response => {
        let status = response.data.results[0].events

        ret.status = status
        console.log('ret: ', ret)

        return res.json(ret)
       })
    })
}
export default cors(handler)
