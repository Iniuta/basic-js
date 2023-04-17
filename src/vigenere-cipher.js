const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(txt, key) {
    const alphabetLength = 26;
    if (!txt || !key) throw new Error("Incorrect arguments!");

    txt = txt.toUpperCase();
    key = key.toUpperCase();
    let result = "";

    for (let i = 0, j = 0; i < txt.length; i++) {
      const simbol = txt.charAt(i);
      if (simbol.match(/[A-Z]/i)) {
        const currentKeyLetter = key.charAt(j % key.length);
        const alphabetShift =
          currentKeyLetter.charCodeAt(0) - "A".charCodeAt(0);
        const encryptedText =
          ((simbol.charCodeAt(0) - "A".charCodeAt(0) + alphabetShift) %
            alphabetLength) +
          "A".charCodeAt(0);
        result += String.fromCharCode(encryptedText);
        j++;
      } else {
        result += simbol;
      }
    }
    if (this.direct) {
      return result;
    } else {
      return result.split("").reverse().join("");
    }
  }

  decrypt(txt, key) {
    const alphabetLength = 26;
    if (!txt || !key) throw new Error("Incorrect arguments!");

    txt = txt.toUpperCase();
    key = key.toUpperCase();
    let result = "";

    for (let i = 0, j = 0; i < txt.length; i++) {
      const simbol = txt.charAt(i);
      if (simbol.match(/[A-Z]/i)) {
        const currentKeyLetter = key.charAt(j % key.length);
        const alphabetShift =
          currentKeyLetter.charCodeAt(0) - "A".charCodeAt(0);
        const encryptedText =
          ((simbol.charCodeAt(0) -
            "A".charCodeAt(0) -
            alphabetShift +
            alphabetLength) %
            alphabetLength) +
          "A".charCodeAt(0);
        result += String.fromCharCode(encryptedText);
        j++;
      } else {
        result += simbol;
      }
    }
    if (this.direct) {
      return result;
    } else {
      return result.split("").reverse().join("");
    }
  }
}

module.exports = {
  VigenereCipheringMachine,
};
