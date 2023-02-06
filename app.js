var countries = "";
var index = {}
async function getapi() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        var data = await response.json();
        countries = data;
        displayData(data);
    }
    catch (e) {
        console.log("--------Error--------", e.stack);
    }
}
function search() {
    var input = document.getElementById('search_box').value.toUpperCase();
    let result = countries.filter((r) => {
        return r.name.official.toUpperCase().includes(input);
    });
    displayData(result);
}

function displayData(data) {
    let content = ``;
    var counter = 0;
    for (let r of data) {
        try {
            let name = r.name.common;
            let flag = r.flags.png
            let timezone = ``;
            let currency = ``;

            if (r.hasOwnProperty('currencies')) {
                currency = r.currencies[Object.keys(r.currencies)[0]].name;
            }
            else {
                currency = "Not Defined"
            }

            if (r.timezones != undefined) {
                var currentTime = new Date($.now());
                timezone = r.timezones[0].substring(4).split(':');
                timezone = (parseInt(timezone[0]) * 60 + parseInt(timezone[1])) * 60000;
                timezone = new Date(currentTime.getTime() + timezone);
                timezone = timezone.toLocaleString();
            }

            content += `
            <div class="row my-3 mx-0  border border-primary">
            <div class="col-4 my-2 country-img">
                <img src="${flag}" class=" col-12 mx-1 my-2" >
            </div>
            <div class="col-8 mt-1 country-info">
                <h4>${name}</h4>
                <p class="my-0">Currency: ${currency}</p>
                <p class="my-0">Current Date and Time: ${timezone}  </p>
                <button type="button" class="btn col-6 my-2 show-map btn-light"><a href=${r.maps.googleMaps}>Show Map</a></button>
                <button type="button" class="btn col-5 my-2 country-details btn-light" onClick=showDetail("${counter}")><a href="detail.html">Details</a></button>
            </div>
        </div>
            `;
            counter+=1;
        }
        catch (e) {
            console.log("Error", r);
        }
    }
    document.getElementById("display_container").innerHTML = content;
}

function showDetail(data) {
    console.log(data);

    document.getElementById("secondary_display_container").innerHTML = `
    <h1>${data}</h1>
    `;
    //window.location.href = "detail.html";
}
