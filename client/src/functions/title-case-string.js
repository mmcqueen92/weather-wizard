export default function titleCaseString(input) {
    const inputArray = input.split(" ");
    const parsedArray = inputArray.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    })
    return parsedArray.join(" ")
}