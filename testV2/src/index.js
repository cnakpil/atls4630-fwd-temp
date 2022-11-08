// // import ipify from 'ipify';
// console.log("hello, world");

// var https = require('https');

// const options = {
//     path: '/ip/',
//     host: 'ipapi.co',
//     port: 443,
//     headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
// };
// https.get(options, function (resp) {
//     var body = ''
//     resp.on('data', function (data) {
//         body += data;
//     });

//     resp.on('end', function () {
//         console.log(body);
//     });
// });



// // console.log(await ipify());

// // var http = require('http');

// // http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
// //     resp.on('data', function (ip) {
// //         console.log("My public IP address is: " + ip);
// //     });
// // });

import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
console.log("hello, world");

console.log(await publicIp()); // Falls back to IPv4
//=> 'fe80::200:f8ff:fe21:67cf'

console.log(await publicIpv6());
//=> 'fe80::200:f8ff:fe21:67cf'

console.log(await publicIpv4());
//=> '46.5.21.123'