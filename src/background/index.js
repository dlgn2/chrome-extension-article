console.log("test2")

chrome.identity.getProfileUserInfo(function(userInfo){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "readDom",email:userInfo});
  
   });
  })