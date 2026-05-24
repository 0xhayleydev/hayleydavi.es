fetch('./data/projects.json')
    .then((reponse) => reponse.json())
    .then((json) => jsonParse(json));

var technology_data = {}

function jsonParse(data) {
    technology_data = data['technologies'];

    let experiences = data['experiences'];
    for (let i = 0; i < experiences.length; i++) {
        let experience = createExperienceContainer(experiences[i]);
        document.getElementById('experience').append(experience);
    }

    let projects = data['projects'];
    for (let i = 0; i < projects.length; i++) {
        let project = createProjectContainer(projects[i]);
        document.getElementById('projects').append(project);
    }
}

function createExperienceContainer(experience_data) {
    let a = createLink(experience_data['link']);

    let container = createContainer('experience-container');
    a.appendChild(container);

    let img = createIconImage(experience_data);
    container.appendChild(img);

    let project_details = createDetails(experience_data, 'experience-details', false, true);
    container.appendChild(project_details);

    let technologies = createTechnologiesContainer(experience_data['technologies']);
    project_details.appendChild(technologies);
    
    return a;
}

function createProjectContainer(project_data) {
    let a = createLink(project_data['link']);
    
    let img = createBannerImage(project_data);
    a.appendChild(img);

    let container = createContainer('project-container');
    a.appendChild(container);

    let project_details = createDetails(project_data, 'project-details', true, true);
    container.appendChild(project_details);

    return a;
}

function createLink(url) {
    let a = document.createElement('a');
    a.href = url;

    a.classList.add('project-link')
    return a;
}

function createContainer(classList) {
    let div = document.createElement('div');
    div.classList.add(classList);

    return div;
}

function createIconImage(project_data) {
    let iconContainer = createContainer('icon-container');
    iconContainer.classList.add();

    let img = document.createElement('img');
    img.src = project_data['image'];
    img.classList.add('icon-image');

    let dates = document.createElement('p');
    dates.innerHTML = project_data['date_range'];
    dates.classList.add('no-margin');

    iconContainer.appendChild(img);
    iconContainer.appendChild(dates);

    return iconContainer;
}

function createBannerImage(project_data) {
    let img = document.createElement('img');
    img.src = project_data['image'];
    img.classList.add('banner-image');

    return img;
}

function createDetails(project_data, className, show_technologies, show_title) {
    let container = document.createElement('div');
    container.classList.add(className);

    if (show_title)
    {
        let title = document.createElement('h2');
        title.classList.add('no-margin');
        title.innerHTML = project_data['title'];
        container.appendChild(title);

        if (project_data['url'] != "") {
            let i = document.createElement('i');
            i.classList.add('fa-solid');
            i.classList.add('fa-arrow-up-right-from-square');
            title.append(i);
        }
    }

    let description = document.createElement('p');
    description.innerHTML = project_data['description'];

    container.appendChild(description);

    if (show_technologies) {
        let technologies = createTechnologiesContainer(project_data['technologies']);
        container.appendChild(technologies);
    }

    return container;
}

function createTechnologiesContainer(technologies) {
    let container = document.createElement('ul');
    container.classList.add('technologies-preview');
    
    for (let i = 0; i < technologies.length; i++) {
        let tech_name = technologies[i];
        let tech_info = technology_data[tech_name]
        
        let item = document.createElement('div');
        item.classList.add('technology-pill');

        let icon = document.createElement('i');
        if (tech_info['dev_icon'] != "")
        {
            icon.classList.add('devicon-' + tech_info['devicon']);

            item.appendChild(icon);
        }
        
        let text = document.createElement('p');
        text.classList.add('no-margin')
        text.innerHTML = tech_name;
    
        item.appendChild(text);

        container.appendChild(item);
    }

    return container;
}