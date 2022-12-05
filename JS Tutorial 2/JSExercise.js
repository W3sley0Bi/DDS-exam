/**
 * Exercise 1
 */


const numbers = [1722, 920, 299, 446, 1011, 655];
let results;

for(let i = 0; i <= numbers.length; i++){
    
for(let j = 1; j <= numbers.length; j++){
    let tmp = numbers[i] + numbers[j]
    if(tmp == 2021){
        results = numbers[i] * numbers[j]
        console.log("results: " + results)
    }
}   
}


/**
 * Exercise 2
 */
let results1
 for(let i = 0; i <= numbers.length; i++){ 
    for(let j = 1; j <= numbers.length; j++){
        for(let h = 2; h <= numbers.length; h++){
        let tmp = numbers[i] + numbers[j] + numbers[h]
            if(tmp == 2021){
            results = numbers[i] * numbers[j] * numbers[h]
            console.log("results1: " + results)
            }
            
        }   
    }
}

/**
 * Exercise 3
 */
 const passwordList = [
    { times: '1-3', letter: 'a', password: 'aaaa'},
    { times: '1-3', letter: 'b', password: 'cdefg'},
    { times: '2-9', letter: 'c', password: 'cccccccc'}
];

function counterString(obj){
    let passwordArr = obj.password.split("")
    let min = obj.times.split("")[0]
    let max = obj.times.split("")[2]
    let checkLetter = false
    let counterLetter = false
    let counter = 0
    for (let i = 0; i <= passwordArr.length; i++) {
        if(obj.letter == passwordArr[i]){
            counter ++
            checkLetter = true
        }
        
    }
    if(counter >=min && counter <= max){
        counterLetter = true
    }

    if(counterLetter && checkLetter){
        console.log("IS VALID")
    }else{
        console.log("NOT VALID");
    }
    
}

counterString(passwordList[2])

/**
 * Exercise 4
 */

 const passportList = [
    { ecl: 'gry', pid: '860033327', eyr: '2021', hcl:'#fffffd', byr: '1937', iyr: '2017', cid: '147', hgt: '183cm'},
    { iyr: '2013', ecl: 'amb', cid: '350', eyr: '2023', pid: '028048884', hcl: '#cfa07d', byr: '1929'},
    { hcl: '#ae17e1', iyr: '2013', eyr: '2024', ecl: 'brn', pid: '760753108', byr: '1931', hgt: '179cm'},
    { hcl: '#cfa07d', eyr: '2025', pid: '166559648', iyr: '2011', ecl: 'brn', hgt: '59in'}
    ];
    
    let count=0;

    for (let i = 0; i < passportList.length; i++) {
        if(passportList[i].byr && passportList[i].iyr && passportList[i].eyr && passportList[i].hgt && passportList[i].hcl && passportList[i].ecl && passportList[i].pid){
        count++
        }

        
    }

    console.log("numero di passaporti validi:" + count)