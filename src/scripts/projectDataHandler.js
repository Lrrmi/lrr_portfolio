import projects from './../projects.json';

export function GetProjects() {
    let tempProjects = [];
    for (let i = 0; i < projects.length; i++) {
        let project = ValidateProject(projects[i]);
        if (project !== false) tempProjects.push(project);
    }
    return tempProjects;
}

export function GetProject(projectTitle) {
    let project = {};
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].title === projectTitle) {
            project = ValidateProject(projects[i]);
            if (project !== false) return project;
            else return {};
        }
    }
    return project;
}

function ValidateProject(project) {
    if (!("title" in project)) project["title"] = null;
    if (!("description" in project)) project["description"] = null;
    if (!("date" in project)) project["date"] = null;
    if (!("page_name" in project)) project["page_name"] = null;
    if (!("primary_image" in project)) project["primary_image"] = null;
    if (!("model" in project)) project["model"] = null;
    return project;
}