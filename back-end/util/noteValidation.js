module.exports = noteIsValid = ({ title, description, color, creationDate }) => {
    const isValidHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    const isValidDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    console.log(creationDate, isValidDate.test(creationDate))
    let failure= []

    title.trim().length === 0 && failure.push("Invalid Title");
    description.trim().length === 0 && failure.push("Invalid Description");
    !isValidHex.test(color) && failure.push("Invalid Color");
    !isValidDate.test(creationDate) && failure.push("Invalid Date");

    if(failure.length !== 0) {
        return {valid: false, failure}
    }

    return {valid: true}

}