const AWS = (req, res) => {

  let ret = {
    maxCpuPercent: 2.92,
    maxMemoryPercent: 26.59,
  }

  return res.json(ret);

};
export default AWS;
