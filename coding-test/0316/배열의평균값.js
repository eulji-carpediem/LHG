function solution(numbers) {
    var sum = 0;
    for(var i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }
    var mean = sum/numbers.length;
    return mean;
}