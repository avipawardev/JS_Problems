function longestCommonPrefix(arr) {

    let pref = arr[0];//flower

    for (let i = 1; i < arr.length; i++) {
        while (arr[i].indexOf(pref) !== 0) {
            pref = pref.substring(0, pref.length - 1);
            if (!pref) return "";
        }
    }

    return pref;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]))