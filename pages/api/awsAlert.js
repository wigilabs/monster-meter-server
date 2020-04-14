const cors = require('micro-cors')()
const axios = require('axios')

const superagent = require("superagent");
const handler = (req, res) => {

  superagent
    .get("https://insights.newrelic.com/accounts/2482859/query?query=SELECT%20uniques(ec2InstanceId)%20FROM%20SystemSample%20WHERE%20awsRegion%20is%20NOT%20NULL")
    .set("X-Query-Key", "NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG")
    .set("Accept", "application/json")
    .end((err, response) => {
      let events = JSON.parse(response.text)
      let eventsObj = events.results
      let ec2Ids = []
      var i
      //for (i=0; i<=length(eventsObj); i++) {
        //    ec2Ids.push(eventsObj[i]);
          //                                 }

      let ret = {
        ec2Ids: ec2Ids,
      }
      console.log(ret)
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
