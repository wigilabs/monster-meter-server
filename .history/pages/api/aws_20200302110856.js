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
      let eventsObj = events.results[0];
      console.log("events: ", eventsObj);
      events = events;
      // let valueSSH  = (events[0].description.includes('is unreachable')) ? 0 : 1
      // let valueHTTP = (events[1].description.includes('is unreachable')) ? 0 : 1
      // let valueHost = (events[2].description.includes('is unreachable')) ? 0 : 1      // console.log('valueSSH: ', valueSSH, 'msg:', events[0].description)
      // console.log('valueHTTP: ', valueHTTP, 'msg:', events[1].description)
      // console.log('valueHost: ', valueHost, 'msg:', events[2].description)      // let ret = [
      //   {name: 'SSH',  value: valueSSH, msg: events[0].description},
      //   {name: 'HTTP', value: valueHTTP, msg: events[1].description},
      //   {name: 'Host', value: valueHost, msg: events[2].description}
      // ]
      return events;
    });
};
export default handler;
