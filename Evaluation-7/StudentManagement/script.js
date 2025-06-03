let api = 'https://moviedatabase-fc904-default-rtdb.asia-southeast1.firebasedatabase.app/students.json'

async function getData(){
    let res = await fetch(api)
    let data = await res.json();
    console.log(data)
}

getData()