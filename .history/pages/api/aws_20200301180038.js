const superagent = require('superagent');
const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=FROM%20SystemSample,%20NetworkSample%20SELECT%20latest(coreCount)%20as%20%27numCpu%27,%20latest(memoryTotalBytes)%20as%20%27memTotalBytes%27,%20latest(operatingSystem)%20as%20%27operatingSystem%27,%20max(cpuPercent)%20as%20%27maxCpuPercent%27,%20max(memoryUsedBytes%2FmemoryTotalBytes)*100%20as%20%27maxMemoryPercent%27,%20latest(instanceType)%20as%20%27instanceType%27,%20max(receiveBytesPerSecond)%20as%20%27receiveBytesPerSecond%27,%20max(transmitBytesPerSecond)%20as%20%27transmitBytesPerSecond%27%20FACET%20hostname%20WHERE%20coreCount%20is%20not%20null%20and%20((instanceType%20is%20not%20null%20AND%20instanceType%20!%3D%20%27unknown%27)%20OR%20ec2InstanceType%20is%20not%20null)%20and%20providerAccountName%3D634037824681%20LIMIT%202000%20since%201%20week%20ago')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {      
      //console.log('response: ', response) totalResult
       events = JSON.parse(response.text)
      console.log('events: ', events)
      events = events
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
