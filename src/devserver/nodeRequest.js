const fetch = require('node-fetch');

const httpConfig = {
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
};

const configHeaders = {
  'content-type': 'application/json; charset=utf-8',
  userid: '3601278905',
  username: 'jayanta.sahoo@thermofisher.com',
  //  cookie:
  //  'AKA_A2=A; CK_LANG_CODE=en; akacd_QA1_AWS_Commerce=3793603542~rv=79~id=8651330be8e6ec1986f7ed2e57ea718a; akacd_QA1_AWS_Publish=3793603542~rv=21~id=9e6ba7bb27928be5040b33eecef360b9; akacd_QA1_AWS_CMGT=3793603542~rv=82~id=d25e10a553a805a9dc39c2f3de2d0b6f; ObSSOCookie=apistore; ak_bmsc=19053FD8DDF31488F8B46F6391CA34B242C6087A87240000D7805460CD34EE58~plw7LZjOPrFUogvTtltu5zRx5JxtvmuHzwQ9RRvoZvTIZXfO8slki5yCGzpnQJidsooYsRUrD1+wMqfW2tgRZY4uHgstOPTXzlHrxr/cRnTOA/ec7uwcvIx+4tzgkk7B89MPxnsSEVVh+qiYiR3UZ0oeNd27H9zNFDevvn1rK10wQ9wwhf93E8YSCWPaormN5hyY0/dgPg/Ig+C70HmbKAYASU+Id56aj6wGlszRH5+IqqxAMGSA3xhYXY+SCz6ONy; akacd_TF_QA1_Search_LucidWorks=3793603547~rv=98~id=a9971a366b0723f0267b2994e13afac0; at_check=true; AMCVS_5B135A0C5370E6B40A490D44%40AdobeOrg=1; userType=internal; s_vi=[CS]v1|302A406F2DB13757-600003E99E4506F4[CE]; s_ecid=MCMID%7C38074818142534251710641449320402121788; s_fid=55D381795687743C-106AF6C6FD308B7A; AMCV_5B135A0C5370E6B40A490D44%40AdobeOrg=-408604571%7CMCIDTS%7C18706%7CMCMID%7C38074818142534251710641449320402121788%7CMCAAMLH-1616755550%7C7%7CMCAAMB-1616755550%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1616157950s%7CNONE%7CMCAID%7C302A406F2DB13757-600003E99E4506F4%7CMCSYNCSOP%7C411-18713%7CvVersion%7C4.6.0; s_cc=true; _fbp=fb.1.1616150751170.74285131; gig_canary=false; gig_canary_ver=11903-3-26935800; gig_bootstrap_3_TWlw-o8sB38qyZpV4t0z35B8C7nnx1kpadSoOctwht8RbO9PdSYreiWiKiaslKEm=auth_ver4; glt_3_TWlw-o8sB38qyZpV4t0z35B8C7nnx1kpadSoOctwht8RbO9PdSYreiWiKiaslKEm=st2.s.AcbH8Xhd0w.EpQYRa__eqUd4NV31L_gYfkTGiPUdgnfICwe_1JgqDWUbeQzGmrs872tWJy84KsiJzjPlDK1D9d533uTiofD7HbygtX2JPUhXMxFBCpUEdw.vXwumdcj5iuHGIrn6GXmfgDJfuqH0eUFSpZDrk-Dm-kIM-QmIlZui3O-CgEyJLOBtfuRGxUsobUD77TOdt4jvg.sc3; identity_uid=05066a58b7c4481bbb902a57b3ba0fc1; newCart=true; newProfile=true; newAcctDashboard=true; newAcctV2Dashboard=true; newAcctRegistration=true; displayRecentQuotes=true; displayRecentOrdersExpanded=true; newOrderHistory=true; isGigyaEnabled=true; CMGT_STATUS=Y; CustomInvAllowance=none; MiniCartTotalItems=0; CK_ISO_CODE=us; CK_DISPLAY_TYPE=b2ccmgt; CK_CURRENCY_CODE_NEW=userType%3AR%3BcurrencyCode%3AUSD%3BcountryCode%3Aus; CK_CURRENCY_CODE=USD; CK_CUSTOMER_INFO=customerName%3ARaluca%3Buserlogin%3Araluca.dura%40thermofisher.com%3BcustomerCompany%3AABC%3BlastName%3ADura%3BemailAddress%3Araluca.dura%40thermofisher.com%3BemailId%3Araluca.dura%40thermofisher.com%3BdisplayType%3Ab2ccmgt%3BunreadMessagesCount%3A0%3BisB2BCMGT%3Afalse%3BMasterUserType%3ANONE%3Buserkey%3A3601235531; lt_token_id=410CC776FD72263CF0F5916185C62E1A; CartKey=264269482; newCart=true; testTLD=test; WCXUID=41373171667116161507760; WCXSID=00001734851161615077609166666666; WCXSID_expiry=1616150778103; kampyle_userid=ee73-1683-d5fc-96f7-6a68-5dca-1555-66d5; com.ibm.commerce.ubx.idsync.DSPID_ADOBE%2CaaUserId%2CmcId%2Cemail%2Cx1VisitorId=com.ibm.commerce.ubx.idsync.DSPID_ADOBE%2CaaUserId%2CmcId%2Cemail%2Cx1VisitorId; cd_user_id=1784a17d1ae2d7-0c5d7535a754a8-2f7c2e4d-3804a-1784a17d1afd4a; cartId=16286973; _ga=GA1.2.1278666700.1616150779; _gid=GA1.2.1692157909.1616150779; s_days_since_new_s=First Visit; _hjTLDTest=1; _hjid=537e3aa5-afcf-47cd-a248-840a1b571850; _hjFirstSeen=1; _hjIncludedInPageviewSample=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=1; c31=aspire%20dashboard; ak_bmsc=23EC0772CFD2CD9D493EF81DFB84B93B42C6086C19270000218154603D668004~plf9AK3CoUBBrNMYhmfINNtXPoXhLiJFeuv1fa1FgG/N6efOr6PAjWGojBxRRmYqWPxxpvmiKG1S0ka7OIZ7fbB1XIJDQ8qxPLfpMX/Zlb0mxJF5VIOXKd1l7Ugfs+aVQ6BcNtL6PozvsHnhRYjErpRTKU/XZAU6exwzqJcXKghRcHo/6ydcSvl8uhMhCOJgtXSmpdHxFGynjM27Qii4n9cBNMRtCjzCm6ce5vzRdBFWw=; kampyleUserSession=1616150824865; kampyleUserSessionsCount=2; bm_sv=B2246CC76DC7A204445C05C97DE73784~l4sYeLFXXz3wNyQSGRdY9EE8VUTsH3yLd8VrZdcsOAKJCMJ0/mrpWZo2EIScWbtgZxhgZDWLqxN7hOpa/I3Ust+ZjmSC/yOTS0Z0A2FYDu/qmgEuPNKDjZae0QhScI4MZHC4dkrimGQjCqkkFi2o82qX7GRcIKWblCBN2iCu3f4=; aspireTitle=; _uetsid=55ca0db088a011eba1567b175ee3da75; _uetvid=55ca587088a011eb9c44ab536e11aa6a; kampyleSessionPageCounter=3; mbox=session#37869513675148c48f9f983db98871de#1616152610|PC#37869513675148c48f9f983db98871de.37_0#1679396088; s_sq=%5B%5BB%5D%5D; CartSessionID=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTYxNTQ4ODksInVzZXJJZCI6IjM2MDEyMzU1MzEiLCJ1c2VyTmFtZSI6InJhbHVjYS5kdXJhQHRoZXJtb2Zpc2hlci5jb20iLCJqU2Vzc2lvbklkIjoiNTkwRTQxRTJEMUUxNDMwOUEwOTc4REEyQjc5QkNEOTkuY29tZXJnZW50LWFwcC0yLXFhMSIsImx0VG9rZW5JZCI6IjQxMENDNzc2RkQ3MjI2M0NGMEY1OTE2MTg1QzYyRTFBIiwiaXNOZXdDYXJ0RW5hYmxlZCI6dHJ1ZSwiY2FydElkIjoiMTYyODY5NzMifQ.Z2K2SvLCDwAD39EQ0k6FjzHMrMU1iTo9wL5nHB1WKfE; s_days_since_new=1616151290472; s_tp=1001; s_ppv=loyalty%253Astore%253Aaspire%2C95%2C95%2C946; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFUTBNVVE1TjBOQ1JUSkVNemszTTBVMVJrTkRRMFUwUTBNMVJFRkJSamhETWpkRU5VRkJRZyIsImtleWlkIjoiUkVRME1VUTVOME5DUlRKRU16azNNMFUxUmtORFEwVTBRME0xUkVGQlJqaERNamRFTlVGQlFnIn0.eyJpc3MiOiJodHRwczovL2ZpZG0uZ2lneWEuY29tL2p3dC8zX1RXbHctbzhzQjM4cXlacFY0dDB6MzVCOEM3bm54MWtwYWRTb09jdHdodDhSYk85UGRTWXJlaVdpS2lhc2xLRW0vIiwiYXBpS2V5IjoiM19UV2x3LW84c0IzOHF5WnBWNHQwejM1QjhDN25ueDFrcGFkU29PY3R3aHQ4UmJPOVBkU1lyZWlXaUtpYXNsS0VtIiwiaWF0IjoxNjE2MTUyMTI5LCJleHAiOjE2MTYxNTI0ODksInN1YiI6IjA1MDY2YTU4YjdjNDQ4MWJiYjkwMmE1N2IzYmEwZmMxIiwidXNlcm5hbWUiOiJyYWx1Y2EuZHVyYUB0aGVybW9maXNoZXIuY29tIn0.RCXEADo1Cs5ptzOdD3SPs69xIzHaCEadjW3p5_1QNotU_RZChbSXgHkuVRoM-Xsw-kvxlEJRRgWrnmxxD-uAFohR9WggIhXBqaE3T539PSH9AA8HPKEt4rg1kL03JByLocFD0LpOBRGugWVPtkQNWMCtfflSPBPWNJRLJWN91PVkolpDj1xvey9F5Zsj-1I5n2gy9sVjLyGO-GpCNVNNd6N5JU7OSIrQQ7RCN6ug4lYMNFx8J8JBM0cPHAxulsx6sgGfjxzu_Z5suvpGE1Tye37ecoLyeyWdyq3qv8WwbyYFgST2fSrak_9HkWheH7NpIzVedvLmw9VonZgGOq66Kg; tokenExpiration=1616152399040; RT="z=1&dm=qa.thermofisher.com&si=8d803a54-f4ee-49bf-a4fb-0bd294fcb426&ss=kmg65mrc&sl=h&tt=h05&bcn=%2F%2F1737ad5d.akstat.io%2F&obo=5"; adcloud={%22_les_v%22:%22y%2Cthermofisher.com%2C1616153941%22}; isCartRefreshed=false; ak_wfSession=1616152143~id=E+no13gnlvKmLOjmJxJb/hNMB/9FS9NkMmiDRDsa/28=; bm_sv=B2246CC76DC7A204445C05C97DE73784~l4sYeLFXXz3wNyQSGRdY9EE8VUTsH3yLd8VrZdcsOAKNI5srZaTr/uOZz37uP0Srl8eYmH5H7GFFDGmu+BMGUcO3HBlJkR4SIEZNZfpz+fulX0k8kb9XVHiW5TrvThrwU0zBUtCylmQOw5+AtKzTc3Rwz145EGyEQk1HQXTHJ7c='
};

const http = {
  get: (headers = {}) => ({
    method: 'GET',
    ...httpConfig,
    headers: {
      ...configHeaders,
      ...headers,
    },
  }),
  post: (payload, headers = {}) => ({
    method: 'POST',
    ...httpConfig,
    headers: {
      ...configHeaders,
      ...headers,
    },
    body: JSON.stringify(payload),
  }),
  patch: (payload, headers = {}) => ({
    method: 'PATCH',
    ...httpConfig,
    headers: {
      ...configHeaders,
      ...headers,
    },
    body: JSON.stringify(payload),
  }),
  put: (payload, headers = {}) => ({
    method: 'PUT',
    ...httpConfig,
    headers: {
      ...configHeaders,
      ...headers,
    },
    body: JSON.stringify(payload),
  }),
  delete: (headers = {}) => ({
    method: 'DELETE',
    ...httpConfig,
    headers: {
      ...configHeaders,
      ...headers,
    },
  }),
  htmlHeaders: {
    'content-type': 'text/plain',
  },
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.error = response;
  throw error;
};

const parseContent = (response, headers) => {
  let json;

  if (response.status === 204) {
    // no content
    return response.blob();
  }

  if (headers['content-type'] === 'application/octet-stream') {
    return response.text();
  }

  if (headers['content-type'] === 'text/plain') {
    return response.text();
  }

  try {
    json = response.json();
  } catch (e) {
    throw new Error(e);
  }
  return json;
};

const request = (url, options) => {
  console.log(url);
  console.log('Request headers', JSON.stringify(options.headers));
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(checkStatus)
      .then((response) => parseContent(response, options.headers))
      .then((res) => {
        resolve(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

module.exports = {
  http,
  request,
};
