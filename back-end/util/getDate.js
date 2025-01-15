module.exports = getDate = () => {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yy = date.getFullYear()

    return dd.toFixed().padStart(2,0) + "/" + mm.toFixed().padStart(2,0) + "/" + yy;
}