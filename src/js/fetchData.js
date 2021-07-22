export async function fetchData(filePath){
    return await fetch(filePath)
       .then(response => response.text())
       .catch(err => console.log(err))
}