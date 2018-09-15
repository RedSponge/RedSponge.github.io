//Project States:
/*
    0 - Completed
    1 - In Progress
    2 - Paused
    3 - Abandoned
    4 - Not started
*/

const statuses = {
    0: {
        "name": "Completed",
        "color": "green"
    },
    1: {
        "name": "In Progress",
        "color": "orange"
    },
    2: {
        "name": "Paused",
        "color": "gray"
    },
    3: {
        "name": "Abandoned",
        "color": "brown"
    },
    4: {
        "name": "Not started",
        "color": "red"
    }
}

function buildProjectTable(projectArr) {

    let div = document.getElementById("projects-placeholder");

    try {
        let table = document.createElement("table");

        let tbody = document.createElement("tbody");

        table.classList = "projects";

        for(let project of projectArr) {
            let tr = document.createElement("tr");
            let icon = document.createElement("td");

            icon.classList = "project-icon";
            let img = document.createElement("img");
            img.src = project.icon;

            icon.appendChild(img);

            let title = document.createElement("td");
            title.classList = "project-title";
            title.innerHTML = project.title;

            let description = document.createElement("td");
            description.classList = "project-description";
            description.innerHTML = project.description;

            let links = document.createElement("td");
            links.classList = "project-links";
            for(var link of project.links) {
                let a = document.createElement("a");
                a.innerHTML = link.name;
                a.href = link.link;
                links.appendChild(a);
                links.innerHTML += "<br />"
            }

            let status = document.createElement("td");
            status.classList = "project-status";
            status.innerHTML = "Status: <span style=\"color:%col\">%msg</span>".replace("%col", statuses[project.status].color).replace("%msg", statuses[project.status].name);

            tr.appendChild(icon);
            tr.appendChild(title);
            tr.appendChild(description);
            tr.appendChild(links);
            tr.appendChild(status);
        
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        div.innerText = "";
        div.appendChild(table);
    } catch (e) {
        div.innerHTML = "There was an error! please contact RedSponge via GitHub (accessible from the navigation bar)<br /><code>" + e + "</code>";
    }
}