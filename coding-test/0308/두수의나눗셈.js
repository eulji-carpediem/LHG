function solution(num1, num2) {
    var answer = 0;
    answer = (num1 / num2) * 1000;
    return Math.floor(answer);
}

console.log(solution(7,3));
// Math.floor()는 소수점 밑을 내림 즉, 음수에서는 답이 다르게 나올 수 있으므로
// 소수점 이하를 전부 버리는 Math.trunc()가 좀 더 정확한 정답이라고 함