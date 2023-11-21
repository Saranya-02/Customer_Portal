process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;
const express = require("express");
const fs = require('fs');
var cors = require('cors');
const bodyparser = require("body-parser");
const app=express();
var request = require("request");
const{response} = require('express')
const parser = require('xml2js')
const xml = require('x2js')

app.use(bodyparser.json());
app.use(cors());
app.use(function(req,res,next){
    res.getHeader("Access-Control-Allow-Original","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})

var customerid;
var username;

app.post("/login",async(req,res)=> {
  const fetch = require('node-fetch');
  console.log(req.body);
  customerid = req.body.id;
  var url ='https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_loginsp/100/zws_cust_loginsp/zws_cust_loginsp';
  
  var xml = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soap:Header/>
  <soap:Body>
     <urn:ZFM_LOGINSP>
        <CUST_ID>${req.body.id}</CUST_ID>
        <PASSWORD>${req.body.pwd}</PASSWORD>
     </urn:ZFM_LOGINSP>
  </soap:Body>
  </soap:Envelope>`
  var options =await fetch(url, {
    'method': 'POST',
      'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: xml
  
  }).then(res => res.text())
  parser.parseString(options, (err, data) => {
  if (err) {
  console.log(err);
  } else {
  var SendData = data['env:Envelope']['env:Body'][0]['n0:ZFM_LOGINSPResponse'][0]['STATUS'];
  console.log(SendData);
  res.send(SendData);
  } 
  })
  });

app.post("/profile",function(req,res){
    console.log(username);
    var options = {
        'method': 'POST',
        'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_profilesp/100/zws_cust_profilesp/zws_cust_profilesp',
        'headers': {
          'Content-Type': 'application/soap+xml;charset=UTF-8',
          'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
          'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
          'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_PROFILESP>\r\n         <CUST_ID>${customerid}</CUST_ID>\r\n      </urn:ZFM_PROFILESP>\r\n   </soap:Body>\r\n</soap:Envelope>`
      
      };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data=new xml();
    var xmljs = data.xml2js(response.body);
    xmljs = JSON.stringify(xmljs)
    res.send(xmljs);

  })     
});



app.post("/inquiry",function(req,res){
    console.log(username);
    var options = {
      'method': 'POST',
      'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_custinquirysp/100/zws_cust_custinquirysp/zws_cust_custinquirysp',
      'headers': {
        'Content-Type': 'application/soap+xml;charset=UTF-8',
        'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
        'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
        'Cookie': 'sap-usercontext=sap-client=100'
      },
      body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_CUSTINQUIRYSP>\r\n         <CUST_ID>${customerid}</CUST_ID>\r\n         <IT_INQUIRY>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_INQUIRY>\r\n      </urn:ZFM_CUSTINQUIRYSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
    
    };
    
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data=new xml();
    var xmljs = data.xml2js(response.body);
    xmljs = JSON.stringify(xmljs)
    res.send(xmljs);

  })     
});


app.post("/delivery",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_deliverylistsp/100/zws_cust_deliverylistsp/zws_cust_deliverylistsp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_DELIVERYLISTSP>\r\n         <CUST_ID>${customerid}</CUST_ID>\r\n         <IT_DEL_INFO>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_DEL_INFO>\r\n      </urn:ZFM_DELIVERYLISTSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
  
  };
  
request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  xmljs = JSON.stringify(xmljs)
  res.send(xmljs);

})     
});


app.post("/salesorder",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_salesordersp/100/zws_cust_salesordersp/zws_cust_salesordersp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_SALESORDERSP>\r\n         <CUST_ID> ${customerid}</CUST_ID>\r\n         <SALESORDER_IT>\r\n            <!--Zero or more repetitions:-->\r\n           <item>\r\n           </item>\r\n         </SALESORDER_IT>\r\n      </urn:ZFM_SALESORDERSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
  
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  xmljs = JSON.stringify(xmljs)
  res.send(xmljs);

})     
});


app.post("/payment",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_paymentagingsp/100/zws_cust_paymentagingsp/zws_cust_paymentagingsp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_PAYMENTAGINGSP>\r\n         <CUST_ID>3</CUST_ID>\r\n         <IT_DET>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n              \r\n            </item>\r\n         </IT_DET>\r\n      </urn:ZFM_PAYMENTAGINGSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
  
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  xmljs = JSON.stringify(xmljs)
  res.send(xmljs);

})     
});



app.post("/memo",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_creddebmemosp/100/zws_cust_creddebmemosp/zws_cust_creddebmemosp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDQwNTEwNDYFAAQAAAAICgAIUE9VU0VSQDH%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwNDA1MTA0NjA3WjAjBgkqhkiG9w0BCQQxFgQUIckB4!ZrkM6G4rWTw6mW!75rmBYwCQYHKoZIzjgEAwQvMC0CFQC1wp48ZzyS3JCdeWQv8YkPr8hHKAIUNb5TYrkk!IfyIbiR0QBL5Lx!lhU%3D; sap-usercontext=sap-client=100'
    },
    body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_CREDDEBMEMOSP>\r\n         <CREDITMEMO_IT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </CREDITMEMO_IT>\r\n         <CUST_ID>${customerid}</CUST_ID>\r\n         <DEBITMEMO_IT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n              \r\n            </item>\r\n         </DEBITMEMO_IT>\r\n      </urn:ZFM_CREDDEBMEMOSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
  
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  xmljs = JSON.stringify(xmljs)
  res.send(xmljs);

})     
});

app.post("/invoice",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_cust_invoicessp/100/zws_cust_invoicessp/zws_cust_invoicessp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMjpBYmFwZXJAMTIz',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_INVOICESP>\r\n      <ZCUS_ID>${customerid}</ZCUS_ID>\r\n         <IT_INVOICE>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </IT_INVOICE>\r\n         \r\n      </urn:ZFM_INVOICESP>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data=new xml();
    var xmljs = data.xml2js(response.body);
    xmljs = JSON.stringify(xmljs)
    res.send(xmljs);
  
  })     
  });
  
app.post("/invoiceform",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_invoiceformsp/100/zws_invoiceformsp/zws_invoiceformsp',
    'headers': {
      'Content-Type': 'application/soap+xml;charset=UTF-8',
      'action': 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_PROFILESP:ZFM_PROFILESPRequest',
      'Authorization': 'Basic QWJhcGVyMzpBYmFwZXJAMTIz',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDMyMTE3MDEFAAQAAAAICgAIUE9VU0VSQDH%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzIxMTcwMTE5WjAjBgkqhkiG9w0BCQQxFgQUtbuk4PIUWWpDFcOdtqma%2FnEeRLowCQYHKoZIzjgEAwQvMC0CFQCwe!SjJ6s0JbAArHl%2F8yWF3v9raAIUe3Najqjzu4kjqIxcphF1YBV!!Sw%3D; sap-usercontext=sap-client=100'
    },
    body: `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZFM_INVOICEFORMSP>\r\n         <CUS_ID>${customerid}</CUS_ID>\r\n      </urn:ZFM_INVOICEFORMSP>\r\n   </soap:Body>\r\n</soap:Envelope>`
  
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  // xmljs = JSON.stringify(xmljs)
  res.send({xmljs:xmljs['Envelope']['Body']['ZFM_INVOICEFORMSPResponse']['IT_RESULT']});

})     
});





app.listen(1000,()=>{
    console.log("Server listening on 1000");
});
