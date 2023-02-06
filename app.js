const uri = "https://restcountries.com/v3.1/all"
let flag, currency, name, native,
         capital, population, region, sub_region,
          area, code, lang, timezone;

async function getapi(url) {
    try {
    const response = await fetch(url);
    var data = await response.json();
    //console.log(data);
    display(data);
    }
    catch(e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }
}

function display(data) {
        let content = ``;
        for (let r of data) {
            //console.log(r.currencies[Object.keys(r.currencies)[0]].name)
            try{
                currency = r.currencies[Object.keys(r.currencies)[0]].name;
                name = r.name.common;
                capital = r.capital;
                population = r.population;
                region = r.region;
                sub_region  = r.subregion;
                area = r.area;
                code = r.idd.root + r.idd.suffixes;
                timezone = r.timezones;
                flag = r.flags.png
                //console.log(flag)
                content += `
            <section class="main_container" style="border: 2px; border-style: solid; border-color: grey; margin:20px; box-shadow: 5px 5px rgb(224, 224, 224);">
            <section id="country_flag">
                <img src="${flag}" alt="404" height=182px width="260px">
            </section>
            <section id="country_detail">
                <h1>${name}</h1>
                <p>Currency: ${currency}</p>
                <p>Current Time And Date: ${timezone}</p>
                <button name="submit" class="action_btn_showmap" type="submit">Show Map</button>
                <button name="submit" class="action_btn_detail" type="submit" onclick=showDetail() >Detail</button>
            </section>
            </section>
            `
            }
            catch(e) {
                currency = ``;
                console.log("Error");
            }
        }
        document.getElementById("display_container").innerHTML = content;
        //document.getElementById("employees").innerHTML = tab;
}

function showDetail() {
    let content = `
    <h1>Blue</h1>
    `
    document.getElementsByClassName("secondary_display_container").innerHTML = content;   
    window.location.href="detail.htm";
}


getapi(uri);
