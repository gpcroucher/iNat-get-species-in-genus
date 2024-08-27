let output = document.getElementById("output");

async function printAllSpeciesInGenus(genusID) {
  const response = await fetch(
    `https://api.inaturalist.org/v1/taxa?parent_id=${genusID}&rank=species&order=desc&order_by=observations_count`
  );
  console.log("HTTP Response:", response);
  const json = await response.json();
  console.log("JSON Data:", json);
  output.innerHTML = "";
  json.results.forEach((element) => {
    console.log(element.name);
    let outputHTML = "";
    outputHTML += element.name;
    if (Object.hasOwn(element, "preferred_common_name")) {
      outputHTML += ` (${element.preferred_common_name})`;
    }
    outputHTML += "<br>";
    output.innerHTML += outputHTML;
  });
}

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(Object.fromEntries(new FormData(event.target)).genus);
  printAllSpeciesInGenus(Object.fromEntries(new FormData(event.target)).genus);
});

// printAllSpeciesInGenus(4343);
