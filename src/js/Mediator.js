import {Input} from "./Input.js"
import {ListView} from "./ListView.js"
import { LastnameAndPeople  } from "./LastnameAndPeople.js";

export class Mediator{
    constructor($input, $searchList, $resultList, data){
        this.input = new Input($input, this);
        this.searchView = new ListView($searchList, this);
        this.resultView = new ListView($resultList, this);
        this.lastnameAndPeople = new LastnameAndPeople(data);
    }

    reportTypedText(value){
        const lastnameList = this.lastnameAndPeople.findLastname(value);
        this.resultView.deleteAll();
        this.searchView.addElements(lastnameList);
    }

    reportClickedLi(that, value){
        console.log("selected: ", value);
        if (that == this.searchView){
            let peopleList = this.lastnameAndPeople.getPeopleByLastname(value);
            this.searchView.deleteAll();
            if(peopleList === null){
                peopleList = ["No Result"];
            }
            this.resultView.addElements(peopleList);
        }
    }
}