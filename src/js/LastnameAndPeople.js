export class LastnameAndPeople{
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

    // "본관 성" 구성에서 성, 본관 순서로 우선 검색함
    findLastname(substr){
        const lastnameList = [], hometownList = [];
        for(let lastname of this.lastnameList){
            if (this.matchToString(lastname, substr)){
                const [home, name] = lastname.split(" ");
                if (this.matchToString(name, substr)){
                    lastnameList.push(lastname);
                } else{
                    hometownList.push(lastname);
                }
            }
        }
        lastnameList.sort((a, b) => {
            return this.sortByLastnameAndHometown(a, b);
        })
        hometownList.sort((a, b) => {
            return this.sortByHometownAndLastname(a, b);
        })
        return [...lastnameList, ...hometownList];
    }

    sortByLastnameAndHometown(a, b){
        const [hometownA, lastnameA] = a.split(" ");
        const [hometownB, lastnameB] = b.split(" ");
        
        if (lastnameA > lastnameB){
            return 1;
        } else if (lastnameA < lastnameB){
            return -1;
        } else{
            if (hometownA > hometownB){
                return 1;
            } else if (hometownA < hometownB){
                return -1;
            } else{
                return 0;
            }
        }
    }

    sortByHometownAndLastname(a, b){
        const [hometownA, lastnameA] = a.split(" ");
        const [hometownB, lastnameB] = b.split(" ");
        
        if (hometownA > hometownB){
            return 1;
        } else if (hometownA < hometownB){
            return -1;
        } else{
            if (lastnameA > lastnameB){
                return 1;
            } else if (lastnameA < lastnameB){
                return -1;
            } else{
                return 0;
            }
        }
    }

    matchToString(target, substr){
        if((substr === "") | (substr === " ")){
            return false;
        } else{
            return target.includes(substr);
        }
    }

    getPeopleByLastname(lastname){
        const list = this.lastnameAndPeopleList[lastname]
        return list ? list.sort() : null;
    }
}