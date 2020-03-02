const superagent = require("superagent");
const handler1 = (req, res) => {
  let events;
  superagent
    .get(
      "https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+AVERAGE%28cpuPercent%29%2C+AVERAGE%28memoryUsedBytes%2FmemoryTotalBytes*100%29+FROM+SystemSample+FACET+instanceType+WHERE+%28%60provider%60%3D%27GcpVirtualMachine%27%29+LIMIT+100+SINCE+1+WEEK+ago"
    )
    .set("X-Query-Key", "NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd")
    .set("Accept", "application/json")
    .end((err, response) => {
     // console.log('response: ', response) totalResult
      events = JSON.parse(response.text);
      console.log(events.facets[0].results[1])

      //let eventsObj = events.results;
      //console.log("=> events: ", eventsObj[0]);
     // let instanceType = eventsObj[0].average;
     let instanceType=events.facets[0].name
     let maxCpuPercent = events.facets[0].results[0].average;
     let maxMemoryPercent = events.facets[0].results[1].average;
      let craftObj =
        {
          maxCpuPercent: maxCpuPercent,
          maxMemoryPercent: maxMemoryPercent,
          instanceType: instanceType
        }
      //console.log(craftObj);
      return res.json(craftObj);
    });
};
export default handler1;
