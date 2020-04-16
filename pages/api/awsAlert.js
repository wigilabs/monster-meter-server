const cors = require('micro-cors')()
const axios = require('axios')

const superagent = require("superagent");
const handler = (req, res) => {
  //event.results[0].members.length
  //event.results[0].members
  superagent
    .get("https://insights.newrelic.com/accounts/2482859/query?query=SELECT%20uniques(ec2InstanceId)%20FROM%20SystemSample%20WHERE%20awsRegion%20is%20NOT%20NULL")
    .set("X-Query-Key", "NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG")
    .set("Accept", "application/json")
    .end((err, response) => {
      let events = JSON.parse(response.text)
      console.log(response.text)
        return response.text
    })
}
export default cors(handler)
