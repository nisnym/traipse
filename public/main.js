// Foursquare API Info
const _0x3d96=['0cf09a296dbed68607da161042ff7a16','1411gkFtmP','1165803lEiBzj','5aRRKvE','1102202RIQhYG','15107RVfCDc','https://api.foursquare.com/v2/venues/explore?near=','164089HZAfpd','8hWfjzg','523lztxtJ','212084IlkrtN','96jqUOug','5242BpltQB'];const _0x2fe0=function(_0x472c10,_0x1e91cb){_0x472c10=_0x472c10-0x86;let _0x3d96f4=_0x3d96[_0x472c10];return _0x3d96f4;};const _0xdc33c7=_0x2fe0;(function(_0x57d76b,_0x143b07){const _0x49dcd0=_0x2fe0;while(!![]){try{const _0x22b71c=parseInt(_0x49dcd0(0x8b))*-parseInt(_0x49dcd0(0x87))+-parseInt(_0x49dcd0(0x8c))*-parseInt(_0x49dcd0(0x89))+parseInt(_0x49dcd0(0x88))+-parseInt(_0x49dcd0(0x92))*-parseInt(_0x49dcd0(0x8d))+parseInt(_0x49dcd0(0x90))*parseInt(_0x49dcd0(0x8f))+-parseInt(_0x49dcd0(0x86))+parseInt(_0x49dcd0(0x8e));if(_0x22b71c===_0x143b07)break;else _0x57d76b['push'](_0x57d76b['shift']());}catch(_0x8193ee){_0x57d76b['push'](_0x57d76b['shift']());}}}(_0x3d96,0xa879f));const clientId='K5BPQZ5HXYUFQW02M0FXVM2WBSH22JAGPFSW3WKP1HLCLJ33',clientSecret='HDUEOXCK0MSHQOINAUMG3Z2UTZKCNAXDXOSTKBWJWQNQDDB1',url=_0xdc33c7(0x8a),openWeatherKey=_0xdc33c7(0x91),weatherUrl='https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"),$("#venue5")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const photos = '&venuePhotos=1'
  const urlToFetch = `${url}${city}${photos}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20201202`;
  try {
  const response = await fetch(urlToFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    console.log(response);
    return venues;
  }
}
catch(error){
  console.log(error);
}
}


const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      return jsonResponse;
    }
  }
  catch(error){
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue) => {
    
    const rand = Math.floor(Math.random() * 9);
    const venue = venues[rand];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
// createVenueHTML is a helper function found in helpers.js
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, venue.categories);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // createWeather is a helper function found in helpers.js
  	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
