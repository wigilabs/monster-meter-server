const superagent = require("superagent");
const handler1 = (req, res) => {
  let events;
  superagent
    .get(
      "https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+average%28cpuPercent%29%2Caverage%28memoryUsedBytes%2FmemoryTotalBytes*100%29+FROM+SystemSample+WHERE+%28%60provider%60%3D%27GcpVirtualMachine%27%29+LIMIT+100+SINCE+60+minutes+ago"
    )
    .set("X-Query-Key", "NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd")
    .set("Accept", "application/json")
    .end((err, response) => {
      //console.log('response: ', response) totalResult
      events = JSON.parse(response.text);
      let eventsObj = events.results;
      console.log("=> events: ", eventsObj);
      let maxCpu = eventsObj[0].average;
      let memTotal = eventsObj[1].average;
      let craftObj = [
        {
          maxCpu: maxCpu,
          memTotal: memTotal,
        }
      ];
      console.log(craftObj);
      return res.json(craftObj);
    });
};
export default handler1;
