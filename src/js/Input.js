export class Input{
    constructor($input, mediator){
        this.$input = $input;
        this.mediator = mediator;
        this.$input.onkeyup = () => {
            const value = this.$input.value;
            this.mediator.reportTypedText(value);
        }
    }
}