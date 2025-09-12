async function fetchData(){
    let container = document.getElementById('container')
    try {
        let res = await fetch('https://moviedatabase-fc904-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
        let data = await res.json()
        let container = document.getElementById('container');
    
        container.innerHTML = ""
        data.forEach(element => {
            let card = document.createElement('div');
            card.innerHTML=`
            <h2>Name: ${element.name}</h2>
            <p>Occupation: ${element.occupation}</p>
            <p>City: ${element.city}</p>
            <p>Age: ${element.age}</p>
            `
            container.appendChild(card);
        });
    } catch (error) {
        container.textContent='Something Went Wrong!';
        container.style.color='red'
        container.style.fontSize='3rem'
        console.log('Something went wrong!')
    }

}
fetchData()