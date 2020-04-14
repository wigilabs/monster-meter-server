const cors = require('micro-cors')()
const axios = require('axios')

const superagent = require("superagent");
const handler = (req, res) => {

  superagent
    .get("https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=FROM+SystemSample+SELECT+latest(coreCount),+latest(memoryTotalBytes),+max(cpuPercent),+max(memoryUsedBytes/memoryTotalBytes)*100 , latest(instanceType) +WHERE+coreCount+is+not+null+and+((instanceType+is+not+null+AND+instanceType!='unknown')+OR+ec2InstanceType+is+not+null)+and+providerAccountName=634037824681+LIMIT+2000+since+1+week ago")
    .set("X-Query-Key", "NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG")
    .set("Accept", "application/json")
    .end((err, response) => {
      let events = JSON.parse(response.text)
      let eventsObj = events.results

      let numCpu = eventsObj[0].latest
      let memTotalBytes = eventsObj[1].latest
      let maxCpuPercent = eventsObj[2].max
      let maxMemoryPercent = eventsObj[3].result
      let instanceType = eventsObj[4].latest

      let ret = {
        numCpu: numCpu,
        memTotalBytes: memTotalBytes,
        maxCpuPercent: maxCpuPercent,
        maxMemoryPercent: maxMemoryPercent,
        instanceType: instanceType
      }

      const URL = 'https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20*%20FROM%20awsStatus%20SINCE%203%20weeks%20ago'
      const headers = { "X-Query-Key": 'NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG' }

      axios.get(URL, { headers })
      .then(response => {
        let status = response.data.results[0].events
        ret.status = status
        // console.log('ret: ', ret)
        return res.json(ret)
       })
    })
}
export default cors(handler)
