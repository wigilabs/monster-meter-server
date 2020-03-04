const { send } = require('micro')
const cors = require('micro-cors')()

const superagent = require("superagent");
const handler = (req, res) => {
  let events;
  superagent
    .get(
      "https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=FROM+SystemSample+SELECT+latest(coreCount),+latest(memoryTotalBytes),+max(cpuPercent),+max(memoryUsedBytes/memoryTotalBytes)*100 , latest(instanceType) +WHERE+coreCount+is+not+null+and+((instanceType+is+not+null+AND+instanceType!='unknown')+OR+ec2InstanceType+is+not+null)+and+providerAccountName=634037824681+LIMIT+2000+since+1+week ago"
    )
    .set("X-Query-Key", "NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd")
    .set("Accept", "application/json")
    .end((err, response) => {
      //console.log('response: ', response) totalResult
      events = JSON.parse(response.text);
      let eventsObj = events.results;
      console.log("=> events: ", eventsObj);
      let numCpu = eventsObj[0].latest;
      let memTotalBytes = eventsObj[1].latest;
      let maxCpuPercent = eventsObj[2].max;
      let maxMemoryPercent = eventsObj[3].result;
      let instanceType = eventsObj[4].latest;
      let craftObj =
        {
          numCpu: numCpu,
          memTotalBytes: memTotalBytes,
          maxCpuPercent: maxCpuPercent,
          maxMemoryPercent: maxMemoryPercent,
          instanceType: instanceType
        }
      console.log(craftObj);
      return res.json(craftObj);
    });
};
export default cors(handler);
