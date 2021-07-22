export class ListView{
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
        this.mediator.reportClickedLi(this, value);
    }
    
    deleteAll(){
        while(this.$ul.hasChildNodes()){
            this.$ul.removeChild(this.$ul.firstChild)
        }
    }
}