function solution(my_string, letter) {
    const a = my_string.split("");
    const b = a.filter((item) => item !== letter);
    return b.join("");
}