const cors = require('micro-cors')()
const axios = require('axios')

const superagent = require("superagent");
const handler = (req, res) => {

  let URL = 'https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20*%20FROM%20salesforceCost%20SINCE%203%20week%20ago'
  const headers = { "X-Query-Key": 'NRIQ-V-S-D7Tgcd4R7BHtumVd8QYaLVxzTDXG' }

  axios.get(URL, { headers })
  .then(response => {
    let data = response.data.results[0].events[0]

    let ret = {
      totalUsers: data.totalUsers,
      activeUsers: data.activeUsers,
      instanceType: data.type
    }


    URL = 'https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20*%20FROM%20salesforceStatus%20SINCE%203%20week%20ago'

    axios.get(URL, { headers })
    .then(response => {
      let status = response.data.results[0].events

      status = status.filter(state => state.type )

      ret.status = status

      return res.json(ret)
     })

  })
}
export default cors(handler)
