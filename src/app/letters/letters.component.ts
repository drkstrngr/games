import { WordService } from './../word.service';
import { ALPHABET } from './../alphabet';
import { Component, OnInit } from '@angular/core';
import { Letter } from '../letter';


@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {

  alphabet = ALPHABET;
  letterList: Letter[] = [];
  wordList: string[] = [];
  currentWord: string;
  currentWordLetters: string[] = [];
  mysteryWordLetters: string[] = [];
  numClicksRemaining: number;

  constructor(private wordService: WordService) {

  }

  ngOnInit() {
    this.wordService.getFileContents()
      .subscribe(words => {
        this.wordList = words.split("\n");
        this.newWord();
      });

    this.buildLetterList();
  }

  buildLetterList(): void {
    for (let letter in this.alphabet) {
      if (this.alphabet.hasOwnProperty(letter)) {
        let letterObject = {} as Letter;

        letterObject.letter = this.alphabet[letter];
        letterObject.isGuessed = false;

        this.letterList.push(letterObject);
      }
    }
  }

  newWord(): void {
    this.numClicksRemaining = 6;
    let min: number = 0;
    let max: number = this.wordList.length - 2;
    let random: number = Math.floor(Math.random()*(max-min+1)+min);

    this.currentWord = this.wordList[random];

    this.currentWordLetters.length = 0;
    this.mysteryWordLetters.length = 0;

    if(this.currentWord != null){
      this.currentWord = this.currentWord.slice(0, -1);

      console.log(this.currentWord);

      this.currentWord = this.currentWord.toUpperCase();

      for(let ctr = 0; ctr < this.currentWord.length; ctr++){
        this.currentWordLetters.push(this.currentWord.substr(ctr,1));
        this.mysteryWordLetters.push("");
      }
    }

    for (let letter in this.letterList) {
      if (this.letterList.hasOwnProperty(letter)) {
        this.letterList[letter].isGuessed = false;
      }
    }
  }

  logClick(clickedLetter: string): void {
    let foundLetter: boolean = false;

    for (let letter in this.letterList) {
      if (this.letterList.hasOwnProperty(letter)) {
        if(clickedLetter === this.letterList[letter].letter){
          this.letterList[letter].isGuessed = true;
        }

        for(let ctr = 0; ctr < this.currentWordLetters.length; ctr++){
          if(clickedLetter === this.currentWordLetters[ctr]){
            this.mysteryWordLetters[ctr] = clickedLetter;
            foundLetter = true;
          }
        }
      }
    }

    if(foundLetter == false) {
      this.numClicksRemaining = this.numClicksRemaining - 1;
    }
  }
}
