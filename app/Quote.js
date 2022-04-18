export class Quote {
    constructor(text) {
        this.text = text;
        this.guessedLetter = [];
    }

    getText() {
        let content = '';
        for ( const char of this.text) {
            if(char ==' ' ||  this.guessedLetter.includes(char)) {
                content += char
            } else {
                content += '_'
            }
        }

        return content;
    }

    guess(letter) {
        if(!this.text.includes(letter)) {
            return false;
        } else {
            this.guessedLetter.push(letter);

            return true;
        }
    }
}