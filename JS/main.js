var SN = document.getElementById("siteName");
var SURL = document.getElementById("siteURL");
var allData = [];



function getData() {
    var duplicate = allData.find(item => 
        item.siteName.toLowerCase() === SN.value.toLowerCase() || 
        item.siteURL.toLowerCase() === SURL.value.toLowerCase()
    );
    if (duplicate) {
        window.alert("Site Name or URL already exists!");
        return;
    }
    if (/^[a-z]{3,}$/i.test(SN.value) && isValidURL(SURL.value)) {

        var Data = {
            siteName: SN.value,
            siteURL: SURL.value
        }
        allData.push(Data)
        saveData()
        clearData()
        displayData()
      

        
    }
    else {
        window.alert("Site Name or Url is not valid, Please follow the rules below:\n\n- Site name must contain at least 3 characters\n- Site URL must be a valid one");
    }
}



if (localStorage.getItem("Bookmarks") !== null) {
    allData = JSON.parse(localStorage.getItem("Bookmarks"))
    displayData()
}

function displayData() {
    var All = "";
    for (var i = 0; i < allData.length; i++) {
        All += `<tr>
                        <td class="cellPadding">${i + 1}</td>
                        <td class="cellPadding">${allData[i].siteName}</td>
                        <td class="cellPadding"><button class="btn btn-visit" onclick="siteVisit(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                        <td class="cellPadding"><button class="btn btn-danger" onclick="deleteData(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                    </tr>`

    }
    document.getElementById("tableBody").innerHTML = All
}
function isValidURL(url) {
    var regex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return regex.test(url);
}

function clearData() {
    SN.value = ""
    SURL.value = ""
}

function saveData() {
    localStorage.setItem("Bookmarks", JSON.stringify(allData))

}

function siteVisit(index) {
    var url = allData[index].siteURL;
    window.open(url, "_blank");
}
function deleteData(index) {
    allData.splice(index, 1);
    saveData();
    displayData();
}
