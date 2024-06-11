document.addEventListener("DOMContentLoaded", function() {

    // ADDING RULES
    var btnAdd = document.querySelector('#rule-btn-add');
    btnAdd.addEventListener("click", addRule);
    function addRule() {
        // Select the destenation container and element
        var rulePlace = document.querySelector('.container-rules');
        var newRule = document.querySelector('.rule');
        const ruleClone = newRule.cloneNode(true);
        
        // Remove IDs to avoid duplication
        ruleClone.removeAttribute('id');
        var inputs = ruleClone.querySelectorAll('input');
        inputs.forEach((input) => {
            input.removeAttribute('id');
            input.value = '';
        });
    
        // Append the cloned element and update IDs
        rulePlace.appendChild(ruleClone);
        updateRuleIDs();
    }

    function updateRuleIDs() {
        var rules = document.querySelectorAll('.rule');
        rules.forEach((rule, index) => {
            rule.id = 'rule-' + (index + 1);
            var inputs = rule.querySelectorAll('input');
            inputs.forEach((input, inputIndex) => {
                input.id = input.className.split(' ')[1] + '-' + (index + 1);
            });
        });
    }
    
    

    // ADDING SHORTS
    var btnAddShort = document.querySelector('#short-btn-add');
    btnAddShort.addEventListener("click", addShort);
    
    function addShort() {
        // Select destenation container and element to clone
        var shortPlace = document.querySelector('.container-shorts');
        var newShort = document.querySelector('.short');
        const shortClone = newShort.cloneNode(true);
        
        // Remove IDs to avoid duplication
        shortClone.removeAttribute('id');
        var inputs = shortClone.querySelectorAll('input');
        inputs.forEach((input) => {
            input.removeAttribute('id');
            input.value = '';
        });
    
        // Append the cloned element and update IDs
        shortPlace.appendChild(shortClone);
        updateShortIDs();

    }

    function updateShortIDs() {
        var shorts = document.querySelectorAll('.short');
        shorts.forEach((short, index) => {
            short.id = 'short-' + (index + 1);
            var inputs = short.querySelectorAll('input');
            inputs.forEach((input, inputIndex) => {
                input.id = input.className.split(' ')[1] + '-' + (index + 1);
            });
        });
    }
    
    function replaceSymbolsWithMeanings(text, symbolMeaningMap) {
        // console.log(`symbolMeaningMap: ${symbolMeaningMap}`);
        symbolMeaningMap.forEach((meaning, symbol) => {
            var regex = new RegExp(symbol, 'g');
            // console.log(`text before replace: ${text}`);
            text = text.replace(regex, meaning);
            // console.log(`text after replace: ${text}`);
        });
        return text;
    }
    
    


    function applyRuleChanges(currentChar, newChar, beforeChar, afterChar, unlessBeforeChar, unlessAfterChar, text) {
    var currentCharsArray = currentChar.split(' ');
    var newCharsArray = newChar.split(' ');    


    for (var i = 0; i < currentCharsArray.length; i++) {
        var currentChar = currentCharsArray[i];
        var newChar = newCharsArray[i];
        
    // Makes right changes in right conditions
        if(currentChar && newChar && !beforeChar && !afterChar && !unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');    //Should never happen (current char can't be nothing if no conditions)
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(currentChar, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && !afterChar && !unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && afterChar && !unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`${currentChar}(?="?:?"?${afterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && afterChar && !unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && !afterChar && unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)${currentChar}`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && !afterChar && !unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`${currentChar}(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && !afterChar && unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && !afterChar && unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && afterChar && unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && afterChar && unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && afterChar && unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && afterChar && !unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && afterChar && !unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && !beforeChar && afterChar && unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && !afterChar && !unlessBeforeChar && unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`, 'gm');
            text = text.replace(regex, newChar);
        } else if(currentChar && newChar && beforeChar && !afterChar && unlessBeforeChar && !unlessAfterChar){
            currentChar = currentChar.replace(/Ø/g, '');
            newChar = newChar.replace(/Ø/g, ''); 
            var regex = new RegExp(`(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}`, 'gm');
            text = text.replace(regex, newChar);
        } 
    }
    return text;
    }


    // GO THROUGH RULES AND GIVE OUTPUT
    function mySubmit() {
        var text = document.getElementById("myText").value;

        // Get all shorts and create a symbol-meaning map
        var shorts = document.querySelectorAll('.short');
        var symbolMeaningMap = new Map();
        shorts.forEach((short) => {
            var symbol = short.querySelector('.symbol-char').value;
            var meaning = short.querySelector('.meaning-char').value;
            meaning = meaning.replace(/\s+/g, '|').replace(/^/, '[').replace(/$/, ']');
            if (symbol && meaning) {
                symbolMeaningMap.set(symbol, meaning);
            }
        });


        // Get all and apply each rule
        var rules = document.querySelectorAll('.rule');
        rules.forEach((rule) => {
            var currentChar = replaceSymbolsWithMeanings(rule.querySelector('.cur-char').value, symbolMeaningMap);
            currentChar = currentChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?').replace(/\./g, '\\.');
            var newChar = replaceSymbolsWithMeanings(rule.querySelector('.new-char').value, symbolMeaningMap);
            newChar = newChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?');
            var beforeChar = replaceSymbolsWithMeanings(rule.querySelector('.bef-char').value, symbolMeaningMap);
            beforeChar = beforeChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?').replace(/\./g, '\\.');
            beforeChar = beforeChar.replace(/#/mg, '^');
            var afterChar = replaceSymbolsWithMeanings(rule.querySelector('.aft-char').value, symbolMeaningMap);
            afterChar = afterChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?').replace(/\./g, '\\.');
            afterChar = afterChar.replace(/#/mg, '$');
            var unlessBeforeChar = replaceSymbolsWithMeanings(rule.querySelector('.unl-bef').value, symbolMeaningMap);
            unlessBeforeChar = unlessBeforeChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?').replace(/\./g, '\\.');
            unlessBeforeChar = unlessBeforeChar.replace(/#/mg, '^');
            var unlessAfterChar = replaceSymbolsWithMeanings(rule.querySelector('.unl-aft').value, symbolMeaningMap);
            unlessAfterChar = unlessAfterChar.replace(/[{}]/g, '').replace(/,/g, '|').replace(/\(/g, '').replace(/\)/g, '?').replace(/\./g, '\\.');
            unlessAfterChar = unlessAfterChar.replace(/#/mg, '$');



            var detectDigit = new RegExp(/\d+/, 'g');
            var digitsPresent = false;
            var ruleInputs = document.querySelectorAll('.rule-input');

            for (let inputField of ruleInputs){
                var thisChar = inputField.value;
                if (detectDigit.test(thisChar)) {
                    digitsPresent = true;
                    console.log(thisChar);
                    break;
                }
            }


            if (digitsPresent){
                console.log(`digitsPresent: ${digitsPresent}`);
                

                var allKeys = [];
                // Iterate over symbolMeaningMap keys (symbols) and add them to allKeys array
                symbolMeaningMap.forEach((value, key) => { 
                    allKeys.push(key);
                });


                allKeys.forEach(thisKey =>{                                                                     // symbol               loop
                    var digitArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    digitArray.forEach(thisDigit => {                                                           // digit                loop
                        var thisDigitArray = new RegExp (`${thisKey}${thisDigit}`, 'g');
                        var ruleInputs = document.querySelectorAll('.rule-input');


                        ruleInputs.forEach((inputField) => {                                                    // .rule-input veld     loop
                            var thisChar = inputField.value;


                            if (thisDigitArray.test(thisChar)){
                                console.log(`${thisKey}${thisDigit} is present`);
                                if (inputField.classList.contains('cur-char')){
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = cur-char");
                                    // Hier komt de juiste regEx
                                }
                                if (inputField.classList.contains('new-char')){                                                             
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = new-char");
                                }
                                if (inputField.classList.contains('bef-char')){
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = bef-char");
                                }
                                if (inputField.classList.contains('aft-char')){
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = aft-char");
                                }
                                if (inputField.classList.contains('unl-bef')){
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = unl-bef");
                                }
                                if (inputField.classList.contains('unl-aft')){
                                    var symbolValueBrackets = thisChar.replace(new RegExp(thisDigit, 'g'), '($&)');
                                    console.log(`symbolValueBrackets: ${symbolValueBrackets}`);
                                    console.log("thisChar = unl-aft");
                                }
                                                                                                            
                                const symbolValue = symbolMeaningMap.get(thisKey);                      // waarde van thisKey              
                                const input = document.getElementById("myText").value;                  // waarde van myText
                                const meaningRegex = new RegExp(symbolValue, 'g');                      // zoekt naar: /[a|i|u|e]/g
                                console.log(`symbolvalue: ${symbolValue}`);
                                
                                let indices = [];                                                       // maakt array van indexes
                                for (const match of input.matchAll(meaningRegex)) {
                                    indices.push(match.index);
                                }

                                let theseElements = [];
                                indices.forEach(index => {                                              // index                loop
                                        const element = input[index];
                                        theseElements.push(element);
                                });
                                    
                                const allEqual = theseElements => theseElements.every(v => v === theseElements[0]);
                                var equalValues = false;
                                if (allEqual(theseElements)){
                                    equalValues = true;
                                    console.log(`equalValues: ${equalValues}`)
                                    console.log("array IS equal");
                                } else {
                                    equalValues = false;
                                    console.log(`equalValues: ${equalValues}`)
                                    console.log("array is NOT equal");
                                }

                            } else{
                                console.log(`${thisKey}${thisDigit} is NOT present`);
                            }
                        });
                    });
                });


            } else{
                console.log(`digitsPresent: ${digitsPresent}`);
            }

            text = applyRuleChanges(currentChar, newChar, beforeChar, afterChar, unlessBeforeChar, unlessAfterChar, text);
            });
                
        // Display transformed text
        document.getElementById("output-word").textContent = `Transformed word: ${text}`;
    }
    



    function saveData() {
        const rules = document.querySelectorAll('.rule');
        const symbols = document.querySelectorAll('.short');
    
        const rulesData = {
            rules: [],
            symbols: []
        };
    
        // Collect rules data
        rules.forEach(rule => {
            rulesData.rules.push({
                cChar: rule.querySelector('.cur-char').value,
                nChar: rule.querySelector('.new-char').value,
                bChar: rule.querySelector('.bef-char').value,
                aChar: rule.querySelector('.aft-char').value,
                uBChar: rule.querySelector('.unl-bef').value,
                uAChar: rule.querySelector('.unl-aft').value
            });
        });
    
        // Collect symbols data
        symbols.forEach(symbol => {
            rulesData.symbols.push({
                sChar: symbol.querySelector('.symbol-char').value,
                mChar: symbol.querySelector('.meaning-char').value
            });
        });
    
        // Save data to localStorage
        localStorage.setItem('rulesData', JSON.stringify(rulesData));
        alert('Data saved successfully!');
    }
    
    function loadData() {
        // Retrieve the JSON string from localStorage and check if there is data
        const dataToLoadJSON = localStorage.getItem('rulesData');
        if (dataToLoadJSON) {
            // Parse the JSON string back to an object
            const dataToLoad = JSON.parse(dataToLoadJSON);
    
            // Get the number of current and saved rules and add more if necessary
            const numOfRulesPresent = document.querySelectorAll('.rule').length;
            const numOfRulesToLoad = dataToLoad.rules.length;
    
            for (let i = numOfRulesPresent; i < numOfRulesToLoad; i++) {
                addRule();
            }
    
            // Fill the form fields with the rules data
            const rules = document.querySelectorAll('.rule');
            dataToLoad.rules.forEach((saveRule, index) => {
                if (rules[index]) {
                    rules[index].querySelector('.cur-char').value = saveRule.cChar;
                    rules[index].querySelector('.new-char').value = saveRule.nChar;
                    rules[index].querySelector('.bef-char').value = saveRule.bChar;
                    rules[index].querySelector('.aft-char').value = saveRule.aChar;
                    rules[index].querySelector('.unl-bef').value = saveRule.uBChar;
                    rules[index].querySelector('.unl-aft').value = saveRule.uAChar;
                }
            });
    
            // Get the number of current and saved symbols and add more if necessary
            const numOfSymbolsPresent = document.querySelectorAll('.short').length;
            const numOfSymbolsToLoad = dataToLoad.symbols.length;
    
            for (let i = numOfSymbolsPresent; i < numOfSymbolsToLoad; i++) {
                addShort();
            }
    
            // Fill the form fields with the symbols data
            const symbols = document.querySelectorAll('.short');
            dataToLoad.symbols.forEach((saveSymbol, index) => {
                if (symbols[index]) {
                    symbols[index].querySelector('.symbol-char').value = saveSymbol.sChar;
                    symbols[index].querySelector('.meaning-char').value = saveSymbol.mChar;
                }
            });
    
        } else {
            alert('No data found!');
        }
    }
    


    document.getElementById('saveData').addEventListener('click', saveData);
    document.getElementById('loadData').addEventListener('click', loadData);
    document.getElementById('mySubmit').addEventListener('click', mySubmit);
    });
