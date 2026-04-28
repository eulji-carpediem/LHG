function solution(my_string, n) {
    const a = my_string.split("");
    const b = a.map((item) => item.repeat(n));
    return b.join("");
}