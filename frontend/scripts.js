const form = document.querySelector("form");
const [title, description] = document.querySelectorAll("form .input")
const tbody = document.querySelector("table tbody");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!title.value) {
        alert("عنوان اجباری است");
        return;
    }
    if (!description.value) {
        alert("توضیحات اجباری است");
        return;
    }
    const data = {
        title: title.value,
        description: description.value
    }
    const res = await fetch("http://localhost:3000/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    })
    const result = await res.json();
    addToTable(result.task)

    title.value = null
    description.value = null
})

function addToTable(data) {
    if (Array.isArray(data)) {
        data.forEach(element => {
            newRow(element)
        });
    } else if (typeof data === "object") {
        console.log(data);

        newRow(data)
    }
}

function newRow(element) {
    const tr = document.createElement('tr')
    tr.classList.add('odd:bg-white', 'odd:dark:bg-gray-900', 'even:bg-gray-50', 'border-b', 'border-gray-200')
    const td1 = document.createElement('td')
    td1.innerHTML = element.title

    const td2 = document.createElement('td')
    td2.innerHTML = element.description

    const td3 = document.createElement('td')

    const td4 = document.createElement('td')

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tbody.appendChild(tr)
}