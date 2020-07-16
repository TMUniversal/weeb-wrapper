const WeebWrapper = require('./index.js')

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJQVHJlUEFzTlQiLCJ0b2tlbklkIjoicE5vS3lDNTF0IiwiaWF0IjoxNTk0ODc1MzQ5fQ.DwrEnnNb5rThEM6iCJ2ceOEcsg0LNp_KEl4XT61iQTsk1z87SKekTYnGwTNuTLElLatBqROAMkVM-NmJL8DW0DIAvI4tL9OZgBEusgzm79CEBlibf87NFMVd_bJRDUG2SeV6IwYvztB8imB_ED6h2k44GNJClcQnyG-ovIrqg5EZoXIUYnIcLj7hnERahVsMWrI5QASR6Yj673J2j7CaLdAHSXtvsp6YHtRHqFstzx9SA1auhZvvkIxt3IM2lPhQq-37C0r9SaDvVCwr60fTiitichFVCiXl7kc_1z81dwvy5qlP8WwZSOSQC9AYoBUlJbZSrucar7R1597Pyigqdw'

const wrapper = new WeebWrapper(null)

wrapper.accounts.validate(token).then(res => {
  console.log(res)
})
  .catch(e => {
    console.error(e)
  })
