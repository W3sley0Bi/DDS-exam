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
        console.log(results)
    }
}   
}


/**
 * Exercise 2
 */
