const projects = require('../Models/projectSchema')
// add project 
exports.addProject = async (req, res) => {
    console.log('Inside add project fn in projectController');
    const userId = req.payload;
    console.log('userId', userId);
    const projectImage = req.file.filename;
    // destructure remaining values send from FE
    const { title, language, githubLink, websiteLink, overview } = req.body
    console.log('Values from FE for projects');
    console.log(title, language, githubLink, websiteLink, overview);
    console.log('file name');
    console.log(projectImage);
    try {
        const existingProject = await projects.findOne({ github: githubLink });
        if (existingProject) {
            res.status(406).json(`${title} already exists!!`)
        }
        else {
            console.log('project not exists');

            // insert project into DB
            const newProject = new projects({
                title: title,
                language: language,
                github: githubLink,
                website: websiteLink,
                overview: overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save();
            res.status(201).json(`${title} added successfully`)
        }
    }
    catch (errr) {
        res.status(401).json('Something went wrong!!')
    }


}

// get Home Project
exports.getHomeProject = async (req, res) => {
    try {
        const homeprojects = await projects.find().limit(3);
        res.status(200).json(homeprojects)
    }
    catch (err) {
        res.status(401).json('Request failed')
    }
}

// get all projects

exports.getAllProject = async (req, res) => {
    // accessing value passed in url
    const userSearchkey = req.query.search
    console.log('searchkey:"', userSearchkey);
    const query = {
        $or: [
            { language: { $regex: userSearchkey, $options: 'i' } },
            { title: { $regex: userSearchkey, $options: 'i' } }
        ]
    }



    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// get user project
exports.getUserProject = async (req, res) => {
    try {
        const userId = req.payload;
        const userprojects = await projects.find({ userId: userId })
        res.status(200).json(userprojects)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// update user project
exports.updateUserProject = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { title, language, githubLink, websiteLink, overview, projectImage } = req.body
    console.log('Inside update Project');
    console.log(id);
    console.log(userId);
    console.log(title, language, githubLink, websiteLink, overview, projectImage);
    const uploadProjectImage = req.file ? req.file.filename : projectImage
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, {
            title: title,
            language: language,
            github: githubLink,
            website: websiteLink,
            overview: overview,
            projectImage: uploadProjectImage,
            userId: userId
        },{
            new:true // used to define update
        })
        await updateProject.save();
        res.status(200).json(updateProject)

    }
    catch (err) {
        res.status(401).json(err)
    }
}