async function main(){
    const filePath = "../data/famousPeopleForLastName.txt"

    const data = await fetchData(filePath);
    const $input = document.getElementsByTagName("input")[0];
    const $list = document.getElementsByTagName("ul")[0];
    
    const mediator = new Mediator($input, $list, data);
}

main();






async function fetchData(filePath){
    return await fetch(filePath)
       .then(response => response.text())
       .catch(err => console.log(err))
}


class Mediator{
    constructor($input, $list, data){
        this.input = new Input($input, this);
        this.searchView = new SearchListView($list, this);
        this.lastnameAndPeople = new LastnameAndPeople(data);
    }

    getTypedText(value){
        const lastnameList = this.lastnameAndPeople.findLastname(value);
        this.searchView.addElements(lastnameList);
    }

    getClickedLi(value){
        const peopleList = this.lastnameAndPeople.getPeopleByLastname(value);
        if(peopleList === null){
            console.log("no result");
        } else{
            console.log(peopleList);
        }
    }
}


class Input{
    constructor($input, mediator){
        this.$input = $input;
        this.mediator = mediator;
        this.$input.onkeyup = () => {
            const value = this.$input.value;
            this.mediator.getTypedText(value);
        }
    }
}



class SearchListView{
    constructor(ul, mediator){
        this.$ul = ul;
        this.mediator = mediator
    }

    addElements(list){
        this.deleteAll();
        for(let elem of list){
            this.addElement(elem);
        }
    }

    addElement(elem){
        const $li = document.createElement("li");
        $li.innerText = elem;
        $li.onclick = () => {
            this.report($li.innerText);
        }
        this.$ul.appendChild($li);
    }

    report(value){
        this.mediator.getClickedLi(value);
    }
    
    deleteAll(){
        while(this.$ul.hasChildNodes()){
            this.$ul.removeChild(this.$ul.firstChild)
        }
    }
}


class LastnameAndPeople{
    constructor(data){
        this.lastnameAndPeopleList = this.parseLastnameAndPeople(data);
        this.lastnameList = this.getAllLastname(this.lastnameAndPeopleList);
        // this.peopleList = this.getAllPeople(this.lastnameAndPeopleList);
    }

    parseLastnameAndPeople(data){
        const obj = {};
        const lines = data.match(/.*:\r\n.*/g);
        for(let line of lines){
            const lastnameAndPeople = /(.*)씨:\r\n(.*)/.exec(line);
            const lastname = lastnameAndPeople[1];
            const people = lastnameAndPeople[2].match(/[^ ]+/g);
            obj[lastname] = people;
        }
        return obj;
    }

    getAllLastname(lastnameAndPeopleList){
        const list = [];
        for(let lastname in lastnameAndPeopleList){
            list.push(lastname);
        }
        return list;
    }

    getAllPeople(lastnameAndPeopleList){
        const list = [];
        for(let lastname in lastnameAndPeopleList){
            const people = lastnameAndPeopleList[lastname];
            console.log(people)
            for(let person in people){
                list.push(person);
            }
        }
        return list;
    }

    // "본관 성" 구성에서 성이 일치하는 경우를 먼저 보여줌
    findLastname(substr){
        const list = [];
        for(let lastname of this.lastnameList){
            if (this.matchToString(lastname, substr)){
                const [hometown, last] = lastname.split(" ");
                if(last == substr){
                    list.unshift(lastname);
                } else{
                    list.push(lastname);
                }
            }
        }
        return list;
    }

    matchToString(target, substr){
        if((substr === "") | (substr === " ")){
            return false;
        } else{
            return target.includes(substr);
        }
    }

    getPeopleByLastname(lastname){
        return this.lastnameAndPeopleList[lastname];
    }
}