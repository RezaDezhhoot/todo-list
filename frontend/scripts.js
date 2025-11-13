const form = document.querySelector("form");
const [title, description] = document.querySelectorAll("form .input")
const tbody = document.querySelector("table tbody");
const list = []

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

window.addEventListener('load', async () => {
    const { tasks } = await getData()
    addToTable(tasks);
})

function addToTable(data) {
    if (Array.isArray(data)) {
        list.push(...data)
        data.forEach(element => {
            newRow(element)
        });
    } else if (typeof data === "object") {
        list.push(data)
        newRow(data)
    }
}

function newRow(element) {
    const tr = document.createElement('tr')
    tr.setAttribute('id', element.id)
    tr.classList.add('odd:bg-white', 'odd:dark:bg-gray-900', 'even:bg-gray-50', 'border-b', 'border-gray-200')


    const td0 = document.createElement('td')
    td0.innerHTML = list.length

    const td1 = document.createElement('td')
    td1.innerHTML = element.title

    const td2 = document.createElement('td')
    td2.innerHTML = element.description
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')

    // if (element.done) {
    //     td4.innerHTML = "انجام شده"
    // } else {
    //     td4.innerHTML = "انجام نشده"
    // }
    td4.innerHTML = element.done ? "انجام شده" : "انجام نشده";

    const td5 = document.createElement('td')

    const doneBTN = document.createElement('button')
    doneBTN.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded-full')
    doneBTN.innerHTML = "Done"
    doneBTN.idValue = element.id
    doneBTN.addEventListener("click", done)
    td5.appendChild(doneBTN)


    const deleteBTN = document.createElement('button')
    deleteBTN.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded-full')
    deleteBTN.innerHTML = "Delete"
    deleteBTN.idValue = element.id
    deleteBTN.addEventListener("click", deleteEvent)
    td5.appendChild(deleteBTN)

    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tbody.appendChild(tr)
}

async function deleteEvent(e) {
    const id = e.currentTarget.idValue
    const res = await fetch("http://localhost:3000/delete/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (res.status === 200) {
        list.map((v) => {
            if (v.id === id) {
                v.done = true
                const tr = document.getElementById(id)
                tr.remove()
            }
        })
    }
}

async function done(e) {
    const id = e.currentTarget.idValue
    const res = await fetch("http://localhost:3000/done/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (res.status === 200) {
        list.map((v) => {
            if (v.id === id) {
                v.done = true
                const tr = document.getElementById(id)
                tr.children[3].innerHTML = "انجام شده"
            }
        })
    }
    return res.json()
}

async function getData() {
    const res = await fetch("http://localhost:3000/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return res.json()
}