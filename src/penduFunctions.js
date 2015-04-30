function PenduViewModel(initWord) {
    var self = this;
    self.secretWord = "";
    self.countTriesLeft = ko.observable(5);
    self.listUniqueLettersInSecretWord = [];
    self.secretWordDisplayed = new ko.observable();
    self.currentLetter = new ko.observable("");
    self.wrongLetters = new ko.observableArray([]);
    self.rightLetters = [];
    self.gameWon = new ko.observable("");
    self.isEnabled = new ko.observable(true);
    
    this.populateSecretWord = function(word) {  
        this.secretWord =  word;    
        for ( var i = 0; i < this.secretWord.length; i++ )
        {
            if (this.listUniqueLettersInSecretWord.indexOf(this.secretWord.charAt(i)) < 0)
            {
                this.listUniqueLettersInSecretWord.push(this.secretWord.charAt(i));
            }
        }
        
        this.countTriesLeft(this.secretWord.length + 3);
        
        this.secretWordDisplayed(this.hideLettersNotFound(this.secretWord));
    }
    
    this.revealSecretWord = function() {
    
        if(this.validateConditions())
        {
            this.countTriesLeft(this.countTriesLeft() - 1);

            if (this.secretWord.indexOf(this.currentLetter().toUpperCase()) < 0)
            {
                this.wrongLetters.push(this.currentLetter().toUpperCase());
            }
            else 
            {
                this.rightLetters.push(this.currentLetter().toUpperCase());
            }                               
            
            this.secretWordDisplayed(this.hideLettersNotFound(this.secretWord));
            
            if (this.countTriesLeft() == 0 || this.secretWordDisplayed() == this.secretWord) 
            {
                this.countTriesLeft(0);
                this.finalizeGame();
            }
        }
    }
    
        this.hideLettersNotFound = function(content) {
        for ( var j = 0; j < this.listUniqueLettersInSecretWord.length; j++)
            {
                if (this.rightLetters.indexOf(this.listUniqueLettersInSecretWord[j]) < 0)
                {
                    content = content.replace(new RegExp(this.listUniqueLettersInSecretWord[j], "gi"),"*");
                }
            }
            
            return content;
        }
    
    this.validateConditions = function() {
        var isOkay = false;
        if (this.currentLetter().length == 1 
        && this.currentLetter().match(/[a-z]/gi) 
        && this.countTriesLeft() > 0
        && this.wrongLetters().indexOf(this.currentLetter().toUpperCase()) < 0
        && this.rightLetters.indexOf(this.currentLetter().toUpperCase()) < 0) 
        {
            isOkay = true;
            this.isEnabled(true);
        } else {
            this.isEnabled(false);
        }
        return isOkay;
    }
    
    this.finalizeGame = function() {
        if (this.secretWordDisplayed() == this.secretWord)
        {
            this.gameWon("CONGRATS");
        }
        else
        {
            this.gameWon("GAME OVER");
        }
    
        this.secretWordDisplayed(this.secretWord);
    }
    
    //init
    this.populateSecretWord(initWord.toUpperCase());
}

ko.applyBindings(new PenduViewModel("RUMPELSTILZCHEN"));