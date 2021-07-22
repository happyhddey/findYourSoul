import {fetchData} from "./fetchData.js"
import {Mediator} from "./Mediator.js"

async function main(){
    const filePath = "./data/famousPeopleForLastName.txt"

    const data = await fetchData(filePath);
    const $input = document.getElementsByClassName("search-bar")[0];
    const $searchList = document.getElementsByClassName("lastname-list")[0];
    const $resultList = document.getElementsByClassName("result-list")[0];
    
    const mediator = new Mediator($input, $searchList, $resultList, data);
}

main();