const getArray = (string) => {
    const newArr = [];
    let current = '';
    for (var i = 0, ch; ch = string.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {

            current === '' && ch === '-' ? newArr.push(ch) : newArr.push(current, string.charAt(i));
            current = '';
        }
        else {
            current += string.charAt(i)
        }
    }
    current !== '', newArr.push(current);
    return newArr;
}

const array = getArray('-3+4-4*3+43+23-54/2*4')

console.log(array);