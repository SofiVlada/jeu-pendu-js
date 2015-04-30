describe("Game - Environment Requirements", function() {
  var game;

  beforeEach(function() {
  	game = new PenduViewModel("arc");
  });

  it('should have Knockout working', function () {
        expect(window.ko).toBeDefined();
    });
});

  describe("Game - Guess this Word", function() {
  var game;

  beforeEach(function() {
  	game = new PenduViewModel("arc");
  });

  it("should provide more tries than the count of characters of the chosen word", function() {
    game = new PenduViewModel("arc");
    expect(game.countTriesLeft()).toBeGreaterThan(3);
  });

  it("should not allow a non-alphabetical character to be entered", function() {
    game = new PenduViewModel("arc");
    game.currentLetter("3");
    expect(game.validateConditions()).not.toBeTruthy();
  });

   it("should not allow more than one character to be processed at the same time", function() {
    game = new PenduViewModel("arc");
    game.currentLetter("we");
    expect(game.validateConditions()).not.toBeTruthy();
  });

  it("should not be case-sensitive", function() {
    game = new PenduViewModel("arc");
    game.currentLetter("r");
    game.revealSecretWord();
    expect(game.rightLetters.length).toBe(1);
  });

  it("should not allow the same letter to be played twice, when the letter is wrong", function() {
  	game.currentLetter("s");
  	game.revealSecretWord();
  	var countBefore = game.countTriesLeft();
  	game.currentLetter("s");
  	game.revealSecretWord();
    expect(game.countTriesLeft()).toEqual(countBefore);
  });

  it("should not allow the same letter to be played twice, when the letter is right", function() {
    game.currentLetter("r");
    game.revealSecretWord();
    var countBefore = game.countTriesLeft();
    game.currentLetter("r");
    game.revealSecretWord();
    expect(game.countTriesLeft()).toEqual(countBefore);
  });

  it("should unhide all occurences of the same letter", function() {
    game = new PenduViewModel("possible");
    game.currentLetter("s");
  	game.revealSecretWord();

    expect(game.secretWordDisplayed()).toEqual("**SS****");
  });

  it("should support special characters");

   it("should display game results if no try is left", function() {
    game = new PenduViewModel("possible");
    game.currentLetter("s");
    game.countTriesLeft(1);
  	game.revealSecretWord();

    expect(game.gameWon().length).toBeGreaterThan(0);
  });

   it("should display game results if all the letters were found, even if tries are left", function() {
    game = new PenduViewModel("possible");
    game.currentLetter("s");
    game.countTriesLeft(5);
    game.rightLetters = ["P","O","I","B","L","E"];
  	game.revealSecretWord();

    expect(game.gameWon().length).toBeGreaterThan(0);
  });
});