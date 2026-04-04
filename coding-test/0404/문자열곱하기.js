function solution(my_string, k) {
    let anwser = "";
    for(var i = 0; i < k; i++) {
        anwser = anwser+my_string;
    }
    return anwser;
}