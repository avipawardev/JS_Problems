function longestCommonPrefix(arr) {
    if (!arr.length) return "";

    let ans = "";

    for (let i = 0; i < arr[0].length; i++) {
        let char = arr[0][i]; // First word ka i-th character

        for (let j = 1; j < arr.length; j++) {
            if (arr[j][i] !== char) return ans; // Agar koi mismatch mila toh return
        }

        ans += char; // Character match ho raha hai toh add karo
    }

    return ans;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
